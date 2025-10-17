import React, { useState } from 'react';

const ContactPage = ({ siteSettings }) => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-brand-blue tracking-tight sm:text-5xl">Get in Touch</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">We'd love to hear from you! Whether you have a question about our services, or anything else, our team is ready to answer all your questions.</p>
                </div>

                <div className="mt-12">
                    {/* Contact Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg text-center">
                            <h3 className="text-xl font-bold text-brand-blue">Address</h3>
                            <p className="text-gray-600 mt-2">{siteSettings.address}</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg text-center">
                            <h3 className="text-xl font-bold text-brand-blue">Email</h3>
                            <p className="text-gray-600 mt-2">{siteSettings.email}</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg text-center">
                            <h3 className="text-xl font-bold text-brand-blue">Phone</h3>
                            <p className="text-gray-600 mt-2">{siteSettings.phone}</p>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="mt-16 max-w-3xl mx-auto">
                         <h2 className="text-3xl font-bold text-brand-blue text-center mb-8">Send Us a Message</h2>
                        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                            {submitted ? (
                                <div className="text-center py-12">
                                    <h3 className="text-2xl font-bold text-brand-blue mb-4">Thank You for Your Message!</h3>
                                    <p className="text-gray-700">We will get back to you as soon as possible.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                        <input type="text" name="name" id="name" required className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input type="email" name="email" id="email" required className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold" />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                                        <input type="text" name="subject" id="subject" required className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                        <textarea id="message" name="message" rows={4} required className="mt-1 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold"></textarea>
                                    </div>
                                    <div>
                                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-brand-blue bg-brand-gold hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold">
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>


                {/* Map Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-brand-blue text-center mb-8">Our Location</h2>
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.137351662953!2d77.21958431508204!3d28.6256059824204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741e925%3A0x40e34a72c7a5a6b!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1633512111000!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            title="Google Maps Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;