import { useState, useEffect } from "react";
import { DashboardSidebar, DashboardTopBar } from "./Navbar";
import CourseCard from "./CourseCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const MyCourses = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("token") || "";
    const userName = localStorage.getItem("userName") || "Student";
    const userRole = localStorage.getItem("role") || "student";

    useEffect(() => {
        const fetchEnrolled = async () => {
            if (!token) { navigate("/login"); return; }
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses/enrolled`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEnrolledCourses(res.data);
            } catch (err) {
                console.error("Error fetching enrolled courses", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEnrolled();
    }, [token, navigate]);

    return (
        <div className="flex h-screen bg-gray-50" style={{ fontFamily: "'Sora', sans-serif" }}>
            <DashboardSidebar
                role={userRole}
                activePage="my-courses"
                userName={userName}
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardTopBar
                    breadcrumb={["Student Dashboard", "My Courses"]}
                    userName={userName}
                    onMenuClick={() => setMobileMenuOpen(true)}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <header className="mb-8">
                        <h1 className="text-3xl font-black text-[#1a2d45] mb-2 px-1">My Courses</h1>
                        <p className="text-gray-400 text-sm px-1">Track your progress and continue where you left off.</p>
                    </header>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white rounded-3xl h-64 animate-pulse border border-gray-100" />
                            ))}
                        </div>
                    ) : enrolledCourses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-[#1a2d45] mb-2">No courses enrolled yet</h2>
                            <p className="text-gray-400 text-sm mb-6 max-w-xs transition-all hover:scale-110">Visit our catalog to find your next favorite course!</p>
                            <button 
                                onClick={() => navigate("/student/catalog")}
                                className="px-6 py-3 bg-[#1a2d45] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/10 hover:scale-105 active:scale-95 transition-all"
                            >
                                Browse Catalog
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {enrolledCourses.filter(item => item && item.course).map((item) => (
                                <CourseCard
                                    key={item.course._id}
                                    title={item.course.title}
                                    description={item.course.description}
                                    image={item.course.image}
                                    instructor={item.course.instructorName}
                                    duration={item.course.duration}
                                    level={item.course.level}
                                    price={item.course.price}
                                    students={item.course.totalEnrolled}
                                    category={item.course.category}
                                    showProgress={true}
                                    progress={item.progress || 0}
                                    actionLabel="Continue Learning"
                                    onAction={() => navigate(`/learning/${item.course._id}`)}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
