import { useState, useEffect } from "react";
import { DashboardSidebar, DashboardTopBar } from "./Navbar";
import CourseCard from "./CourseCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const StudentDashboard = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userData, setUserData] = useState({ name: "Student", role: "student", college: "", dept: "", email: "" });
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [coursesLoading, setCoursesLoading] = useState(true);
    const [enrolledLoading, setEnrolledLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || "";

    const fetchData = async () => {
        if (!token) { navigate("/login"); return; }
        try {
            const [profileRes, coursesRes, enrolledRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(`${import.meta.env.VITE_API_URL}/api/courses`),
                axios.get(`${import.meta.env.VITE_API_URL}/api/courses/enrolled`, { headers: { Authorization: `Bearer ${token}` } })
            ]);
            setUserData(profileRes.data.user);
            setCourses(coursesRes.data);
            setEnrolledCourses(enrolledRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        } finally {
            setLoading(false);
            setCoursesLoading(false);
            setEnrolledLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token, navigate]);

    const handleEnroll = async (courseId) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/courses/enroll/${courseId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Enrollment successful!");
            fetchData(); // Refresh data
        } catch (error) {
            alert(error.response?.data?.message || "Enrollment failed.");
        }
    };

    const studentName = userData.name || "Student";

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center" style={{ fontFamily: "'Sora', sans-serif" }}>
                <div className="text-center space-y-3">
                    <div className="w-10 h-10 border-4 border-[#1a2d45] border-t-[#17b8a6] rounded-full animate-spin mx-auto"></div>
                    <p className="font-bold text-[#1a2d45]">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50" style={{ fontFamily: "'Sora', sans-serif" }}>
            <DashboardSidebar
                role={userData.role || "student"}
                activePage="dashboard"
                userName={studentName}
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardTopBar
                    breadcrumb={["Student Dashboard", "Dashboard"]}
                    userName={studentName}
                    onMenuClick={() => setMobileMenuOpen(true)}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {/* Welcome Header */}
                    <header className="mb-8">
                        <h1 className="text-3xl font-black text-[#1a2d45]">Welcome, {studentName.split(" ")[0]}!</h1>
                        <p className="text-gray-400 text-sm mt-1">Browse and enroll in courses published by your instructors.</p>
                    </header>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                        {[
                            { label: "Enrolled Courses", value: enrolledLoading ? "..." : enrolledCourses.length, icon: "📖" },
                            { label: "Available Courses", value: coursesLoading ? "..." : courses.length, icon: "📚" },
                            { label: "College", value: userData.college || "N/A", icon: "🏫" },
                            { label: "Department", value: userData.dept || "N/A", icon: "🎓" }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all">
                                <div>
                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</div>
                                    <div className="text-2xl font-black text-[#1a2d45]">{stat.value}</div>
                                </div>
                                <div className="text-3xl opacity-20 hover:opacity-100 transition-opacity">{stat.icon}</div>
                            </div>
                        ))}
                    </div>

                    {/* My Courses Section */}
                    {enrolledCourses.length > 0 && (
                        <section className="mb-12">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-black text-[#1a2d45]">My Learning</h2>
                                <span className="text-sm text-[#17b8a6] font-bold">In Progress</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {enrolledCourses.filter(e => e && e.course).map(enrolled => (
                                    <CourseCard
                                        key={enrolled.course._id}
                                        title={enrolled.course.title}
                                        description={enrolled.course.description}
                                        image={enrolled.course.image || "https://ik.imagekit.io/zqdmtrlsv/LMS/Gemini_Generated_Image_u5j363u5j363u5j3.png"}
                                        instructor={enrolled.course.instructorName}
                                        duration={enrolled.course.duration}
                                        level={enrolled.course.level}
                                        price={enrolled.course.price}
                                        students={enrolled.course.totalEnrolled}
                                        category={enrolled.course.category}
                                        showProgress={true}
                                        progress={enrolled.progress || Math.floor(Math.random() * 60) + 10}
                                        actionLabel="Continue Learning"
                                        onAction={() => navigate(`/learning/${enrolled.course._id}`)}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Courses Section */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black text-[#1a2d45]">Available Courses</h2>
                            <span className="text-sm text-gray-400">{courses.length} courses</span>
                        </div>

                        {coursesLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                                        <div className="h-48 bg-gray-100" />
                                        <div className="p-6 space-y-3">
                                            <div className="h-5 bg-gray-100 rounded w-3/4" />
                                            <div className="h-3 bg-gray-100 rounded w-full" />
                                            <div className="h-10 bg-gray-100 rounded-2xl mt-4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : courses.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-gray-300 gap-4">
                                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                </svg>
                                <p className="font-semibold text-sm text-center">No courses available yet. Your instructor will add courses soon!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {courses.map(course => (
                                    <CourseCard
                                        key={course._id}
                                        title={course.title}
                                        description={course.description}
                                        image={course.image || "https://ik.imagekit.io/zqdmtrlsv/LMS/Gemini_Generated_Image_u5j363u5j363u5j3.png"}
                                        instructor={course.instructorName}
                                        duration={course.duration}
                                        level={course.level}
                                        price={course.price}
                                        students={course.totalEnrolled}
                                        category={course.category}
                                        actionLabel={enrolledCourses.some(e => e.course && e.course._id === course._id) ? "Continue Learning" : "Enroll Now"}
                                        onAction={() => {
                                            if (enrolledCourses.some(e => e.course && e.course._id === course._id)) {
                                                navigate(`/learning/${course._id}`);
                                            } else {
                                                handleEnroll(course._id);
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
};