import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import InstitutionsPage from './pages/InstitutionsPage';
import InstitutionDetailPage from './pages/InstitutionDetailPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminDashboardHome from './pages/admin/AdminDashboardHome';
import AdminManageInstitutions from './pages/admin/AdminManageInstitutions';
import AdminInstitutionForm from './pages/admin/AdminInstitutionForm';
import AdminManageCourses from './pages/admin/AdminManageCourses';
import AdminCourseForm from './pages/admin/AdminCourseForm';
import AdminViewEnquiries from './pages/admin/AdminViewEnquiries';
import { institutions as institutionsData, courses as coursesData, enquiries as enquiriesData } from './data/mockData';
import { Course, Enquiry, EnquiryStatus, Institution } from './types';


const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [institutions, setInstitutions] = useState<Institution[]>(institutionsData);
    const [courses, setCourses] = useState<Course[]>(coursesData);
    const [enquiries, setEnquiries] = useState<Enquiry[]>(enquiriesData);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    // Institution Handlers
    const handleAddInstitution = (newInstitution: Omit<Institution, 'id'>) => {
        setInstitutions(prev => [...prev, { ...newInstitution, id: Date.now() }]);
    };
    
    const handleUpdateInstitution = (updatedInstitution: Institution) => {
        setInstitutions(prev => prev.map(i => i.id === updatedInstitution.id ? updatedInstitution : i));
    };

    const handleDeleteInstitution = (institutionId: number) => {
        setInstitutions(prev => prev.filter(i => i.id !== institutionId));
        // Also delete courses associated with this institution
        setCourses(prev => prev.filter(c => c.institutionId !== institutionId));
    };

    // Course Handlers
    const handleAddCourse = (newCourse: Omit<Course, 'id'>) => {
        setCourses(prev => [...prev, { ...newCourse, id: Date.now() }]);
    };

    const handleUpdateCourse = (updatedCourse: Course) => {
        setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    };
    
    const handleDeleteCourse = (courseId: number) => {
        setCourses(prev => prev.filter(c => c.id !== courseId));
    };

    // Enquiry Handlers
    const handleAddEnquiry = (newEnquiry: Omit<Enquiry, 'id' | 'dateSubmitted' | 'status'>) => {
        const enquiryToAdd: Enquiry = {
            ...newEnquiry,
            id: Date.now(),
            dateSubmitted: new Date().toISOString().split('T')[0],
            status: EnquiryStatus.NEW
        };
        setEnquiries(prev => [enquiryToAdd, ...prev]);
    };

    const handleUpdateEnquiryStatus = (enquiryId: number, newStatus: EnquiryStatus) => {
        setEnquiries(prev => prev.map(e => e.id === enquiryId ? { ...e, status: newStatus } : e));
    };


    const MainLayout: React.FC = () => (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage institutions={institutions} courses={courses} onAddEnquiry={handleAddEnquiry} />} />
                    <Route path="/institutions" element={<InstitutionsPage institutions={institutions} />} />
                    <Route path="/institutions/:id" element={<InstitutionDetailPage institutions={institutions} courses={courses} />} />
                    <Route path="/courses" element={<CoursesPage institutions={institutions} courses={courses} />} />
                    <Route path="/courses/:courseId" element={<CourseDetailPage courses={courses} institutions={institutions} />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
    
    const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
    };

    return (
        <HashRouter>
            <Routes>
                {/* Admin Routes (no Header/Footer) */}
                <Route path="/admin/login" element={<AdminLoginPage onLogin={handleLogin} />} />
                
                <Route 
                    path="/admin/dashboard" 
                    element={
                        <ProtectedRoute>
                            <AdminDashboardPage onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<AdminDashboardHome />} />
                    <Route path="institutions" element={<AdminManageInstitutions institutions={institutions} onDeleteInstitution={handleDeleteInstitution} />} />
                    <Route path="institutions/add" element={<AdminInstitutionForm onAddInstitution={handleAddInstitution} />} />
                    <Route path="institutions/edit/:institutionId" element={<AdminInstitutionForm institutions={institutions} onUpdateInstitution={handleUpdateInstitution} />} />
                    <Route path="courses" element={<AdminManageCourses courses={courses} institutions={institutions} onDeleteCourse={handleDeleteCourse} />} />
                    <Route path="courses/add" element={<AdminCourseForm institutions={institutions} onAddCourse={handleAddCourse} />} />
                    <Route path="courses/edit/:courseId" element={<AdminCourseForm institutions={institutions} courses={courses} onUpdateCourse={handleUpdateCourse} />} />
                    <Route path="enquiries" element={<AdminViewEnquiries enquiries={enquiries} onUpdateStatus={handleUpdateEnquiryStatus} />} />
                </Route>

                {/* Redirect base /admin to dashboard */}
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                
                {/* Main Site Routes */}
                <Route path="/*" element={<MainLayout />} />
            </Routes>
        </HashRouter>
    );
};

export default App;