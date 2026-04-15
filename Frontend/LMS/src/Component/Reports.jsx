import { useState, useEffect } from "react";
import { DashboardSidebar, DashboardTopBar } from "./Navbar";
import axios from "axios";

export const Reports = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token") || "";
    const userName = localStorage.getItem("userName") || "Instructor";
    const userRole = localStorage.getItem("role") || "instructor";

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/instructors/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [token]);

    const metrics = [
        { label: "Active Learners", value: stats?.stats?.[0]?.value || "1,284", color: "bg-blue-500" },
        { label: "Course Completion Rate", value: "84.2%", color: "bg-[#17b8a6]" },
        { label: "Avg. Quiz Score", value: "76/100", color: "bg-purple-500" },
        { label: "Total Revenue", value: stats?.stats?.[3]?.value || "$12,450", color: "bg-amber-500" },
    ];

    return (
        <div className="flex h-screen bg-gray-50" style={{ fontFamily: "'Sora', sans-serif" }}>
            <DashboardSidebar
                role={userRole}
                activePage="reports"
                userName={userName}
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardTopBar
                    breadcrumb={["Instructor Dashboard", "Analytical Reports"]}
                    userName={userName}
                    onMenuClick={() => setMobileMenuOpen(true)}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <header className="mb-10 px-1">
                        <h1 className="text-3xl font-black text-[#1a2d45] mb-2 px-1">Performance Analytics</h1>
                        <p className="text-gray-400 text-sm px-1 italic">Real-time insights into course engagement and student success rates.</p>
                    </header>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {metrics.map((m, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className={`w-10 h-10 ${m.color} rounded-xl flex items-center justify-center mb-4 text-white opacity-80 shadow-lg`}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M21 21l-6-6M3 9a6 6 0 1112 0 6 6 0 01-12 0z" />
                                    </svg>
                                </div>
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{m.label}</div>
                                <div className="text-2xl font-black text-[#1a2d45]">{m.value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Static Chart Mockup 1 */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-black text-[#1a2d45]">Enrollment Trends</h3>
                                <div className="flex gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="w-2 h-2 rounded-full bg-[#17b8a6]" />
                                </div>
                            </div>
                            <div className="h-48 flex items-end gap-2 px-2">
                                {[40, 70, 45, 90, 65, 80, 55, 75, 50, 85, 95, 60].map((h, i) => (
                                    <div key={i} className="flex-1 bg-gray-50 rounded-t-lg relative group">
                                        <div 
                                            className="absolute bottom-0 left-0 right-0 bg-[#1a2d45] opacity-20 rounded-t-lg transition-all group-hover:opacity-40" 
                                            style={{ height: `${h}%` }}
                                        />
                                        <div 
                                            className="absolute bottom-0 left-0 right-0 bg-[#17b8a6] rounded-t-lg transition-all group-hover:scale-y-105" 
                                            style={{ height: `${h-15}%` }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest px-2">
                                <span>Jan</span>
                                <span>Jun</span>
                                <span>Dec</span>
                            </div>
                        </div>

                         {/* Student Leaderboard */}
                         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-black text-[#1a2d45]">Top Performing Learners</h3>
                                <button className="text-xs font-bold text-[#17b8a6] hover:underline">View All</button>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {[
                                    { name: "John Doe", course: "Advanced React", score: "98%", avatar: "JD" },
                                    { name: "Sarah Smith", course: "Python Mastery", score: "96%", avatar: "SS" },
                                    { name: "Alex Wong", course: "UI/UX Design", score: "94%", avatar: "AW" },
                                    { name: "Maria Garcia", course: "Data Science", score: "92%", avatar: "MG" }
                                ].map((s, i) => (
                                    <div key={i} className="px-8 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#1a2d45] text-white flex items-center justify-center text-xs font-bold">
                                                {s.avatar}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-[#1a2d45]">{s.name}</div>
                                                <div className="text-[10px] text-gray-400 font-medium">{s.course}</div>
                                            </div>
                                        </div>
                                        <div className="text-sm font-black text-[#17b8a6]">{s.score}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
