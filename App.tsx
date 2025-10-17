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
import BlogPage from './pages/BlogPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminDashboardHome from './pages/admin/AdminDashboardHome';
import AdminManageInstitutions from './pages/admin/AdminManageInstitutions';
import AdminInstitutionForm from './pages/admin/AdminInstitutionForm';
import AdminManageCourses from './pages/admin/AdminManageCourses';
import AdminCourseForm from './pages/admin/AdminCourseForm';
import AdminViewEnquiries from './pages/admin/AdminViewEnquiries';
import AdminManageArticles from './pages/admin/AdminManageArticles';
import AdminArticleForm from './pages/admin/AdminArticleForm';
import AdminSiteSettings from './pages/admin/AdminSiteSettings';
import AdminAccountSettings from './pages/admin/AdminAccountSettings';
import AdminManageConfirmations from './pages/admin/AdminManageConfirmations';
import AdminConfirmationForm from './pages/admin/AdminConfirmationForm';
import { institutions as institutionsData, courses as coursesData, enquiries as enquiriesData, articles as articlesData, siteSettings as siteSettingsData, adminCredentials as adminCredentialsData, sessions as sessionsData, confirmations as confirmationsData } from './data/mockData';
import { EnquiryStatus } from './types';


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [institutions, setInstitutions] = useState(institutionsData);
    const [courses, setCourses] = useState(coursesData);
    const [enquiries, setEnquiries] = useState(enquiriesData);
    const [articles, setArticles] = useState(articlesData);
    const [siteSettings, setSiteSettings] = useState(siteSettingsData);
    const [adminCredentials, setAdminCredentials] = useState(adminCredentialsData);
    const [sessions, setSessions] = useState(sessionsData);
    const [confirmations, setConfirmations] = useState(confirmationsData);


    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    // Institution Handlers
    const handleAddInstitution = (newInstitution) => {
        setInstitutions(prev => [...prev, { ...newInstitution, id: Date.now() }]);
    };
    
    const handleUpdateInstitution = (updatedInstitution) => {
        setInstitutions(prev => prev.map(i => i.id === updatedInstitution.id ? updatedInstitution : i));
    };

    const handleDeleteInstitution = (institutionId) => {
        setInstitutions(prev => prev.filter(i => i.id !== institutionId));
        // Also delete courses associated with this institution
        setCourses(prev => prev.filter(c => c.institutionId !== institutionId));
    };

    // Course Handlers
    const handleAddCourse = (newCourse) => {
        setCourses(prev => [...prev, { ...newCourse, id: Date.now() }]);
    };

    const handleUpdateCourse = (updatedCourse) => {
        setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    };
    
    const handleDeleteCourse = (courseId) => {
        setCourses(prev => prev.filter(c => c.id !== courseId));
    };

    // Enquiry Handlers
    const handleAddEnquiry = (newEnquiry) => {
        const enquiryToAdd = {
            ...newEnquiry,
            id: Date.now(),
            dateSubmitted: new Date().toISOString().split('T')[0],
            status: EnquiryStatus.NEW
        };
        setEnquiries(prev => [enquiryToAdd, ...prev]);
    };

    const handleUpdateEnquiryStatus = (enquiryId, newStatus) => {
        setEnquiries(prev => prev.map(e => e.id === enquiryId ? { ...e, status: newStatus } : e));
    };

    // Article Handlers
    const handleAddArticle = (newArticle) => {
        const articleToAdd = {
            ...newArticle,
            id: Date.now(),
            datePublished: new Date().toISOString().split('T')[0]
        };
        setArticles(prev => [articleToAdd, ...prev]);
    };

    const handleUpdateArticle = (updatedArticle) => {
        setArticles(prev => prev.map(a => a.id === updatedArticle.id ? updatedArticle : a));
    };

    const handleDeleteArticle = (articleId) => {
        setArticles(prev => prev.filter(a => a.id !== articleId));
    };

    // Site Settings Handler
    const handleUpdateSiteSettings = (newSettings) => {
        setSiteSettings(newSettings);
    };

    // Admin Credentials Handler
    const handleUpdateAdminCredentials = (newCredentials) => {
        setAdminCredentials(newCredentials);
    };

    // Session Handler
    const handleAddSession = (newSessionYear) => {
        if (sessions.some(s => s.year === newSessionYear)) {
            alert('This session already exists.');
            return;
        }
        const newSession = { id: Date.now(), year: newSessionYear };
        setSessions(prev => [...prev, newSession].sort((a,b) => a.year.localeCompare(b.year)));
        alert(`Session ${newSessionYear} added successfully.`);
    };
    
    // Confirmation Handlers
    const handleAddConfirmation = (newConfirmation) => {
        setConfirmations(prev => [...prev, { ...newConfirmation, id: Date.now() }]);
    };

    const handleUpdateConfirmation = (updatedConfirmation) => {
        setConfirmations(prev => prev.map(c => c.id === updatedConfirmation.id ? updatedConfirmation : c));
    };

    const handleDeleteConfirmation = (confirmationId) => {
        setConfirmations(prev => prev.filter(c => c.id !== confirmationId));
    };


    const MainLayout = () => (
        <div className="flex flex-col min-h-screen">
            <Header logoUrl={siteSettings.logoUrl} />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage institutions={institutions} courses={courses} articles={articles} onAddEnquiry={handleAddEnquiry} />} />
                    <Route path="/institutions" element={<InstitutionsPage institutions={institutions} />} />
                    <Route path="/institutions/:id" element={<InstitutionDetailPage institutions={institutions} courses={courses} />} />
                    <Route path="/courses" element={<CoursesPage institutions={institutions} courses={courses} />} />
                    <Route path="/courses/:courseId" element={<CourseDetailPage courses={courses} institutions={institutions} />} />
                    <Route path="/contact" element={<ContactPage siteSettings={siteSettings} />} />
                    <Route path="/blog" element={<BlogPage articles={articles} />} />
                    <Route path="/blog/:articleId" element={<ArticleDetailPage articles={articles} />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer siteSettings={siteSettings} />
        </div>
    );
    
    const ProtectedRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
    };

    return (
        <HashRouter>
            <Routes>
                {/* Admin Routes (no Header/Footer) */}
                <Route path="/admin/login" element={<AdminLoginPage onLogin={handleLogin} adminCredentials={adminCredentials} />} />
                
                <Route 
                    path="/admin/dashboard" 
                    element={
                        <ProtectedRoute>
                            <AdminDashboardPage onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<AdminDashboardHome institutions={institutions} courses={courses} enquiries={enquiries} articles={articles} />} />
                    <Route path="institutions" element={<AdminManageInstitutions institutions={institutions} onDeleteInstitution={handleDeleteInstitution} />} />
                    <Route path="institutions/add" element={<AdminInstitutionForm institutions={institutions} onAddInstitution={handleAddInstitution} onUpdateInstitution={handleUpdateInstitution} />} />
                    <Route path="institutions/edit/:institutionId" element={<AdminInstitutionForm institutions={institutions} onAddInstitution={handleAddInstitution} onUpdateInstitution={handleUpdateInstitution} />} />
                    <Route path="courses" element={<AdminManageCourses courses={courses} institutions={institutions} onDeleteCourse={handleDeleteCourse} />} />
                    <Route path="courses/add" element={<AdminCourseForm institutions={institutions} courses={courses} onAddCourse={handleAddCourse} onUpdateCourse={handleUpdateCourse} />} />
                    <Route path="courses/edit/:courseId" element={<AdminCourseForm institutions={institutions} courses={courses} onAddCourse={handleAddCourse} onUpdateCourse={handleUpdateCourse} />} />
                    <Route path="enquiries" element={<AdminViewEnquiries enquiries={enquiries} onUpdateStatus={handleUpdateEnquiryStatus} />} />
                    <Route path="articles" element={<AdminManageArticles articles={articles} onDeleteArticle={handleDeleteArticle} />} />
                    <Route path="articles/add" element={<AdminArticleForm articles={articles} onAddArticle={handleAddArticle} onUpdateArticle={handleUpdateArticle} />} />
                    <Route path="articles/edit/:articleId" element={<AdminArticleForm articles={articles} onAddArticle={handleAddArticle} onUpdateArticle={handleUpdateArticle} />} />
                    <Route path="confirmations" element={<AdminManageConfirmations sessions={sessions} confirmations={confirmations} institutions={institutions} onAddSession={handleAddSession} onDeleteConfirmation={handleDeleteConfirmation} />} />
                    <Route path="confirmations/add" element={<AdminConfirmationForm sessions={sessions} institutions={institutions} confirmations={confirmations} onAddConfirmation={handleAddConfirmation} onUpdateConfirmation={handleUpdateConfirmation} />} />
                    <Route path="confirmations/edit/:confirmationId" element={<AdminConfirmationForm sessions={sessions} institutions={institutions} confirmations={confirmations} onAddConfirmation={handleAddConfirmation} onUpdateConfirmation={handleUpdateConfirmation} />} />
                    <Route path="settings" element={<AdminSiteSettings siteSettings={siteSettings} onUpdateSettings={handleUpdateSiteSettings} />} />
                    <Route path="account" element={<AdminAccountSettings adminCredentials={adminCredentials} onUpdateCredentials={handleUpdateAdminCredentials} />} />
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