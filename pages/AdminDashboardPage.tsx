import React from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';

interface AdminDashboardPageProps {
    onLogout: () => void;
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();
        navigate('/');
    };

    const navLinkClasses = "flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-colors duration-200 rounded-lg";
    const activeNavLinkClasses = "bg-white/10 text-white font-semibold";
    
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
        isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses;

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 bg-brand-blue p-4 flex flex-col justify-between">
                <div>
                    <div className="flex items-center space-x-2 p-2 mb-6 border-b border-white/20 pb-4">
                        <img className="h-12 w-12" src="https://i.ibb.co/ZJ9yDq7/logo.png" alt="Logo" />
                        <span className="text-white font-bold text-lg">Admin Panel</span>
                    </div>
                    <nav className="space-y-2">
                        <NavLink to="/admin/dashboard" end className={getNavLinkClass}>Dashboard</NavLink>
                        <NavLink to="/admin/dashboard/institutions" className={getNavLinkClass}>Manage Institutions</NavLink>
                        <NavLink to="/admin/dashboard/courses" className={getNavLinkClass}>Manage Courses</NavLink>
                        <NavLink to="/admin/dashboard/enquiries" className={getNavLinkClass}>View Enquiries</NavLink>
                    </nav>
                </div>
                 <button
                    onClick={() => navigate('/')}
                    className="w-full text-center bg-brand-gold text-brand-blue font-bold py-2 px-4 rounded-lg hover:bg-yellow-300 transition duration-300"
                >
                    View Website
                </button>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-full mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-brand-dark">Admin Dashboard</h1>
                        <button
                            onClick={handleLogoutClick}
                            className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300 ease-in-out text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardPage;