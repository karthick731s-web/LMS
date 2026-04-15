import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
const BG_IMAGE =
    "https://ik.imagekit.io/zqdmtrlsv/LMS/Gemini_Generated_Image_u5j363u5j363u5j3.png";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handlesubmit = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/students/login`, { email, password });
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);
                localStorage.setItem("userName", res.data.userName || "User");
                // Redirect based on role
                const role = res.data.role;
                if (role === "admin") {
                    navigate("/admin-dashboard");
                } else if (role === "instructor") {
                    navigate("/instructor-dashboard");
                } else {
                    navigate("/dashboard");
                }
            }
        }
        catch (error) {
            console.error("Error during login:", error);
            alert("Login failed. Please check your credentials.");
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0d1b2e] font-sans">

            {/* Full screen container (removed mx-4 padding) */}
            <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden">

                {/* Left Panel — Hidden on mobile */}
                <div className="hidden md:flex relative w-[60%] items-center justify-center">

                    {/* Background image */}
                    <img
                        src={BG_IMAGE}
                        alt="Students collaborating"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2e]/60 via-[#0d1b2e]/30 to-transparent" />
                </div>

                {/* Right Panel — Login Form */}
                <div className="w-full md:w-[40%] h-full bg-[#1a2d45] flex items-center justify-center p-6 md:p-10">

                    <div className="grid gap-3 w-full max-w-md bg-white rounded-2xl px-6 py-8 shadow-xl">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-[#1a2d45]">LearnSphere</h1>
                        </div>
                        
                        {/* Email */}
                        <div className="mb-5">
                            <label className="block text-[#1a2d45] text-sm font-semibold mb-2 tracking-wide">
                                Email
                            </label>
                            <input
                                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full border border-gray-200 rounded-full px-5 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-2">
                            <label className="block text-[#1a2d45] text-sm font-semibold mb-2 tracking-wide">
                                Password
                            </label>
                            <input
                                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full border border-gray-200 rounded-full px-5 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>


                        {/* Button */}
                        <button
                            type="button" onClick={handlesubmit}
                            className="w-full py-3 rounded-full text-white font-semibold text-base 
  bg-[#1a2d45] hover:bg-[#243a5e] 
  transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Login
                        </button>

                        {/* Links */}
                        <a
                            href="#"
                            className="text-[#1a2d45] text-sm font-medium hover:underline"
                        >
                            Forgot Password?
                        </a>

                        <div className="mt-3 text-center text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-[#1a2d45] font-semibold hover:underline"
                            >
                                Register
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}