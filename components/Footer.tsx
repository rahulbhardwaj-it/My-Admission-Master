
import React from 'react';
import { NavLink } from 'react-router-dom';

const SocialIcon: React.FC<{ href: string, path: string }> = ({ href, path }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors duration-300">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d={path} />
        </svg>
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-blue text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                         <div className="flex items-center space-x-2">
                            <img className="h-14 w-14" src="https://i.ibb.co/ZJ9yDq7/logo.png" alt="My Admission Master Logo" />
                             <div>
                                <h3 className="text-xl font-bold">MY ADMISSION MASTER</h3>
                                <p className="text-gray-400 text-sm italic">"ADMISSION KE SAATH BHI - ADMISSION KE BAAD BHI"</p>
                             </div>
                        </div>
                        <p className="text-gray-400 text-base">
                            Guiding students to their dream colleges and scholarships with dedication and expertise. Your future, our mission.
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Quick Links</h3>
                                <ul className="mt-4 space-y-4">
                                    <li><NavLink to="/institutions" className="text-base text-gray-400 hover:text-brand-gold">Institutions</NavLink></li>
                                    <li><NavLink to="/courses" className="text-base text-gray-400 hover:text-brand-gold">Courses</NavLink></li>
                                    <li><NavLink to="/contact" className="text-base text-gray-400 hover:text-brand-gold">Contact Us</NavLink></li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Legal</h3>
                                <ul className="mt-4 space-y-4">
                                    <li><a href="#" className="text-base text-gray-400 hover:text-brand-gold">Privacy Policy</a></li>
                                    <li><a href="#" className="text-base text-gray-400 hover:text-brand-gold">Terms of Service</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-1 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Connect With Us</h3>
                                <div className="mt-4 space-y-4 text-gray-400">
                                    <p>Address: Rakesh Sharma Building, Knowledge Park-3, Greater Noida, UP-201310</p>
                                    <p>Email: myadmissionmaster@outlook.com</p>
                                    <p>Phone: +91-9318479200</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 flex justify-between items-center">
                    <p className="text-base text-gray-400 xl:text-center">&copy; {new Date().getFullYear()} My Admission Master. All rights reserved.</p>
                     <div className="flex space-x-6">
                        <SocialIcon href="#" path="M22.05 7.54a4.47 4.47 0 0 0-3.3-1.46H5.25a4.47 4.47 0 0 0-3.3 1.46c-.52.56-.86 1.3-.86 2.2V16c0 .9.34 1.64.86 2.2.48.5 1.1.86 1.8.98l.36.02h13.1c.7.02 1.34-.28 1.8-.78.52-.56.86-1.3.86-2.2V9.74c0-.9-.34-1.64-.86-2.2zM12 15.4c-1.63 0-3.05-.8-4-2.2.5-.64 1.2-1.1 2-1.45.8-.32 1.6-.5 2.4-.5.8 0 1.6.18 2.4.5.8.35 1.5.8 2 1.45-1 1.4-2.4 2.2-4 2.2z" />
                        <SocialIcon href="#" path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-5h-2v-2h2v-1.5c0-2 1.3-3.5 3.5-3.5h1.5v2h-.8c-.7 0-1.2.5-1.2 1.3V12h2.3l-.4 2H14v5h-3z" />
                        <SocialIcon href="#" path="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.716-2.011-4.486-2.011-3.466 0-6.321 2.806-6.321 6.225 0 .524.06 1.033.175 1.52-5.23-.263-9.855-2.716-12.945-6.486-.54 1-.848 2.148-.848 3.385 0 2.158 1.121 4.066 2.816 5.186-1.04-.033-2.018-.316-2.868-.78v.078c0 3.011 2.186 5.525 5.066 6.101-.524.148-1.08.228-1.65.228-.408 0-.803-.04-1.19-.114.803 2.466 3.126 4.266 5.88 4.316-2.17 1.68-4.91 2.68-7.88 2.68-.524 0-1.033-.03-1.52-.088 2.806 1.776 6.136 2.816 9.766 2.816 11.721 0 18.121-9.525 18.121-17.825 0-.278-.006-.556-.018-.832 1.24-.886 2.316-1.98 3.176-3.24z" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
