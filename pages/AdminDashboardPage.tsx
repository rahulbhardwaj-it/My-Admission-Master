
import React, { useState } from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';

const AdminDashboardPage = ({ onLogout }) => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogoutClick = () => {
        onLogout();
        navigate('/');
    };

    const navLinkClasses = "flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-colors duration-200 rounded-lg";
    const activeNavLinkClasses = "bg-white/10 text-white font-semibold";
    
    const getNavLinkClass = ({ isActive }) => 
        isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses;

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${ isSidebarOpen ? 'block' : 'hidden' }`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 flex-shrink-0 bg-brand-blue p-4 flex flex-col justify-between transform ${ isSidebarOpen ? 'translate-x-0' : '-translate-x-full' } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}>
                <div>
                    <div className="flex items-center justify-between p-2 mb-6 border-b border-white/20 pb-4">
                        <div className="flex items-center space-x-2">
                             <img className="h-12 w-12" src="https://i.ibb.co/ZJ9yDq7/logo.png" alt="Logo" />
                             <span className="text-white font-bold text-lg">Admin Panel</span>
                        </div>
                        <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <nav className="space-y-2">
                        <NavLink to="/admin/dashboard" end className={getNavLinkClass} onClick={() => setIsSidebarOpen(false)}>Dashboard</NavLink>
                        <NavLink to="/admin/dashboard/institutions" className={getNavLinkClass} onClick={() => setIsSidebarOpen(false)}>Manage Institutions</NavLink>
                        <NavLink to="/admin/dashboard/courses" className={getNavLinkClass} onClick={() => setIsSidebarOpen(false)}>Manage Courses</NavLink>
                        <NavLink to="/admin/dashboard/articles" className={getNavLinkClass} onClick={() => setIsSidebarOpen(false)}>Manage Articles</NavLink>
                        <NavLink to="/admin/dashboard/enquiries" className={getNavLinkClass} onClick={() => setIsSidebarOpen(false)}>View Enquiries</NavLink>
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
                        <div className="flex items-center">
                             <button 
                                className="text-gray-500 focus:outline-none md:hidden" 
                                onClick={() => setIsSidebarOpen(true)}
                                aria-label="Open sidebar"
                            >
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h1 className="text-xl md:text-2xl font-bold text-brand-dark ml-2 md:ml-0">Admin Dashboard</h1>
                        </div>
                        <button
                            onClick={handleLogoutClick}
                            className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300 ease-in-out text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
