
import React, { useState } from 'react';

const EnquiryForm = ({ courses, onAddEnquiry }) => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        courseInterest: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddEnquiry({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            courseInterest: formData.courseInterest,
        });
        setSubmitted(true);
    };
    
    if (submitted) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
                 <h3 className="text-2xl font-bold text-brand-blue mb-4">Thank You!</h3>
                 <p className="text-gray-700">Our career counsellor will get in touch with you shortly.</p>
            </div>
        )
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-2xl">
            <h3 className="text-2xl font-bold text-brand-blue mb-2 text-center">Get Your Free Career Counselling Today</h3>
            <p className="text-gray-600 text-center mb-6">Fill out the form below to get started.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50" placeholder="Your Name" />
                </div>
                <div>
                    <label htmlFor="phone" className="sr-only">Phone</label>
                    <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50" placeholder="Phone Number" />
                </div>
                <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50" placeholder="Email Address" />
                </div>
                <div>
                    <label htmlFor="courseInterest" className="sr-only">Course of Interest</label>
                    <select
                        id="courseInterest"
                        name="courseInterest"
                        required
                        value={formData.courseInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-gray-300 focus:border-brand-gold focus:ring focus:ring-brand-gold focus:ring-opacity-50"
                    >
                        <option value="" disabled>Select Course of Interest</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.name}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="w-full bg-brand-gold text-brand-blue font-bold py-3 px-4 rounded-lg hover:bg-yellow-300 transition duration-300 ease-in-out transform hover:scale-105">
                    Request Counselling
                </button>
            </form>
        </div>
    );
};

export default EnquiryForm;
