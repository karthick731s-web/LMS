import { RegisterS } from "./Component/RegisterS.jsx";
import { Login } from "./Component/Login.jsx";
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import { StudentDashboard } from "./Component/StudentDashboard.jsx";
import { Instructor } from "./Component/Instructor.jsx";
import { HomePage } from "./Component/Home.jsx";
import { TLogin } from "./Component/Tlogin.jsx";
import { RegisterT } from "./Component/RegisterT.jsx";
import { ManageUsers } from "./Component/ManageUsers.jsx";
import { ManageCourses } from "./Component/ManageCourses.jsx";
import About from "./Component/About.jsx";
import Contact from "./Component/Contact.jsx";
import { Profile } from "./Component/Profile.jsx";
import ProtectedRoute from "./Component/ProtectedRoute.jsx";
import LearningPage from "./Component/LearningPage.jsx";
import { MyCourses } from "./Component/MyCourses.jsx";
import { Catalog } from "./Component/Catalog.jsx";
import { Reports } from "./Component/Reports.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import CourseCard from "./Component/CourseCard.jsx";
import { AdminDashboard } from "./Component/AdminDashboard.jsx";
import { AdminStudentManagement } from "./Component/AdminStudentManagement.jsx";
import { AdminInstructorManagement } from "./Component/AdminInstructorManagement.jsx";
import { AdminLogin } from "./Component/AdminLogin.jsx";

const LearningPageWrapper = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token") || "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cRes, uRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/api/courses/${courseId}`),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, { headers: { Authorization: `Bearer ${token}` } })
                ]);
                setCourse(cRes.data);
                setUser(uRes.data.user);
            } catch (err) {
                console.error(err);
                navigate("/dashboard");
            }
        };
        fetchData();
    }, [courseId, token, navigate]);

    if (!course || !user) return <div className="h-screen flex items-center justify-center font-black text-slate-400">Loading Learning Environment...</div>;

    return <LearningPage course={course} user={user} onBack={() => navigate(-1)} />;
};

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/tlogin" element={<TLogin />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/register" element={<RegisterS />} />
                <Route path="/tregister" element={<RegisterT />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/courses" element={<CourseCard />} />

                {/* Protected Student Routes */}
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute allowedRoles={["student"]}>
                            <StudentDashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/student/profile" 
                    element={
                        <ProtectedRoute allowedRoles={["student"]}>
                            <Profile role="student" />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/student/my-courses" 
                    element={
                        <ProtectedRoute allowedRoles={["student"]}>
                            <MyCourses />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/student/catalog" 
                    element={
                        <ProtectedRoute allowedRoles={["student"]}>
                            <Catalog />
                        </ProtectedRoute>
                    } 
                />

                {/* Protected Instructor Routes */}
                <Route 
                    path="/instructor-dashboard" 
                    element={
                        <ProtectedRoute allowedRoles={["instructor", "admin"]}>
                            <Instructor />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/instructor/manage-users" 
                    element={
                        <ProtectedRoute allowedRoles={["instructor", "admin"]}>
                            <ManageUsers />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/instructor/manage-courses" 
                    element={
                        <ProtectedRoute allowedRoles={["instructor", "admin"]}>
                            <ManageCourses />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/instructor/profile" 
                    element={
                        <ProtectedRoute allowedRoles={["instructor", "admin"]}>
                            <Profile role="instructor" />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/instructor/reports" 
                    element={
                        <ProtectedRoute allowedRoles={["instructor", "admin"]}>
                            <Reports />
                        </ProtectedRoute>
                    } 
                />

                {/* Protected Admin Routes */}
                <Route 
                    path="/admin-dashboard" 
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/students" 
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminStudentManagement />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/instructors" 
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminInstructorManagement />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/profile" 
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <Profile role="admin" />
                        </ProtectedRoute>
                    } 
                />
                
                <Route 
                    path="/learning/:courseId" 
                    element={
                        <ProtectedRoute allowedRoles={["student", "instructor", "admin"]}>
                            <LearningPageWrapper />
                        </ProtectedRoute>
                    } 
                />

                {/* Catch-all redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};