import React from 'react';

const AdminDashboardHome: React.FC = () => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome, Admin!</h2>
            <p className="mt-4 text-gray-600">
                From this dashboard, you will be able to manage institutions, courses, and view enquiries.
                Use the navigation on the left to access different sections.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-100 p-6 rounded-lg">
                    <h3 className="font-bold text-brand-blue">Manage Institutions</h3>
                    <p className="text-sm text-blue-800 mt-2">Add, edit, or remove partner institutions from your website.</p>
                </div>
                 <div className="bg-yellow-100 p-6 rounded-lg">
                    <h3 className="font-bold text-yellow-800">Manage Courses</h3>
                    <p className="text-sm text-yellow-700 mt-2">Update course details, fees, and availability for each institution.</p>
                </div>
                 <div className="bg-green-100 p-6 rounded-lg">
                    <h3 className="font-bold text-green-800">View Enquiries</h3>
                    <p className="text-sm text-green-700 mt-2">See a list of all student enquiries submitted through the website.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
