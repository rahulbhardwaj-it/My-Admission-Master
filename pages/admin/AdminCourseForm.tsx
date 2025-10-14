import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Course, CourseLevel, Institution } from '../../types';

interface AdminCourseFormProps {
    institutions: Institution[];
    courses?: Course[];
    onAddCourse?: (course: Omit<Course, 'id'>) => void;
    onUpdateCourse?: (course: Course) => void;
}

const AdminCourseForm: React.FC<AdminCourseFormProps> = ({ institutions, courses, onAddCourse, onUpdateCourse }) => {
    const navigate = useNavigate();
    const { courseId } = useParams<{ courseId?: string }>();
    const isEditMode = Boolean(courseId);

    const [course, setCourse] = useState<Omit<Course, 'id'> | Course>({
        name: '',
        institutionId: institutions[0]?.id || 0,
        level: CourseLevel.UG,
        duration: '',
        annualFees: 0,
        totalSeats: 0,
        facilities: '',
        registrationUrl: '',
    });

    useEffect(() => {
        if (isEditMode && courses) {
            const courseToEdit = courses.find(c => c.id === parseInt(courseId!));
            if (courseToEdit) {
                setCourse(courseToEdit);
            }
        }
    }, [isEditMode, courseId, courses]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const isNumeric = ['institutionId', 'annualFees', 'totalSeats'].includes(name);
        setCourse(prev => ({ ...prev, [name]: isNumeric ? parseInt(value) || 0 : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode) {
            onUpdateCourse?.(course as Course);
            alert('Course updated successfully!');
        } else {
            onAddCourse?.(course);
            alert('Course added successfully!');
        }
        navigate('/admin/dashboard/courses');
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{isEditMode ? 'Edit Course' : 'Add New Course'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Column 1 */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Course Name</label>
                            <input type="text" name="name" id="name" value={course.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                        </div>
                        <div>
                            <label htmlFor="institutionId" className="block text-sm font-medium text-gray-700">Institute</label>
                            <select name="institutionId" id="institutionId" value={course.institutionId} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold">
                                {institutions.map(inst => (
                                    <option key={inst.id} value={inst.id}>{inst.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="level" className="block text-sm font-medium text-gray-700">Course Level</label>
                            <select name="level" id="level" value={course.level} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold">
                                {Object.values(CourseLevel).map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
                            <input type="text" name="duration" id="duration" value={course.duration} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold" placeholder="e.g., 4 Years"/>
                        </div>
                    </div>
                    {/* Column 2 */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="annualFees" className="block text-sm font-medium text-gray-700">Annual Fees</label>
                            <input type="number" name="annualFees" id="annualFees" value={course.annualFees} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                        </div>
                        <div>
                            <label htmlFor="totalSeats" className="block text-sm font-medium text-gray-700">Total Seats</label>
                            <input type="number" name="totalSeats" id="totalSeats" value={course.totalSeats} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                        </div>
                        <div>
                            <label htmlFor="registrationUrl" className="block text-sm font-medium text-gray-700">Registration URL</label>
                            <input type="url" name="registrationUrl" id="registrationUrl" value={course.registrationUrl} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold" placeholder="https://example.com/register"/>
                        </div>
                    </div>
                </div>

                {/* Full-width fields */}
                <div>
                    <label htmlFor="facilities" className="block text-sm font-medium text-gray-700">Facilities</label>
                    <textarea name="facilities" id="facilities" rows={4} value={course.facilities} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={() => navigate('/admin/dashboard/courses')} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                     <button type="submit" className="bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-lg hover:bg-yellow-300 transition-colors">
                        {isEditMode ? 'Update Course' : 'Save Course'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminCourseForm;