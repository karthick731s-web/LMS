import { useState, useEffect } from "react";
import { DashboardSidebar, DashboardTopBar } from "./Navbar";
import CourseCard from "./CourseCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Catalog = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const navigate = useNavigate();

    const token = localStorage.getItem("token") || "";
    const userName = localStorage.getItem("userName") || "Student";
    const userRole = localStorage.getItem("role") || "student";

    const categories = ["All", "Web Development", "Data Science", "UI/UX Design", "Mobile Development", "Business", "Marketing", "Python", "Machine Learning"];

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses`);
                setCourses(res.data);
            } catch (err) {
                console.error("Error fetching courses", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             course.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "All" || course.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex h-screen bg-gray-50" style={{ fontFamily: "'Sora', sans-serif" }}>
            <DashboardSidebar
                role={userRole}
                activePage="catalog"
                userName={userName}
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardTopBar
                    breadcrumb={["Student Dashboard", "Catalog"]}
                    userName={userName}
                    onMenuClick={() => setMobileMenuOpen(true)}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                        <div>
                            <h1 className="text-3xl font-black text-[#1a2d45] mb-2 px-1">Course Catalog</h1>
                            <p className="text-gray-400 text-sm px-1">Discover new skills from our professional-grade modules.</p>
                        </div>
                        
                        <div className="relative group w-full md:w-80">
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search courses..."
                                className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-3.5 text-sm shadow-sm focus:ring-4 focus:ring-[#1a2d45]/5 transition-all outline-none pl-12"
                            />
                            <svg className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                            </svg>
                        </div>
                    </header>

                    {/* Categories Filter */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-6 scrollbar-hide px-1">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                                    activeCategory === cat 
                                    ? "bg-[#1a2d45] text-white border-[#1a2d45] shadow-lg shadow-blue-900/10" 
                                    : "bg-white text-gray-500 border-gray-100 hover:border-gray-200"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="bg-white rounded-3xl h-72 animate-pulse border border-gray-100" />
                            ))}
                        </div>
                    ) : filteredCourses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center opacity-75">
                             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-[#1a2d45] mb-2">No courses match your criteria</h2>
                            <p className="text-gray-400 text-sm max-w-xs cursor-wait">Try adjusting your filters or search terms.</p>
                            <button 
                                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                                className="mt-6 text-[#17b8a6] text-sm font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredCourses.map((course) => (
                                <CourseCard
                                    key={course._id}
                                    id={course._id}
                                    title={course.title}
                                    description={course.description}
                                    image={course.image}
                                    instructor={course.instructorName}
                                    duration={course.duration}
                                    level={course.level}
                                    price={course.price}
                                    students={course.totalEnrolled}
                                    category={course.category}
                                    actionLabel="View Details"
                                    onAction={() => navigate(`/courses`)}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
