import { useState, useEffect } from "react";
import { DashboardSidebar, DashboardTopBar } from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AdminInstructorManagement = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("pending"); // "pending" or "approved"
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("Admin");
    const token = localStorage.getItem("token") || "";

    const fetchInstructors = async () => {
        setLoading(true);
        try {
            const endpoint = activeTab === "pending" ? "pending" : "approved";
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/instructors/${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setInstructors(res.data);
        } catch (error) {
            console.error("Error fetching instructors:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) { navigate("/tlogin"); return; }
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, { headers: { Authorization: `Bearer ${token}` } });
                setUserName(res.data.user.name);
            } catch (err) { navigate("/tlogin"); }
        };
        fetchProfile();
    }, [token, navigate]);

    useEffect(() => {
        fetchInstructors();
    }, [activeTab]);

    const handleApprove = async (id) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/instructors/approve/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Instructor approved successfully!");
            fetchInstructors();
        } catch (error) {
            alert("Error approving instructor.");
        }
    };

    const handleReject = async (id) => {
        if (!window.confirm("Reject this application?")) return;
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/instructors/reject/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchInstructors();
        } catch (error) {
            alert("Error rejecting instructor.");
        }
    };

    const handleRevoke = async (id) => {
        if (!window.confirm("Revoke instructor access? The user will be demoted to student role.")) return;
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/instructors/revoke/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Instructor role revoked.");
            fetchInstructors();
        } catch (error) {
            alert("Error revoking role.");
        }
    };

    return (
        <div className="flex h-screen bg-white font-['Sora'] shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
            <DashboardSidebar 
                role="admin" 
                activePage="instructors" 
                userName={userName} 
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />
            
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <DashboardTopBar 
                    title="Instructor Management" 
                    breadcrumb={["Admin", "Instructors"]} 
                    userName={userName} 
                    onMenuClick={() => setMobileMenuOpen(true)}
                />
                
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
                    <header className="mb-10">
                        <h1 className="text-4xl font-black mb-2 px-1" style={{ color: "#1a2d45" }}>Instructors Control</h1>
                        <p className="text-gray-400 px-1 font-medium">Manage instructor applications and active educators.</p>
                    </header>

                    {/* Tabs */}
                    <div className="flex gap-4 mb-8 px-1">
                        <button 
                            onClick={() => setActiveTab("pending")}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "pending" ? 'bg-[#1a2d45] text-white shadow-lg' : 'bg-white text-gray-400 hover:text-[#1a2d45]'}`}
                        >
                            Pending Applications
                        </button>
                        <button 
                            onClick={() => setActiveTab("approved")}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "approved" ? 'bg-[#1a2d45] text-white shadow-lg' : 'bg-white text-gray-400 hover:text-[#1a2d45]'}`}
                        >
                            Approved Instructors
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {loading ? (
                            <div className="p-20 text-center text-gray-400 font-bold">Loading records...</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        <tr>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Email</th>
                                            <th className="px-6 py-4">College</th>
                                            <th className="px-6 py-4">{activeTab === "approved" ? "Approved At" : "Applied At"}</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {instructors.map((ins) => (
                                            <tr key={ins._id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-bold text-[#1a2d45]">{ins.name}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{ins.email}</td>
                                                <td className="px-6 py-4 text-xs text-gray-400">{ins.college}</td>
                                                <td className="px-6 py-4 text-xs text-gray-400">
                                                    {new Date(activeTab === "approved" ? ins.approvedAt : ins.appliedAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {activeTab === "pending" ? (
                                                            <>
                                                                <button onClick={() => handleApprove(ins._id)} className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white bg-green-500 hover:bg-green-600">Approve</button>
                                                                <button onClick={() => handleReject(ins._id)} className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-red-500 hover:bg-red-50">Reject</button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button onClick={() => handleRevoke(ins._id)} className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-orange-500 border border-orange-200 hover:bg-orange-50">Revoke Role</button>
                                                                <button onClick={() => handleReject(ins._id)} className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-red-500 hover:bg-red-0">Delete</button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {instructors.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-10 text-center text-gray-400 font-medium italic">No instructor records found in this category.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};
