import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BG_IMAGE = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&auto=format&fit=crop";

export function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handlesubmit = async () => {
        if (!email || !password) {
            return alert("Please enter both email and password.");
        }
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/login`, { email, password });
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);
                localStorage.setItem("userName", res.data.userName || "Admin");
                navigate("/admin-dashboard");
            }
        }
        catch (error) {
            console.error("Admin login error:", error);
            const msg = error.response?.data?.message || "Login failed. Please check your admin credentials.";
            alert(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0d1b2e] font-sans">
            <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden">
                {/* Left Panel */}
                <div className="hidden md:flex relative w-[60%] items-center justify-center">
                    <img
                        src={BG_IMAGE}
                        alt="Security and Control"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2e]/80 via-[#0d1b2e]/40 to-transparent" />
                    <div className="relative z-10 px-12 text-white">
                        <h2 className="text-4xl font-black mb-4">Command Center</h2>
                        <p className="text-lg opacity-80 max-w-md">Admin portal for LearnSphere LMS. Manage users, courses, and system integrity.</p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-full md:w-[40%] h-full bg-[#1a2d45] flex items-center justify-center p-6 md:p-10">
                    <div className="grid gap-6 w-full max-w-md bg-white rounded-3xl px-8 py-10 shadow-2xl">
                        <div className="text-center mb-4">
                            <h1 className="text-3xl font-black text-[#1a2d45] flex items-center justify-center gap-2">
                                <span className="w-10 h-10 rounded-xl bg-[#1a2d45] text-white flex items-center justify-center">L</span>
                                LearnSphere
                            </h1>
                            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-4">Administrative Access</p>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[#1a2d45] text-xs font-black uppercase tracking-widest mb-2 ml-1">
                                    Admin Email
                                </label>
                                <input
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@lms.com"
                                    className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 text-sm bg-gray-50 focus:outline-none focus:border-[#17b8a6] transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-[#1a2d45] text-xs font-black uppercase tracking-widest mb-2 ml-1">
                                    Secure Password
                                </label>
                                <input
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full border-2 border-gray-100 rounded-2xl px-5 py-4 text-sm bg-gray-50 focus:outline-none focus:border-[#17b8a6] transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="button" 
                            onClick={handlesubmit}
                            disabled={loading}
                            className="w-full py-4 rounded-2xl text-white font-black text-sm uppercase tracking-widest bg-[#1a2d45] hover:bg-[#17b8a6] transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-900/20 disabled:opacity-50"
                        >
                            {loading ? "Authenticating..." : "Initialize Dashboard"}
                        </button>

                        <div className="mt-4 text-center">
                            <button onClick={() => navigate("/")} className="text-gray-400 text-xs font-bold hover:text-[#1a2d45] transition-colors">
                                ← Return to Public Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
