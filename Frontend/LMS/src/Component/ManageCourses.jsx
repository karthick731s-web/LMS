import { useState, useEffect } from "react";
import { DashboardSidebar, DashboardTopBar } from "./Navbar";
import CourseCard from "./CourseCard";
import axios from "axios";

export const ManageCourses = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const token = localStorage.getItem("token") || "";
    const userName = localStorage.getItem("userName") || "Instructor";
    const userRole = localStorage.getItem("role") || "instructor";

    const defaultForm = () => ({
        courseId: `CRS-${Date.now().toString().slice(-6)}`,
        title: "",
        description: "",
        category: "Web Development",
        image: "",
        instructorName: userName,
        instructorEmail: instructorEmail,
        level: "Beginner",
        duration: "Self-paced",
        price: 0,
    });

    const [instructorEmail, setInstructorEmail] = useState("");
    const [formData, setFormData] = useState(defaultForm());

    const fetchCourses = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses`);
            setCourses(res.data);
        } catch (err) {
            console.error("Failed to fetch courses", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const email = res.data.user.email;
            setInstructorEmail(email);
            setFormData(prev => ({ ...prev, instructorEmail: email }));
        } catch (err) {
            console.error("Failed to fetch profile", err);
        }
    };

    useEffect(() => { 
        fetchCourses(); 
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const val = e.target.type === "number" ? Number(e.target.value) : e.target.value;
        setFormData(prev => ({ ...prev, [e.target.name]: val }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { alert("Max image size is 5MB"); return; }
        setUploadingImage(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setFormData(prev => ({ ...prev, image: reader.result }));
            setUploadingImage(false);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/courses`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Course created successfully:", res.data);
            if (res.status === 201) {
                await fetchCourses(); // refresh from DB
                setIsModalOpen(false);
                setFormData(defaultForm());
                setImagePreview(null);
                alert("Course published successfully!");
            }
        } catch (error) {
            console.error("Error creating course:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to create course.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this course?")) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/courses/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCourses(prev => prev.filter(c => c._id !== id));
        } catch (err) {
            alert("Failed to delete course.");
        }
    };

    return (
        <div className="flex h-screen bg-gray-50" style={{ fontFamily: "'Sora', sans-serif" }}>
            <DashboardSidebar
                role={userRole}
                activePage="manage-courses"
                userName={userName}
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardTopBar
                    breadcrumb={["Instructor Dashboard", "Manage Courses"]}
                    userName={userName}
                    onMenuClick={() => setMobileMenuOpen(true)}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 px-1">
                        <div>
                            <h1 className="text-3xl font-black text-[#1a2d45]">Manage Courses</h1>
                            <p className="text-gray-400 text-sm mt-1">Create and manage your published courses.</p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full md:w-auto px-6 py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/10"
                            style={{ background: "#1a2d45" }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            New Course
                        </button>
                    </div>

                    {/* Course Grid — Using CourseCard */}
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="w-10 h-10 border-4 border-[#1a2d45] border-t-[#17b8a6] rounded-full animate-spin"></div>
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-300 gap-4">
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            </svg>
                            <p className="text-sm font-semibold">No courses yet. Click "New Course" to publish one.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {courses.map(course => (
                                <div key={course._id} className="relative group">
                                    <CourseCard
                                        title={course.title}
                                        description={course.description}
                                        image={course.image || "https://ik.imagekit.io/zqdmtrlsv/LMS/Gemini_Generated_Image_u5j363u5j363u5j3.png"}
                                        instructor={course.instructorName}
                                        duration={course.duration}
                                        level={course.level}
                                        price={course.price}
                                        students={course.totalEnrolled}
                                        category={course.category}
                                        actionLabel="Delete Course"
                                        onAction={() => handleDelete(course._id)}
                                    />
                                    {/* Instructor action buttons overlayed */}
                                    <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all z-10">
                                        <button
                                            onClick={() => handleDelete(course._id)}
                                            className="p-2 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-all"
                                            title="Delete course"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* New Course Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#0d1b2e]/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-black text-[#1a2d45]">Publish New Course</h2>
                                <p className="text-gray-400 text-sm mt-0.5">Fill in the details to list your course on LearnSphere.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-[#1a2d45] transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Thumbnail */}
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Course Thumbnail</label>
                                {!imagePreview ? (
                                    <>
                                        <input type="file" id="thumbUpload" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        <label htmlFor="thumbUpload" className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-[#17b8a6] hover:bg-teal-50/20 transition-all">
                                            {uploadingImage ? (
                                                <div className="w-8 h-8 border-2 border-[#17b8a6] border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <svg width="28" height="28" className="text-gray-300 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                                                    </svg>
                                                    <p className="text-xs text-gray-400">Click to upload thumbnail</p>
                                                    <p className="text-[10px] text-gray-300 mt-0.5">PNG, JPG, WEBP (max 5MB)</p>
                                                </>
                                            )}
                                        </label>
                                    </>
                                ) : (
                                    <div className="relative rounded-2xl overflow-hidden h-28 group">
                                        <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                                            <label htmlFor="thumbChange" className="bg-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer hover:bg-gray-100">Change</label>
                                            <button type="button" onClick={() => { setImagePreview(null); setFormData(p => ({ ...p, image: "" })); }} className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-600">Remove</button>
                                        </div>
                                        <input type="file" id="thumbChange" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Course Title *</label>
                                    <input type="text" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. React Mastery" className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2d45]/20" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Category</label>
                                    <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2d45]/20 cursor-pointer">
                                        {["Web Development", "Data Science", "UI/UX Design", "Mobile Development", "Business", "Marketing", "Python", "Machine Learning"].map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Instructor Name *</label>
                                    <input type="text" name="instructorName" required value={formData.instructorName} onChange={handleChange} className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2d45]/20" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Instructor Email *</label>
                                    <input type="email" name="instructorEmail" required value={formData.instructorEmail} onChange={handleChange} className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2d45]/20" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Duration</label>
                                    <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 12 hrs" className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2d45]/20" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Price ($)</label>
                                    <input type="number" name="price" min="0" value={formData.price} onChange={handleChange} className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2d45]/20" />
                                </div>
                            </div>

                            {/* Level Selector */}
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Difficulty Level</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {["Beginner", "Intermediate", "Advanced"].map(lvl => (
                                        <button key={lvl} type="button" onClick={() => setFormData(p => ({ ...p, level: lvl }))}
                                            className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${formData.level === lvl ? "bg-[#1a2d45] text-white border-[#1a2d45]" : "bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-300"}`}>
                                            {lvl}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Description</label>
                                <textarea name="description" rows="3" value={formData.description} onChange={handleChange} placeholder="What will students learn?" className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2d45]/20 resize-none" />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 rounded-xl text-[#1a2d45] font-bold text-sm bg-gray-100 hover:bg-gray-200 transition-all">Cancel</button>
                                <button type="submit" disabled={submitting || uploadingImage}
                                    className="flex-[2] py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50"
                                    style={{ background: "#1a2d45" }}>
                                    {submitting ? "Publishing..." : "Publish Course"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};