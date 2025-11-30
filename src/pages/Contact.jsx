import React, { useState } from "react";
import Layout from "../components/layout"
import { GrMail } from "react-icons/gr";
import FAQ from "../components/faq";
import { FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        company: '',
        help: '',
        message: ''
    });

    const contactDetails = [
        { text: "contact@remitex.co", icon: <GrMail />, href: "mailto:contact@remitex.co" },
        { text: "2667 Kipling Ave Etobicoke, ON M9V 4N9", icon: <FaMapMarkerAlt />, href: "#" },
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        // Add your form submission logic here
    };
    
    return (
        <Layout>
            {/* Hero Section */}
            <section style={{fontFamily: 'Dm Sans'}} className="bg-[#0328EE] text-white py-16 lg:py-20 px-6 lg:px-32">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                        Get in Touch
                    </h1>
                    <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
                    <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Contact Form Section */}
            <section style={{fontFamily: 'Dm Sans'}} className="py-16 lg:py-20 px-6 lg:px-32 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        
                        {/* Form */}
                        <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg">
                            <h2 className="text-2xl lg:text-3xl font-bold text-[#0328EE] mb-6">
                                Send us a Message
                            </h2>
                            <div className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input 
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Full Name" 
                                        className="border-2 border-gray-200 p-4 rounded-xl focus:border-[#0328EE] focus:outline-none transition-colors"
                                    />
                                    <input 
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="email@example.com" 
                                        className="border-2 border-gray-200 p-4 rounded-xl focus:border-[#0328EE] focus:outline-none transition-colors"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input 
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        placeholder="Company Name" 
                                        className="border-2 border-gray-200 p-4 rounded-xl focus:border-[#0328EE] focus:outline-none transition-colors"
                                    />
                                    <input 
                                        type="text"
                                        name="help"
                                        value={formData.help}
                                        onChange={handleInputChange}
                                        placeholder="How can we help?" 
                                        className="border-2 border-gray-200 p-4 rounded-xl focus:border-[#0328EE] focus:outline-none transition-colors"
                                    />
                                </div>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Your Message" 
                                    rows="6"
                                    className="border-2 border-gray-200 p-4 rounded-xl focus:border-[#0328EE] focus:outline-none transition-colors resize-none"
                                ></textarea>
                                <button 
                                    onClick={handleSubmit}
                                    className="bg-[#0328EE] text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                                >
                                    SEND MESSAGE
                                </button>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div style={{fontFamily: 'Dm Sans'}} className="bg-[#0328EE] text-white rounded-3xl p-8 lg:p-10 shadow-lg flex flex-col justify-center">
                            <div className="mb-8">
                                <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                                    Want to reach us directly?
                                </h2>
                                <p className="text-base lg:text-lg opacity-90 leading-relaxed">
                                    Feel free to contact us through any of the following channels. We're here to help you with any questions or concerns.
                                </p>
                            </div>
                            
                            <div className="space-y-6">
                                {contactDetails.map((item, index) => (
                                    <div key={index} className="flex items-start gap-4 group">
                                        <span className="text-[#0328EE] flex items-center justify-center bg-white p-3 rounded-xl min-w-12 h-12 group-hover:scale-110 transition-transform duration-200">
                                            {item.icon}
                                        </span>
                                        <a 
                                            href={item.href} 
                                            className="text-white no-underline text-base lg:text-lg hover:opacity-80 transition-opacity flex items-center"
                                        >
                                            {item.text}
                                        </a>
                                    </div>
                                ))}
                            </div>

                            {/* Additional Info Card */}
                            <div className="mt-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
                                <p className="text-sm opacity-90">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                                <p className="text-sm opacity-90">Saturday - Sunday: Closed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section (Optional) */}
            <section style={{fontFamily: 'Dm Sans'}} className="py-16 lg:py-20 px-6 lg:px-32 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#0328EE] mb-4">
                            Visit Our Office
                        </h2>
                        <p className="text-gray-600 text-base lg:text-lg">
                            Come say hello at our office headquarters
                        </p>
                    </div>
                    <div className="bg-gray-200 rounded-3xl overflow-hidden shadow-lg h-[400px] flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <FaMapMarkerAlt className="text-5xl mx-auto mb-4 text-[#0328EE]" />
                            <p className="text-lg font-semibold">Map Integration</p>
                            <p className="text-sm">2667 Kipling Ave Etobicoke, ON M9V 4N9</p>
                        </div>
                    </div>
                </div>
            </section>

            <FAQ/>

        </Layout>
    )
}

export default Contact