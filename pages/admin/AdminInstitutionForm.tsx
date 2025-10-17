import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminInstitutionForm = ({ institutions, onAddInstitution, onUpdateInstitution }) => {
    const navigate = useNavigate();
    const { institutionId } = useParams();
    const isEditMode = Boolean(institutionId);

    const [institution, setInstitution] = useState({
        name: '',
        type: 'University',
        establishmentYear: new Date().getFullYear(),
        affiliatedFrom: '',
        country: '',
        state: '',
        district: '',
        admissionMode: '',
        about: '',
        placement: '',
        photoUrl: '',
        registrationUrl: '',
        logoUrl: '',
    });

     useEffect(() => {
        if (isEditMode && institutions) {
            const instToEdit = institutions.find(i => i.id === parseInt(institutionId));
            if (instToEdit) {
                setInstitution(instToEdit);
            }
        }
    }, [isEditMode, institutionId, institutions]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInstitution(prev => ({ ...prev, [name]: name === 'establishmentYear' ? parseInt(value) || new Date().getFullYear() : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const confirmationMessage = isEditMode
            ? 'Are you sure you want to save these changes?'
            : 'Are you sure you want to add this new institution?';
            
        if (window.confirm(confirmationMessage)) {
            if (isEditMode) {
                onUpdateInstitution?.(institution);
                alert('Institution updated successfully!');
            } else {
                onAddInstitution?.(institution);
                alert('Institution added successfully!');
            }
            navigate('/admin/dashboard/institutions');
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{isEditMode ? 'Edit Institution' : 'Add New Institution'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Column 1 */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name Of Institution</label>
                            <input type="text" name="name" id="name" value={institution.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                            <select name="type" id="type" value={institution.type} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold">
                                <option>University</option>
                                <option>College</option>
                                <option>Polytechnic</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="establishmentYear" className="block text-sm font-medium text-gray-700">Establishment Year</label>
                            <input type="number" name="establishmentYear" id="establishmentYear" value={institution.establishmentYear} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                        </div>
                        <div>
                            <label htmlFor="affiliatedFrom" className="block text-sm font-medium text-gray-700">Affiliated From</label>
                            <input type="text" name="affiliatedFrom" id="affiliatedFrom" value={institution.affiliatedFrom} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                        </div>
                         <div>
                            <label htmlFor="admissionMode" className="block text-sm font-medium text-gray-700">Admission Mode</label>
                            <input type="text" name="admissionMode" id="admissionMode" value={institution.admissionMode} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                        </div>
                        <div>
                            <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">Institute Photo URL</label>
                            <input type="url" name="photoUrl" id="photoUrl" value={institution.photoUrl} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold" placeholder="https://example.com/image.jpg"/>
                        </div>
                    </div>
                    {/* Column 2 */}
                     <div className="space-y-4">
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                            <input type="text" name="country" id="country" value={institution.country} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                        </div>
                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                            <input type="text" name="state" id="state" value={institution.state} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                        </div>
                        <div>
                            <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
                            <input type="text" name="district" id="district" value={institution.district} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                        </div>
                         <div>
                            <label htmlFor="registrationUrl" className="block text-sm font-medium text-gray-700">Registration URL</label>
                            <input type="url" name="registrationUrl" id="registrationUrl" value={institution.registrationUrl} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold" placeholder="https://example.com/register"/>
                        </div>
                        <div>
                            <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">Institute Logo URL</label>
                            <input type="url" name="logoUrl" id="logoUrl" value={institution.logoUrl} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold" placeholder="https://example.com/logo.png"/>
                        </div>
                    </div>
                </div>

                {/* Full-width fields */}
                <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">About Institution</label>
                    <textarea name="about" id="about" rows={5} value={institution.about} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"></textarea>
                </div>
                 <div>
                    <label htmlFor="placement" className="block text-sm font-medium text-gray-700">Placement Information</label>
                    <textarea name="placement" id="placement" rows={5} value={institution.placement} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={() => navigate('/admin/dashboard/institutions')} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                     <button type="submit" className="bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-lg hover:bg-yellow-300 transition-colors">
                        {isEditMode ? 'Update Institution' : 'Save Institution'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminInstitutionForm;