import { useState, useRef, useEffect } from "react";
import { DashboardSidebar, DashboardTopBar } from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Profile = ({ role = "student" }) => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState("");
    const fileInputRef = useRef(null);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        college: "",
        dept: "",
        role: "",
        profilePic: null,
        bio: "",
        location: "N/A",
        createdAt: ""
    });

    const [editForm, setEditForm] = useState({ ...userData });

    const token = localStorage.getItem("token") || "";

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) {
                navigate("/login");
                return;
            }
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const user = res.data.user;
                const formattedData = {
                    ...user,
                    bio: user.bio || (user.role === "student" ? "Aspiring student passionate about learning." : "Dedicated instructor helping students succeed."),
                    location: user.location || "Not set",
                    profilePic: user.profilePic || null
                };

                setUserData(formattedData);
                setEditForm(formattedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile:", error);
                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/users/profile`,
                {
                    name: editForm.name,
                    college: editForm.college,
                    dept: editForm.dept,
                    bio: editForm.bio,
                    location: editForm.location
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUserData({ ...editForm });
            localStorage.setItem("userName", editForm.name);
            setSaveMsg("Profile updated successfully!");
            setTimeout(() => setSaveMsg(""), 3000);
        } catch (error) {
            console.error("Error saving profile:", error);
            setSaveMsg("Failed to save. Please try again.");
            setTimeout(() => setSaveMsg(""), 3000);
        } finally {
            setSaving(false);
            setIsEditing(false);
        }
    };

    const handleEditToggle = () => {
        if (isEditing) {
            handleSave();
        } else {
            setIsEditing(true);
        }
    };

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handlePhotoClick = () => {
        fileInputRef.current.click();
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditForm({ ...editForm, profilePic: reader.result });
                if (!isEditing) setUserData(prev => ({ ...prev, profilePic: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center" style={{ fontFamily: "'Sora', sans-serif" }}>
                <div className="text-center space-y-3">
                    <div className="w-10 h-10 border-4 border-[#1a2d45] border-t-[#17b8a6] rounded-full animate-spin mx-auto"></div>
                    <p className="font-bold text-[#1a2d45]">Loading Profile...</p>
                </div>
            </div>
        );
    }

    const displayData = isEditing ? editForm : userData;
    const sidebarRole = userData.role || role;

    return (
        <div className="flex h-screen bg-gray-50" style={{ fontFamily: "'Sora', sans-serif" }}>
            <DashboardSidebar
                role={sidebarRole}
                activePage="profile"
                userName={userData.name}
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardTopBar
                    breadcrumb={[sidebarRole === "student" ? "Student Portal" : "Instructor Portal", "My Profile"]}
                    userName={userData.name}
                    onMenuClick={() => setMobileMenuOpen(true)}
                />

                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-[#1a2d45]">My Profile</h1>
                            <p className="text-gray-400 text-sm mt-1">
                                {isEditing ? "Edit your information below, then click Save." : "Manage your professional identity and personal information."}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {saveMsg && (
                                <span className={`text-sm font-semibold px-4 py-2 rounded-xl ${saveMsg.includes("success") ? "bg-teal-50 text-teal-600" : "bg-red-50 text-red-500"}`}>
                                    {saveMsg}
                                </span>
                            )}
                            {isEditing && (
                                <button
                                    onClick={() => { setIsEditing(false); setEditForm({ ...userData }); }}
                                    className="px-5 py-2.5 rounded-xl font-semibold text-sm border border-gray-200 text-gray-500 hover:bg-gray-100 transition-all"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                onClick={handleEditToggle}
                                disabled={saving}
                                className="px-6 py-2.5 rounded-xl text-white font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 disabled:opacity-60"
                                style={{ background: isEditing ? "#17b8a6" : "#1a2d45" }}
                            >
                                {saving ? (
                                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Saving...</>
                                ) : isEditing ? (
                                    <><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg> Save Changes</>
                                ) : (
                                    <><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg> Edit Profile</>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left: Avatar Card */}
                        <div className="lg:col-span-1 space-y-4">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                {/* Avatar */}
                                <div
                                    className="relative mb-5 cursor-pointer group"
                                    onClick={handlePhotoClick}
                                    title="Click to change photo"
                                >
                                    <div className="w-28 h-28 rounded-full border-4 border-[#f1f5f9] overflow-hidden bg-gray-100 flex items-center justify-center shadow-inner relative">
                                        {displayData.profilePic ? (
                                            <img src={displayData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-4xl font-black text-gray-300">
                                                {userData.name ? userData.name[0].toUpperCase() : "?"}
                                            </span>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                                <circle cx="12" cy="13" r="4" />
                                            </svg>
                                        </div>
                                    </div>
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoChange} />
                                </div>

                                <h2 className="text-xl font-black text-[#1a2d45] mb-0.5">{userData.name || "—"}</h2>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-[#17b8a6] mb-4">
                                    {userData.role}
                                </span>

                                <div className="w-full pt-5 border-t border-gray-50 space-y-3.5 text-left">
                                    <div className="flex items-center gap-2.5 text-sm text-gray-500">
                                        <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="truncate">{userData.email || "—"}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm text-gray-500">
                                        <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{userData.location || "Not set"}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm text-gray-500">
                                        <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>Joined {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "N/A"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Role Badge Card */}
                            <div className="bg-[#1a2d45] rounded-2xl p-5 text-white">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#17b8a6] mb-1">Account Type</p>
                                <p className="text-lg font-black capitalize">{userData.role || "—"}</p>
                                <p className="text-xs text-white/50 mt-1">
                                    {userData.role === "admin" ? "Full system access" :
                                     userData.role === "instructor" ? "Create & manage courses" :
                                     "Access enrolled courses"}
                                </p>
                            </div>
                        </div>

                        {/* Right: Form Card */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
                                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

                                    {/* Personal Details */}
                                    <section>
                                        <h3 className="flex items-center gap-2 text-[11px] font-black text-[#1a2d45] uppercase tracking-widest mb-5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#1a2d45]" />
                                            Personal Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                                                {isEditing ? (
                                                    <input
                                                        type="text" name="name" value={editForm.name} onChange={handleChange}
                                                        className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-medium text-[#1a2d45] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1a2d45]/20 transition-all"
                                                    />
                                                ) : (
                                                    <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm font-semibold text-[#1a2d45]">{userData.name || "—"}</div>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                                                <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-400 cursor-not-allowed select-none">{userData.email || "—"}</div>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Location</label>
                                                {isEditing ? (
                                                    <input
                                                        type="text" name="location" value={editForm.location} onChange={handleChange}
                                                        placeholder="City, Country"
                                                        className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-medium text-[#1a2d45] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1a2d45]/20 transition-all"
                                                    />
                                                ) : (
                                                    <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm font-semibold text-[#1a2d45]">{userData.location || "Not set"}</div>
                                                )}
                                            </div>
                                        </div>
                                    </section>

                                    {/* Academic Information */}
                                    <section>
                                        <h3 className="flex items-center gap-2 text-[11px] font-black text-teal-600 uppercase tracking-widest mb-5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                                            Academic Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">College / University</label>
                                                {isEditing ? (
                                                    <input
                                                        type="text" name="college" value={editForm.college} onChange={handleChange}
                                                        className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-medium text-[#1a2d45] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1a2d45]/20 transition-all"
                                                    />
                                                ) : (
                                                    <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm font-semibold text-[#1a2d45]">{userData.college || "—"}</div>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Department</label>
                                                {isEditing ? (
                                                    <input
                                                        type="text" name="dept" value={editForm.dept} onChange={handleChange}
                                                        className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-medium text-[#1a2d45] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1a2d45]/20 transition-all"
                                                    />
                                                ) : (
                                                    <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm font-semibold text-[#1a2d45]">{userData.dept || "—"}</div>
                                                )}
                                            </div>
                                        </div>
                                    </section>

                                    {/* Bio */}
                                    <section>
                                        <h3 className="flex items-center gap-2 text-[11px] font-black text-indigo-600 uppercase tracking-widest mb-5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                                            About Me
                                        </h3>
                                        {isEditing ? (
                                            <textarea
                                                name="bio" value={editForm.bio} onChange={handleChange}
                                                rows="4"
                                                placeholder="Write a short bio about yourself..."
                                                className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm text-[#1a2d45] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1a2d45]/20 transition-all resize-none"
                                            />
                                        ) : (
                                            <p className="text-sm text-gray-500 leading-relaxed bg-gray-50 rounded-xl px-4 py-3">{userData.bio || "No bio added yet."}</p>
                                        )}
                                    </section>

                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
