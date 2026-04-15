import React, { useState } from 'react';
import { PublicNavbar } from './Navbar';
import { Footer } from './Footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for reaching out! We will get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-white font-['Sora']">
            <PublicNavbar activePage="contact" />
            
            <main className="pt-24 pb-16">
                <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
                    {/* Left: Contact Info */}
                    <div>
                        <span className="text-[#17b8a6] font-bold uppercase tracking-widest text-sm">Contact Us</span>
                        <h1 className="text-5xl font-black text-[#1a2d45] mt-4 mb-8">Get in Touch with Our Team.</h1>
                        <p className="text-gray-500 text-lg leading-relaxed mb-12">
                            Have questions about our courses, pricing, or enterprise solutions? We're here to help you every step of the way.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: "mail", title: "Email Us", detail: "support@learnsphere.com", subDetail: "Response within 24 hours" },
                                { icon: "phone", title: "Call Us", detail: "+1 (555) 123-4567", subDetail: "Mon-Fri, 9am - 5pm EST" },
                                { icon: "map", title: "Visit Us", detail: "123 Education Lane", subDetail: "San Francisco, CA 94103" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#1a2d45] group-hover:bg-[#1a2d45] group-hover:text-white transition-all shadow-sm">
                                        {item.icon === "mail" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>}
                                        {item.icon === "phone" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>}
                                        {item.icon === "map" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#1a2d45] mb-1">{item.title}</h4>
                                        <p className="text-[#1a2d45] font-medium">{item.detail}</p>
                                        <p className="text-gray-400 text-sm">{item.subDetail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="bg-gray-50 rounded-3xl p-10 shadow-sm border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Full Name</label>
                                    <input 
                                        type="text" name="name" required value={formData.name} onChange={handleChange}
                                        placeholder="Your Name"
                                        className="w-full bg-white border-transparent rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#1a2d45]/10 outline-none transition-all shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Email Address</label>
                                    <input 
                                        type="email" name="email" required value={formData.email} onChange={handleChange}
                                        placeholder="Your Email"
                                        className="w-full bg-white border-transparent rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#1a2d45]/10 outline-none transition-all shadow-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Subject</label>
                                <input 
                                    type="text" name="subject" required value={formData.subject} onChange={handleChange}
                                    placeholder="How can we help?"
                                    className="w-full bg-white border-transparent rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#1a2d45]/10 outline-none transition-all shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Message</label>
                                <textarea 
                                    name="message" required value={formData.message} onChange={handleChange}
                                    rows="5"
                                    placeholder="Type your message here..."
                                    className="w-full bg-white border-transparent rounded-3xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#1a2d45]/10 outline-none transition-all shadow-sm resize-none"
                                />
                            </div>
                            <button 
                                type="submit"
                                className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#1a2d45]/20"
                                style={{ background: "#1a2d45" }}
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
