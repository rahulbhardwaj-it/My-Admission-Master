
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CourseLevel } from '../../types';

const ITEMS_PER_PAGE = 5;

const AdminManageCourses = ({ courses, institutions, onDeleteCourse }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ level: '', institutionId: '' });
    const [currentPage, setCurrentPage] = useState(1);
    
    const coursesWithInstitutions = useMemo(() => {
        return courses.map(course => ({
            ...course,
            institutionName: institutions.find(inst => inst.id === course.institutionId)?.name || 'Unknown'
        }));
    }, [courses, institutions]);

    const filteredCourses = useMemo(() => {
        return coursesWithInstitutions.filter(course => {
            return (
                (filters.level ? course.level === filters.level : true) &&
                (filters.institutionId ? course.institutionId === parseInt(filters.institutionId) : true) &&
                (searchTerm ? course.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
            );
        });
    }, [searchTerm, filters, coursesWithInstitutions]);
    
    const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);

    const paginatedCourses = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredCourses, currentPage]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({...prev, [name]: value}));
        setCurrentPage(1);
    };
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    }

    const handleDeleteClick = (courseId) => {
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            onDeleteCourse(courseId);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Manage Courses</h2>
                <Link
                    to="/admin/dashboard/courses/add"
                    className="bg-brand-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors"
                >
                    + Add New Course
                </Link>
            </div>

             {/* Search and Filter Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by course name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50"
                />
                 <select name="level" value={filters.level} onChange={handleFilterChange} className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50">
                    <option value="">Filter by Level</option>
                    {Object.values(CourseLevel).map(level => <option key={level} value={level}>{level}</option>)}
                </select>
                <select name="institutionId" value={filters.institutionId} onChange={handleFilterChange} className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50">
                    <option value="">Filter by Institution</option>
                    {institutions.map(inst => <option key={inst.id} value={inst.id}>{inst.name}</option>)}
                </select>
            </div>

            {/* Courses Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Course Name</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Institution</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Level</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Duration</th>
                            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {paginatedCourses.length > 0 ? paginatedCourses.map(course => (
                            <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="text-left py-3 px-4">{course.name}</td>
                                <td className="text-left py-3 px-4">{course.institutionName}</td>
                                <td className="text-left py-3 px-4">{course.level}</td>
                                <td className="text-left py-3 px-4">{course.duration}</td>
                                <td className="text-center py-3 px-4 space-x-2">
                                    <Link to={`/admin/dashboard/courses/edit/${course.id}`} className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-full">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDeleteClick(course.id)} className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )) : (
                             <tr>
                                <td colSpan={5} className="text-center py-10 text-gray-500">
                                    No courses found matching your criteria.
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

export default AdminManageCourses;
