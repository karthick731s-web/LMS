import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {useState} from "react";
import axios from "axios";

const BG_IMAGE =
    "https://ik.imagekit.io/zqdmtrlsv/LMS/Gemini_Generated_Image_u5j363u5j363u5j3.png";

export function RegisterT() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        college: "",
        dept: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handlesubmit = async () => {
        try {
            const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/instructors/register`,formData);
            if(res.status===201){
                alert("Registration successful! Please login.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed. Please try again.");
        }
    }
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0d1b2e] font-sans">

            {/* Full screen container */}
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

                    {/* Brand text on left panel */}
                    <div className="relative z-10 flex flex-col items-start px-16">


                    </div>
                </div>

                {/* Right Panel — Register Form */}
                <div className="w-full md:w-[40%] h-full bg-[#1a2d45] flex  items-center justify-center p-6 md:p-10 overflow-y-auto">

                    <div className="grid gap-4 w-full max-w-md bg-white rounded-2xl px-6 py-8 shadow-xl my-auto">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-[#1a2d45]">LearnSphere</h1>
                        </div>
                         <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-[#1a2d45]">Instructor Registration</h1>
                        </div>
                        {/* Header */}
                        <div className="text-center mb-2">
                            <h1 className="text-2xl font-semibold text-[#1a2d45]">Create Account</h1>

                        </div>

                        {/* Full Name */}
                        <div>
                            <label className="block text-[#1a2d45] text-sm font-semibold mb-2 tracking-wide">
                                Full Name
                            </label>
                            <input name="name" onChange={handleChange}
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full border border-gray-200 rounded-full px-5 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-[#1a2d45] text-sm font-semibold mb-2 tracking-wide">
                                Email
                            </label>
                            <input name="email" onChange={handleChange}
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-200 rounded-full px-5 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-[#1a2d45] text-sm font-semibold mb-2 tracking-wide">
                                Password
                            </label>
                            <input
                                type="password" name="password" onChange={handleChange}
                                placeholder="Create a password"
                                className="w-full border border-gray-200 rounded-full px-5 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                            />
                        </div>

{/* College */}
                        <div>
                            <label className="block text-[#1a2d45] text-sm font-semibold mb-2 tracking-wide">
                                College
                            </label>
                            <input
                                type="text" name="college" onChange={handleChange}
                                placeholder="Enter your college name"
                                className="w-full border border-gray-200 rounded-full px-5 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                            />
                        </div>

                        {/* Department */}
                        <div>
                            <label className="block text-[#1a2d45] text-sm font-semibold mb-2 tracking-wide">
                                Department
                            </label>
                            <select name="dept" onChange={handleChange}
                                className="w-full border border-gray-200 rounded-full px-5 py-3 text-sm bg-gray-50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition appearance-none cursor-pointer"
                                defaultValue=""
                            >
                                <option value="" disabled>Select your department</option>
                                <option value="cs">Computer Science</option>
                                <option value="it">Information Technology</option>
                                <option value="ece">Electronics & Communication</option>
                                <option value="eee">Electrical & Electronics</option>
                                <option value="mech">Mechanical Engineering</option>
                                <option value="civil">Civil Engineering</option>
                                <option value="bba">Business Administration</option>
                                <option value="mba">MBA</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Register Button */}
                        <button
                            type="button" onClick={handlesubmit}
                            className="w-full py-3 rounded-full text-white font-semibold text-base
                            bg-[#1a2d45] hover:bg-[#243a5e]
                            transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mt-1"
                        >
                            Register
                        </button>

                        {/* Login Link */}
                        <div className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/tlogin"
                                className="text-[#1a2d45] font-semibold hover:underline"
                            >
                                Login
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
