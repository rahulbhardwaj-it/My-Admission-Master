import React from 'react';
import { useParams, Link } from 'react-router-dom';

const InfoPill = ({ label, value }) => (
    <div className="bg-blue-100 text-brand-blue p-4 rounded-lg">
        <p className="font-semibold">{label}</p>
        <p>{value}</p>
    </div>
);

const InstitutionDetailPage = ({ institutions, courses }) => {
    const { id } = useParams();
    const institution = institutions.find(inst => inst.id === parseInt(id || ''));
    const institutionCourses = courses.filter(course => course.institutionId === institution?.id);

    if (!institution) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-brand-blue">Institution not found</h1>
                <Link to="/institutions" className="text-brand-gold hover:underline mt-4 inline-block">Back to Institutions</Link>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Header Section */}
            <div className="relative h-80">
                <img src={institution.photoUrl} alt={institution.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-blue bg-opacity-60 flex items-center justify-center p-4">
                    <div className="text-center text-white flex flex-col md:flex-row items-center gap-6">
                        <img src={institution.logoUrl} alt={`${institution.name} Logo`} className="h-24 w-24 rounded-full object-contain bg-white p-2 shadow-lg flex-shrink-0" />
                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold">{institution.name}</h1>
                            <p className="text-lg md:text-xl mt-2">{institution.district}, {institution.state}, {institution.country}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-brand-blue border-b-2 border-brand-gold pb-2 mb-4">About {institution.name}</h2>
                            <p className="text-gray-700 leading-relaxed">{institution.about}</p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-brand-blue border-b-2 border-brand-gold pb-2 mb-4">Placement Information</h2>
                            <p className="text-gray-700 leading-relaxed">{institution.placement}</p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-brand-blue border-b-2 border-brand-gold pb-2 mb-4">Courses Offered</h2>
                            <div className="space-y-4">
                                {institutionCourses.length > 0 ? institutionCourses.map(course => (
                                    <div key={course.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold text-lg text-brand-blue">{course.name}</h4>
                                            <p className="text-sm text-gray-600">{course.level} - {course.duration} - {course.currency} {course.annualFees.toLocaleString()}/year</p>
                                        </div>
                                        <Link to={`/courses/${course.id}`} className="bg-brand-gold text-brand-blue font-semibold py-2 px-4 rounded-full hover:bg-yellow-300 transition-colors">
                                            View Details
                                        </Link>
                                    </div>
                                )) : <p className="text-gray-600">No courses listed for this institution yet.</p>}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar with Key Info */}
                    <aside className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                             <h3 className="text-2xl font-bold text-brand-blue mb-4">Key Information</h3>
                             <div className="space-y-4">
                                <InfoPill label="Type" value={institution.type} />
                                <InfoPill label="Established" value={institution.establishmentYear} />
                                <InfoPill label="Affiliated From" value={institution.affiliatedFrom} />
                                <InfoPill label="Admission Mode" value={institution.admissionMode} />
                                <InfoPill label="Country" value={institution.country} />
                                <InfoPill label="State" value={institution.state} />
                                <InfoPill label="District" value={institution.district} />
                             </div>
                             <a href={institution.registrationUrl} target="_blank" rel="noopener noreferrer" className="mt-6 w-full text-center block bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 transition duration-300">
                                Apply to Institution
                             </a>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default InstitutionDetailPage;