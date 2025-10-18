import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminLoginPage = ({ onLogin, adminCredentials }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (username === adminCredentials.username && password === adminCredentials.password) {
            onLogin();
            navigate('/admin/dashboard', { replace: true });
        } else {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <img className="mx-auto h-20 w-auto" src="https://i.ibb.co/Q3Bgm9Qv/admission-master.jpg" alt="My Admission Master Logo" />
                    <h2 className="mt-6 text-3xl font-extrabold text-brand-blue">Admin Panel Login</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to manage institutions and courses
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-gold focus:border-brand-gold focus:z-10 sm:text-sm"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-gold focus:border-brand-gold focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-brand-blue bg-brand-gold hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <Link to="/" className="font-medium text-brand-blue hover:text-brand-gold">
                        &larr; Back to Main Website
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;