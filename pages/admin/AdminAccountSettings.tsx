import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAccountSettings = ({ adminCredentials, onUpdateCredentials }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newUsername: adminCredentials.username,
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (formData.currentPassword !== adminCredentials.password) {
            setError('The current password you entered is incorrect.');
            return;
        }
        if (!formData.newPassword || !formData.confirmPassword) {
            setError('Please enter and confirm the new password.');
            return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            setError('New password and confirmation do not match.');
            return;
        }
        if (formData.newPassword.length < 6) {
             setError('New password must be at least 6 characters long.');
            return;
        }

        // Update credentials
        onUpdateCredentials({
            username: formData.newUsername,
            password: formData.newPassword
        });

        setSuccess('Your login details have been updated successfully!');
        
        // Reset form
        setFormData({
            currentPassword: '',
            newUsername: formData.newUsername,
            newPassword: '',
            confirmPassword: ''
        });

        // Optionally navigate away after a delay
        setTimeout(() => {
            navigate('/admin/dashboard');
        }, 2000);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Account Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="newUsername" className="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" name="newUsername" id="newUsername" value={formData.newUsername} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                </div>

                <hr/>

                <p className="text-sm text-gray-600">To change your password, please enter your current password followed by a new one.</p>

                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input type="password" name="currentPassword" id="currentPassword" value={formData.currentPassword} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input type="password" name="newPassword" id="newPassword" value={formData.newPassword} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">{error}</p>}
                {success && <p className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-md">{success}</p>}
                
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={() => navigate('/admin/dashboard')} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                     <button type="submit" className="bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-lg hover:bg-yellow-300 transition-colors">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminAccountSettings;
