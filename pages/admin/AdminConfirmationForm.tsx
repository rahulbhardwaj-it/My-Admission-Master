import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmationStatus } from '../../types';

const AdminConfirmationForm = ({ sessions, institutions, confirmations, onAddConfirmation, onUpdateConfirmation }) => {
    const navigate = useNavigate();
    const { confirmationId } = useParams();
    const isEditMode = Boolean(confirmationId);

    const getInitialState = () => ({
        sessionId: sessions[0]?.id || 0,
        studentName: '',
        contact: '',
        course: '',
        institutionId: institutions[0]?.id || 0,
        consultantName: '',
        status: ConfirmationStatus.IN_PROGRESS,
    });

    const [formData, setFormData] = useState(getInitialState());

    useEffect(() => {
        if (isEditMode) {
            const recordToEdit = confirmations.find(c => c.id === parseInt(confirmationId));
            if (recordToEdit) {
                setFormData(recordToEdit);
            }
        }
    }, [isEditMode, confirmationId, confirmations]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const isNumeric = ['sessionId', 'institutionId'].includes(name);
        setFormData(prev => ({ ...prev, [name]: isNumeric ? parseInt(value) : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const confirmationMessage = isEditMode
            ? 'Are you sure you want to save these changes?'
            : 'Are you sure you want to add this confirmation record?';

        if (window.confirm(confirmationMessage)) {
            if (isEditMode) {
                onUpdateConfirmation(formData);
                alert('Confirmation updated successfully!');
            } else {
                onAddConfirmation(formData);
                alert('Confirmation added successfully!');
            }
            navigate('/admin/dashboard/confirmations');
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{isEditMode ? 'Edit Confirmation' : 'Add New Confirmation'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student Name</label>
                        <input type="text" name="studentName" id="studentName" value={formData.studentName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                    </div>
                     <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact (Phone/Email)</label>
                        <input type="text" name="contact" id="contact" value={formData.contact} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                    </div>
                     <div>
                        <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course Name</label>
                        <input type="text" name="course" id="course" value={formData.course} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                    </div>
                    <div>
                        <label htmlFor="institutionId" className="block text-sm font-medium text-gray-700">College / Institution</label>
                        <select name="institutionId" id="institutionId" value={formData.institutionId} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold">
                            {institutions.map(inst => <option key={inst.id} value={inst.id}>{inst.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sessionId" className="block text-sm font-medium text-gray-700">Session</label>
                        <select name="sessionId" id="sessionId" value={formData.sessionId} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold">
                             {sessions.map(s => <option key={s.id} value={s.id}>{s.year}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="consultantName" className="block text-sm font-medium text-gray-700">Consultant Name</label>
                        <input type="text" name="consultantName" id="consultantName" value={formData.consultantName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select name="status" id="status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold">
                            {Object.values(ConfirmationStatus).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={() => navigate('/admin/dashboard/confirmations')} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-lg hover:bg-yellow-300 transition-colors">
                        {isEditMode ? 'Update Confirmation' : 'Save Confirmation'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminConfirmationForm;