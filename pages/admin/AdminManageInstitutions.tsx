import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 5;

const AdminManageInstitutions = ({ institutions, onDeleteInstitution }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('name');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredInstitutions = useMemo(() => {
        if (!searchTerm.trim()) {
            return institutions;
        }
        const lowercasedFilter = searchTerm.toLowerCase();
        return institutions.filter(inst => {
            const value = inst[filterType];
            if (typeof value === 'string') {
                return value.toLowerCase().includes(lowercasedFilter);
            }
            return false;
        });
    }, [institutions, searchTerm, filterType]);

    const totalPages = Math.ceil(filteredInstitutions.length / ITEMS_PER_PAGE);

    const paginatedInstitutions = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredInstitutions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredInstitutions, currentPage]);
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const handleDeleteClick = (institutionId) => {
        if(window.confirm('Are you sure you want to delete this institution? This will also delete all associated courses.')) {
            onDeleteInstitution(institutionId);
        }
    };
    
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-semibold text-gray-800">Manage Institutions</h2>
                <Link
                    to="/admin/dashboard/institutions/add"
                    className="bg-brand-blue text-white text-center font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors"
                >
                    + Add New Institution
                </Link>
            </div>
            
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                 <select 
                    value={filterType}
                    onChange={handleFilterChange}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50"
                >
                    <option value="name">Name</option>
                    <option value="country">Country</option>
                    <option value="type">Type</option>
                </select>
                <input
                    type="text"
                    placeholder={`Filter by ${filterType}...`}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="flex-grow w-full px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50"
                />
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Type</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Country</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">State</th>
                            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {paginatedInstitutions.length > 0 ? paginatedInstitutions.map(inst => (
                            <tr key={inst.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="text-left py-3 px-4">{inst.name}</td>
                                <td className="text-left py-3 px-4">{inst.type}</td>
                                <td className="text-left py-3 px-4">{inst.country}</td>
                                <td className="text-left py-3 px-4">{inst.state}</td>
                                <td className="text-center py-3 px-4 space-x-2">
                                    <Link to={`/admin/dashboard/institutions/edit/${inst.id}`} className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-full">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDeleteClick(inst.id)} className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-gray-500">
                                    No institutions found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4">
                {paginatedInstitutions.length > 0 ? paginatedInstitutions.map(inst => (
                    <div key={inst.id} className="bg-gray-50 p-4 rounded-lg shadow space-y-3">
                        <div className="font-bold text-lg text-brand-blue">{inst.name}</div>
                        <div className="text-sm text-gray-600">
                            <p><span className="font-semibold">Type:</span> {inst.type}</p>
                            <p><span className="font-semibold">Location:</span> {inst.state}, {inst.country}</p>
                        </div>
                        <div className="flex justify-end space-x-2 pt-2 border-t border-gray-200">
                            <Link to={`/admin/dashboard/institutions/edit/${inst.id}`} className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-full">
                                Edit
                            </Link>
                            <button onClick={() => handleDeleteClick(inst.id)} className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full">
                                Delete
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-10 text-gray-500">
                        No institutions found matching your criteria.
                    </div>
                )}
            </div>


            {/* Pagination Controls */}
            {totalPages > 1 && (
                 <div className="flex justify-between items-center mt-6">
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button 
                             onClick={() => goToPage(currentPage + 1)}
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

export default AdminManageInstitutions;