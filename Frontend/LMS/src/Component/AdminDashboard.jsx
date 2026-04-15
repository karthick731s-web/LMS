import { useState, useEffect } from "react";
import { DashboardSidebar, DashboardTopBar } from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userData, setUserData] = useState({
        name: "Admin",
        role: "admin",
        email: "",
    });
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({ stats: [], activity: [] });
    const token = localStorage.getItem("token") || "";

    useEffect(() => {
        const fetchAdminData = async () => {
            if (!token) { navigate("/tlogin"); return; }
            try {
                const [profileRes, statsRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } })
                ]);
                setUserData(profileRes.data.user);
                setDashboardData(statsRes.data);
            } catch (error) {
                console.error("Error fetching admin data:", error);
                if (error.response?.status === 401 || error.response?.status === 403) {
                    localStorage.removeItem("token");
                    navigate("/tlogin");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, [token, navigate]);

    const icons = {
        users: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        book: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" />
            </svg>
        ),
        enroll: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
        ),
        revenue: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        ),
    };

    if (loading) {
        return <div className="flex h-screen items-center justify-center font-bold text-[#1a2d45]">Loading Admin Dashboard...</div>;
    }

    return (
        <div className="flex h-screen bg-white font-['Sora'] shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
            <DashboardSidebar 
                role="admin" 
                activePage="admin-overview" 
                userName={userData.name} 
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />
            
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <DashboardTopBar 
                    title="Control Panel" 
                    breadcrumb={["Admin", "Dashboard"]} 
                    userName={userData.name} 
                    onMenuClick={() => setMobileMenuOpen(true)}
                />
                
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
                    <header className="mb-10">
                        <h1 className="text-4xl font-black mb-2 px-1" style={{ color: "#1a2d45" }}>System Overview</h1>
                        <p className="text-gray-400 px-1 font-medium">Global platform control and analytics.</p>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-10">
                        {dashboardData.stats.map((stat, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">{stat.label}</span>
                                            <span className="text-3xl font-black" style={{ color: "#1a2d45" }}>{stat.value}</span>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors" style={{ background: "#1a2d45", color: "#17b8a6" }}>
                                            {icons[stat.icon]}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: "#17b8a6" }}>
                                        <span>{stat.change}</span>
                                    </div>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100">
                                    <div className="h-full bg-[#1a2d45] opacity-80" style={{ width: '100%' }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Activity Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-black" style={{ color: "#1a2d45" }}>Recent System Activity</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4">Event</th>
                                        <th className="px-6 py-4">Time</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {dashboardData.activity.map((row) => (
                                        <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium" style={{ color: "#1a2d45" }}>{row.user}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${row.role === 'admin' ? 'bg-purple-100 text-purple-600' : row.role === 'instructor' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                                    {row.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400 italic">{row.activity}</td>
                                            <td className="px-6 py-4 text-xs text-gray-400">{row.time}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="px-4 py-1.5 rounded-lg text-[10px] font-bold text-white transition-all transform active:scale-95" style={{ background: "#1a2d45" }}>
                                                    Manage
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {dashboardData.activity.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-10 text-center text-gray-400 font-medium italic">No recent activity detected.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
