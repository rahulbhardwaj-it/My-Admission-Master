import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmationStatus } from '../../types';

const ITEMS_PER_PAGE = 10;

const getStatusColor = (status) => {
    switch (status) {
        case ConfirmationStatus.CONFIRMED: return 'bg-green-100 text-green-800';
        case ConfirmationStatus.IN_PROGRESS: return 'bg-yellow-100 text-yellow-800';
        case ConfirmationStatus.CANCELLED: return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const AdminManageConfirmations = ({ sessions, confirmations, institutions, onAddSession, onDeleteConfirmation }) => {
    const [selectedSessionId, setSelectedSessionId] = useState(sessions[0]?.id || '');
    const [newSessionYear, setNewSessionYear] = useState('');
    const [filters, setFilters] = useState({ course: '', institutionId: '' });
    const [currentPage, setCurrentPage] = useState(1);

    const confirmationsWithDetails = useMemo(() => {
        return confirmations.map(conf => ({
            ...conf,
            institutionName: institutions.find(inst => inst.id === conf.institutionId)?.name || 'N/A',
        }));
    }, [confirmations, institutions]);

    const filteredConfirmations = useMemo(() => {
        return confirmationsWithDetails.filter(c => {
            const sessionMatch = selectedSessionId ? c.sessionId === selectedSessionId : true;
            const courseMatch = filters.course ? c.course.toLowerCase().includes(filters.course.toLowerCase()) : true;
            const institutionMatch = filters.institutionId ? c.institutionId === parseInt(filters.institutionId) : true;
            return sessionMatch && courseMatch && institutionMatch;
        });
    }, [confirmationsWithDetails, selectedSessionId, filters]);

    const totalPages = Math.ceil(filteredConfirmations.length / ITEMS_PER_PAGE);

    const paginatedConfirmations = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredConfirmations.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredConfirmations, currentPage]);

    const handleAddSessionClick = () => {
        const yearRegex = /^\d{4}-\d{2}$/;
        if (newSessionYear.trim() && yearRegex.test(newSessionYear)) {
            onAddSession(newSessionYear.trim());
            setNewSessionYear('');
        } else {
            alert('Please enter a valid session year in YYYY-YY format (e.g., 2025-26).');
        }
    };
    
    const handleDeleteClick = (id) => {
        if(window.confirm('Are you sure you want to delete this confirmation record?')) {
            onDeleteConfirmation(id);
        }
    };
    
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({...prev, [name]: value }));
        setCurrentPage(1);
    }
    
    const handleExport = () => {
        if (filteredConfirmations.length === 0) {
            alert('No data to export.');
            return;
        }
        const headers = ['Student Name', 'Contact', 'Course', 'College', 'Consultant Name', 'Status'];
        const rows = filteredConfirmations.map(c => [
            `"${c.studentName}"`,
            `"${c.contact}"`,
            `"${c.course}"`,
            `"${c.institutionName}"`,
            `"${c.consultantName}"`,
            `"${c.status}"`
        ].join(','));

        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        const sessionYear = sessions.find(s => s.id === selectedSessionId)?.year || 'all_sessions';
        link.setAttribute("download", `student_confirmations_${sessionYear}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Student Confirmations</h2>
                
                {/* Session Management */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                         <label htmlFor="session-select" className="block text-sm font-medium text-gray-700">Select Session</label>
                        <select id="session-select" value={selectedSessionId} onChange={e => { setSelectedSessionId(parseInt(e.target.value)); setCurrentPage(1); }} className="mt-1 w-full px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50">
                            {sessions.map(s => <option key={s.id} value={s.id}>{s.year}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="add-session" className="block text-sm font-medium text-gray-700">Add New Session</label>
                        <div className="flex mt-1">
                            <input type="text" id="add-session" value={newSessionYear} onChange={e => setNewSessionYear(e.target.value)} placeholder="e.g., 2027-28" className="flex-grow w-full px-4 py-2 rounded-l-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50"/>
                            <button onClick={handleAddSessionClick} className="bg-brand-blue text-white font-semibold px-4 rounded-r-lg hover:bg-blue-800 transition-colors">Add</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                 {/* Actions and Filters */}
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                    <div className="flex flex-wrap gap-4 items-center">
                        <input type="text" name="course" placeholder="Filter by course..." value={filters.course} onChange={handleFilterChange} className="px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50" />
                        <select name="institutionId" value={filters.institutionId} onChange={handleFilterChange} className="px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50">
                            <option value="">All Colleges</option>
                            {institutions.map(inst => <option key={inst.id} value={inst.id}>{inst.name}</option>)}
                        </select>
                    </div>
                    <div className="flex gap-4">
                         <button onClick={handleExport} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">Export Data</button>
                        <Link to="/admin/dashboard/confirmations/add" className="bg-brand-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors">+ Add New</Link>
                    </div>
                </div>

                {/* Confirmations Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                {['Student', 'Course', 'College', 'Consultant', 'Status', 'Actions'].map(h => <th key={h} className="text-left py-3 px-4 uppercase font-semibold text-sm">{h}</th>)}
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {paginatedConfirmations.length > 0 ? paginatedConfirmations.map(c => (
                                <tr key={c.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="font-medium">{c.studentName}</div>
                                        <div className="text-xs text-gray-500">{c.contact}</div>
                                    </td>
                                    <td className="py-3 px-4">{c.course}</td>
                                    <td className="py-3 px-4">{c.institutionName}</td>
                                    <td className="py-3 px-4">{c.consultantName}</td>
                                    <td className="py-3 px-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(c.status)}`}>{c.status}</span></td>
                                    <td className="py-3 px-4 space-x-2">
                                        <Link to={`/admin/dashboard/confirmations/edit/${c.id}`} className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-full">Edit</Link>
                                        <button onClick={() => handleDeleteClick(c.id)} className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full">Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={6} className="text-center py-10 text-gray-500">No confirmations found for this session/filter.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                 {totalPages > 1 && (
                     <div className="flex justify-between items-center mt-6">
                        <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">Prev</button>
                            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">Next</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminManageConfirmations;