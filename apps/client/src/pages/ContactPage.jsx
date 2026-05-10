import React, { useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add submission logic or toast notification here
    };

    return (
        <div className="mt-28 mb-20 px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 uppercase tracking-wide">
                    Contact Us
                </h1>
                <div className="w-20 h-1 bg-amber-700 mx-auto mb-6"></div>
                <p className="text-stone-600 text-lg md:text-xl max-w-2xl mx-auto">
                    Have questions about our premium fabrics or need assistance with your order? We're here to help.
                </p>
            </div>

            {/* Contact Form Container */}
            <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-stone-700 font-semibold ml-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your full name"
                                className="w-full px-6 py-3 rounded-full border border-stone-300 focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none text-stone-700 transition"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-stone-700 font-semibold ml-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                className="w-full px-6 py-3 rounded-full border border-stone-300 focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none text-stone-700 transition"
                                required
                            />
                        </div>
                    </div>

                    {/* Subject Field */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="subject" className="text-stone-700 font-semibold ml-2">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="How can we help?"
                            className="w-full px-6 py-3 rounded-full border border-stone-300 focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none text-stone-700 transition"
                            required
                        />
                    </div>

                    {/* Message Field */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-stone-700 font-semibold ml-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message here..."
                            rows="5"
                            className="w-full px-6 py-4 rounded-3xl border border-stone-300 focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none text-stone-700 transition resize-none"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            className="bg-amber-700 text-white px-12 py-3 rounded-full font-bold text-lg hover:bg-amber-800 transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>

            {/* Additional Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
                <div className="p-6">
                    <div className="text-3xl mb-4">📍</div>
                    <h3 className="text-stone-900 font-bold mb-2">Our Office</h3>
                    <p className="text-stone-600">123 Textile Street, Fashion City, NY 10001</p>
                </div>
                <div className="p-6">
                    <div className="text-3xl mb-4">📞</div>
                    <h3 className="text-stone-900 font-bold mb-2">Call Us</h3>
                    <p className="text-stone-600">+1 (234) 567-890</p>
                </div>
                <div className="p-6">
                    <div className="text-3xl mb-4">✉️</div>
                    <h3 className="text-stone-900 font-bold mb-2">Email Us</h3>
                    <p className="text-stone-600">support@textile.com</p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
