
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const InfoPill = ({ label, value }) => (
    <div className="bg-blue-100 text-brand-blue p-4 rounded-lg text-center md:text-left">
        <p className="font-semibold text-sm uppercase tracking-wider">{label}</p>
        <p className="font-bold text-xl">{value}</p>
    </div>
);


const CourseDetailPage = ({ courses, institutions }) => {
    const { courseId } = useParams();
    const course = courses.find(c => c.id === parseInt(courseId || ''));
    const institution = course ? institutions.find(i => i.id === course.institutionId) : undefined;

    if (!course || !institution) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-brand-blue">Course not found</h1>
                <Link to="/courses" className="text-brand-gold hover:underline mt-4 inline-block">Back to Courses</Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50">
            {/* Header Section */}
            <div className="bg-brand-blue text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                     <p className="font-semibold text-brand-gold">{course.level}</p>
                     <h1 className="text-4xl md:text-5xl font-extrabold mt-2">{course.name}</h1>
                     <Link to={`/institutions/${institution.id}`} className="text-xl mt-4 inline-block hover:underline opacity-90">
                        Offered by {institution.name}
                     </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-brand-blue border-b-2 border-brand-gold pb-2 mb-4">Course Facilities</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{course.facilities}</p>
                        </div>
                    </div>

                    {/* Sidebar with Key Info */}
                    <aside className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                             <h3 className="text-2xl font-bold text-brand-blue mb-4">Key Information</h3>
                             <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                <InfoPill label="Duration" value={course.duration} />
                                <InfoPill label="Total Seats" value={course.totalSeats} />
                                <InfoPill label="Annual Fees" value={`$${course.annualFees.toLocaleString()}`} />
                             </div>
                             <a href={course.registrationUrl} target="_blank" rel="noopener noreferrer" className="mt-6 w-full text-center block bg-brand-gold text-brand-blue font-bold py-3 px-4 rounded-lg hover:bg-yellow-300 transition duration-300 transform hover:scale-105">
                                Register Now
                             </a>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;
