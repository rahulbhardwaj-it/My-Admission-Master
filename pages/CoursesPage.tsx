import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CourseLevel } from '../types';

const CourseCard = ({ course }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
        <div className="p-6 flex-grow">
            <p className="text-sm text-brand-gold font-semibold">{course.level}</p>
            <h3 className="text-xl font-bold text-brand-blue mt-1 mb-2">{course.name}</h3>
            <Link to={`/institutions/${course.institution.id}`} className="text-gray-600 hover:text-brand-blue transition-colors duration-300 mb-4 block">
                {course.institution.name}
            </Link>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
                <p><span className="font-semibold">Duration:</span> {course.duration}</p>
                <p><span className="font-semibold">Seats:</span> {course.totalSeats}</p>
                <p><span className="font-semibold">Fees:</span> {course.currency} {course.annualFees.toLocaleString()}/year</p>
            </div>
        </div>
        <div className="p-6 bg-gray-50">
            <Link to={`/courses/${course.id}`} className="inline-block w-full text-center bg-brand-blue text-white font-bold py-2 px-4 rounded-full hover:bg-blue-800 transition-colors duration-300">
                View Details
            </Link>
        </div>
    </div>
);

const CoursesPage = ({ courses, institutions }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        level: '',
        institutionId: '',
    });

    const coursesWithInstitutions = useMemo(() => {
        return courses.map(course => ({
            ...course,
            institution: institutions.find(inst => inst.id === course.institutionId)
        })).filter(c => c.institution); // Ensure institution exists
    }, [courses, institutions]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredCourses = useMemo(() => {
        return coursesWithInstitutions.filter(course => {
            return (
                (filters.level ? course.level === filters.level : true) &&
                (filters.institutionId ? course.institutionId === parseInt(filters.institutionId) : true) &&
                (searchTerm ? course.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
            );
        });
    }, [searchTerm, filters, coursesWithInstitutions]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-brand-blue tracking-tight sm:text-5xl">Find Your Perfect Course</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">Browse through a diverse range of programs to kickstart your career.</p>
                </div>

                {/* Filters and Search */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <input
                        type="text"
                        placeholder="Search by course name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50"
                    />
                    <select name="level" value={filters.level} onChange={handleFilterChange} className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50">
                        <option value="">All Levels</option>
                        {Object.values(CourseLevel).map(level => <option key={level} value={level}>{level}</option>)}
                    </select>
                    <select name="institutionId" value={filters.institutionId} onChange={handleFilterChange} className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50">
                        <option value="">All Institutions</option>
                        {institutions.map(inst => <option key={inst.id} value={inst.id}>{inst.name}</option>)}
                    </select>
                </div>

                {/* Course List */}
                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map(course => (
                           <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-semibold text-gray-700">No Courses Found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursesPage;