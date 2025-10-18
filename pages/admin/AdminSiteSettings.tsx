import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSiteSettings = ({ siteSettings, onUpdateSettings, institutions }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ ...siteSettings, featuredInstitutionIds: siteSettings.featuredInstitutionIds || [] });

    useEffect(() => {
        setFormData({ ...siteSettings, featuredInstitutionIds: siteSettings.featuredInstitutionIds || [] });
    }, [siteSettings]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFeaturedChange = (institutionId) => {
        const currentIds = formData.featuredInstitutionIds;
        const newIds = currentIds.includes(institutionId)
            ? currentIds.filter(id => id !== institutionId)
            : [...currentIds, institutionId];
        
        setFormData(prev => ({...prev, featuredInstitutionIds: newIds}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to update the site settings?')) {
            onUpdateSettings(formData);
            alert('Site settings updated successfully!');
            navigate('/admin/dashboard');
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Site Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">Site Logo URL</label>
                    <input type="url" name="logoUrl" id="logoUrl" value={formData.logoUrl} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold" placeholder="https://example.com/logo.png"/>
                    {formData.logoUrl && <img src={formData.logoUrl} alt="Logo Preview" className="mt-4 h-20 w-20 object-contain bg-gray-100 p-2 rounded-md border" />}
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea name="address" id="address" rows={3} value={formData.address} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                    </div>
                </div>
                 <div>
                    <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">Tagline</label>
                    <input type="text" name="tagline" id="tagline" value={formData.tagline} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                </div>

                <hr/>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Featured Institutions</label>
                    <p className="text-xs text-gray-500 mb-4">Select institutions to feature on the homepage.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-60 overflow-y-auto p-4 border rounded-md">
                        {institutions.map(inst => (
                            <div key={inst.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`featured-${inst.id}`}
                                    checked={formData.featuredInstitutionIds.includes(inst.id)}
                                    onChange={() => handleFeaturedChange(inst.id)}
                                    className="h-4 w-4 text-brand-blue border-gray-300 rounded focus:ring-brand-gold"
                                />
                                <label htmlFor={`featured-${inst.id}`} className="ml-3 text-sm text-gray-700">{inst.name}</label>
                            </div>
                        ))}
                    </div>
                </div>


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

export default AdminSiteSettings;