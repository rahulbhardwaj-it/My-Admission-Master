import React from 'react';
import { Link } from 'react-router-dom';
import { Institution, Course, Enquiry, Article, EnquiryStatus } from '../../types';

interface AdminDashboardHomeProps {
    institutions: Institution[];
    courses: Course[];
    enquiries: Enquiry[];
    articles: Article[];
}

// FIX: Changed JSX.Element to React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const StatCard: React.FC<{ title: string; value: number | string; icon: React.ReactNode; link: string; }> = ({ title, value, icon, link }) => (
    <Link to={link} className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="p-3 rounded-full bg-brand-blue text-white">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-brand-dark">{value}</p>
        </div>
    </Link>
);

const BarChart: React.FC<{ title: string, data: { label: string, value: number }[] }> = ({ title, data }) => {
    const maxValue = Math.max(...data.map(d => d.value), 1);
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-brand-dark mb-4">{title}</h3>
            <div className="space-y-4">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <p className="w-1/3 text-sm text-gray-600 truncate pr-2">{item.label}</p>
                        <div className="w-2/3 bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-brand-blue h-4 rounded-full flex items-center justify-end text-white text-xs pr-2"
                                style={{ width: `${(item.value / maxValue) * 100}%` }}
                            >
                                {item.value}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const AdminDashboardHome: React.FC<AdminDashboardHomeProps> = ({ institutions, courses, enquiries, articles }) => {
    const totalInstitutions = institutions.length;
    const totalCourses = courses.length;
    const newEnquiriesCount = enquiries.filter(e => e.status === EnquiryStatus.NEW).length;
    const totalArticles = articles.length;

    const recentEnquiries = enquiries
        .sort((a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime())
        .slice(0, 5);

    const coursesByInstitutionData = institutions
        .map(inst => ({
            label: inst.name,
            value: courses.filter(c => c.institutionId === inst.id).length
        }))
        .filter(d => d.value > 0)
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

    const enquiryStatusData = Object.values(EnquiryStatus).map(status => ({
        label: status,
        value: enquiries.filter(e => e.status === status).length
    }));

    return (
        <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Institutions" 
                    value={totalInstitutions}
                    link="/admin/dashboard/institutions"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                />
                <StatCard 
                    title="Total Courses" 
                    value={totalCourses}
                    link="/admin/dashboard/courses"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>}
                />
                <StatCard 
                    title="New Enquiries" 
                    value={newEnquiriesCount}
                    link="/admin/dashboard/enquiries"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                />
                 <StatCard 
                    title="Total Articles" 
                    value={totalArticles}
                    link="/admin/dashboard/articles"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6M7 8h6" /></svg>}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <BarChart title="Top Institutions by Course Count" data={coursesByInstitutionData} />
                <BarChart title="Enquiries by Status" data={enquiryStatusData} />
            </div>

            {/* Recent Enquiries Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-brand-dark">Recent Enquiries</h3>
                    <Link to="/admin/dashboard/enquiries" className="text-sm font-semibold text-brand-blue hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-2 px-3 uppercase font-semibold text-sm text-gray-600">Name</th>
                                <th className="text-left py-2 px-3 uppercase font-semibold text-sm text-gray-600 hidden sm:table-cell">Course Interest</th>
                                <th className="text-left py-2 px-3 uppercase font-semibold text-sm text-gray-600 hidden md:table-cell">Date</th>
                                <th className="text-left py-2 px-3 uppercase font-semibold text-sm text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {recentEnquiries.map(enquiry => (
                                <tr key={enquiry.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-3">{enquiry.name}</td>
                                    <td className="py-3 px-3 hidden sm:table-cell">{enquiry.courseInterest}</td>
                                    <td className="py-3 px-3 hidden md:table-cell">{enquiry.dateSubmitted}</td>
                                    <td className="py-3 px-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${enquiry.status === EnquiryStatus.NEW ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {enquiry.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;