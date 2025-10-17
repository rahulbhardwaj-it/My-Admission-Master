
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);


    const navLinkClasses = "text-white hover:text-brand-gold transition duration-300 px-3 py-2 rounded-md text-sm font-medium";
    const activeNavLinkClasses = "text-brand-gold bg-white/10";

    const getNavLinkClass = ({ isActive }) => 
        isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses;
        
    const getMobileNavLinkClass = ({ isActive }) => {
        const mobileBase = "block text-white hover:text-brand-gold transition duration-300 px-3 py-3 rounded-md text-base font-medium";
        const mobileActive = "text-brand-gold bg-white/10";
        return isActive ? `${mobileBase} ${mobileActive}` : mobileBase;
    }


    return (
        <header className="bg-brand-blue shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="flex items-center space-x-2">
                            <img className="h-14 w-14" src="https://i.ibb.co/ZJ9yDq7/logo.png" alt="My Admission Master Logo" />
                            <span className="text-white font-bold text-xl hidden md:block">MY ADMISSION MASTER</span>
                        </NavLink>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
                            <NavLink to="/institutions" className={getNavLinkClass}>Institutions</NavLink>
                            <NavLink to="/courses" className={getNavLinkClass}>Courses</NavLink>
                            <NavLink to="/blog" className={getNavLinkClass}>Blog</NavLink>
                            <NavLink to="/contact" className={getNavLinkClass}>Contact Us</NavLink>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <NavLink to="/admin/dashboard" className="bg-brand-gold text-brand-blue hover:bg-yellow-300 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                            Admin Login
                        </NavLink>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="bg-brand-blue inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded={isMenuOpen}>
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, full-screen overlay */}
            {/* FIX: Increased z-index from 40 to 50 to ensure the mobile menu appears above other content. */}
            <div className={`md:hidden fixed top-20 left-0 right-0 bottom-0 bg-brand-blue z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
                    <NavLink to="/" className={getMobileNavLinkClass} onClick={()=>setIsMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/institutions" className={getMobileNavLinkClass} onClick={()=>setIsMenuOpen(false)}>Institutions</NavLink>
                    <NavLink to="/courses" className={getMobileNavLinkClass} onClick={()=>setIsMenuOpen(false)}>Courses</NavLink>
                    <NavLink to="/blog" className={getMobileNavLinkClass} onClick={()=>setIsMenuOpen(false)}>Blog</NavLink>
                    <NavLink to="/contact" className={getMobileNavLinkClass} onClick={()=>setIsMenuOpen(false)}>Contact Us</NavLink>
                    <div className="pt-4 border-t border-white/20">
                        <NavLink to="/admin/dashboard" onClick={()=>setIsMenuOpen(false)} className="block text-center bg-brand-gold text-brand-blue hover:bg-yellow-300 font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out">
                            Admin Login
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
