import React, { useState, useMemo } from 'react';
import { Enquiry, EnquiryStatus } from '../../types';

const ITEMS_PER_PAGE = 10;

interface AdminViewEnquiriesProps {
    enquiries: Enquiry[];
    onUpdateStatus: (enquiryId: number, newStatus: EnquiryStatus) => void;
}

const getStatusColor = (status: EnquiryStatus) => {
    switch (status) {
        case EnquiryStatus.NEW: return 'bg-blue-100 text-blue-800';
        case EnquiryStatus.READ: return 'bg-yellow-100 text-yellow-800';
        case EnquiryStatus.ARCHIVED: return 'bg-gray-200 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const AdminViewEnquiries: React.FC<AdminViewEnquiriesProps> = ({ enquiries, onUpdateStatus }) => {
    const [filterStatus, setFilterStatus] = useState<EnquiryStatus | 'All'>('All');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredEnquiries = useMemo(() => {
        if (filterStatus === 'All') {
            return enquiries;
        }
        return enquiries.filter(e => e.status === filterStatus);
    }, [enquiries, filterStatus]);

    const totalPages = Math.ceil(filteredEnquiries.length / ITEMS_PER_PAGE);

    const paginatedEnquiries = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredEnquiries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredEnquiries, currentPage]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(e.target.value as EnquiryStatus | 'All');
        setCurrentPage(1);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">View Enquiries</h2>
                <select 
                    value={filterStatus}
                    onChange={handleFilterChange}
                    className="px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50"
                >
                    <option value="All">All Statuses</option>
                    <option value={EnquiryStatus.NEW}>New</option>
                    <option value={EnquiryStatus.READ}>Read</option>
                    <option value={EnquiryStatus.ARCHIVED}>Archived</option>
                </select>
            </div>

            {/* Enquiries Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Contact</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Course Interest</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Submitted</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
                            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {paginatedEnquiries.length > 0 ? paginatedEnquiries.map(enquiry => (
                            <tr key={enquiry.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="text-left py-3 px-4">{enquiry.name}</td>
                                <td className="text-left py-3 px-4">
                                    <div className="text-sm">{enquiry.email}</div>
                                    <div className="text-xs text-gray-500">{enquiry.phone}</div>
                                </td>
                                <td className="text-left py-3 px-4">{enquiry.courseInterest}</td>
                                <td className="text-left py-3 px-4">{enquiry.dateSubmitted}</td>
                                <td className="text-left py-3 px-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(enquiry.status)}`}>
                                        {enquiry.status}
                                    </span>
                                </td>
                                <td className="text-center py-3 px-4 space-x-2">
                                    {enquiry.status === EnquiryStatus.NEW && (
                                        <button onClick={() => onUpdateStatus(enquiry.id, EnquiryStatus.READ)} className="text-sm bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-full">
                                            Mark as Read
                                        </button>
                                    )}
                                    {enquiry.status !== EnquiryStatus.ARCHIVED && (
                                        <button onClick={() => onUpdateStatus(enquiry.id, EnquiryStatus.ARCHIVED)} className="text-sm bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded-full">
                                            Archive
                                        </button>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-500">
                                    No enquiries found for this status.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                 <div className="flex justify-between items-center mt-6">
                    <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button 
                             onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                             disabled={currentPage === totalPages}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminViewEnquiries;