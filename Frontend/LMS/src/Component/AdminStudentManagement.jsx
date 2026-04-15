import { useState, useEffect } from "react";
import { DashboardSidebar, DashboardTopBar } from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AdminStudentManagement = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("Admin");
    const token = localStorage.getItem("token") || "";

    useEffect(() => {
        const fetchData = async () => {
            if (!token) { navigate("/tlogin"); return; }
            try {
                const [profileRes, studentRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/admin/students`, { headers: { Authorization: `Bearer ${token}` } })
                ]);
                setUserName(profileRes.data.user.name);
                setStudents(studentRes.data);
            } catch (error) {
                console.error("Error fetching students:", error);
                if (error.response?.status === 401) navigate("/tlogin");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token, navigate]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this student? This action cannot be undone.")) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/students/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStudents(students.filter(s => s._id !== id));
            alert("Student removed successfully.");
        } catch (error) {
            alert("Error deleting student.");
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center font-bold text-[#1a2d45]">Loading Students...</div>;

    return (
        <div className="flex h-screen bg-white font-['Sora'] shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
            <DashboardSidebar 
                role="admin" 
                activePage="students" 
                userName={userName} 
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />
            
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <DashboardTopBar 
                    title="Student Management" 
                    breadcrumb={["Admin", "Students"]} 
                    userName={userName} 
                    onMenuClick={() => setMobileMenuOpen(true)}
                />
                
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
                    <header className="mb-10">
                        <h1 className="text-4xl font-black mb-2 px-1" style={{ color: "#1a2d45" }}>Registered Students</h1>
                        <p className="text-gray-400 px-1 font-medium">View and manage all students enrolled in the platform.</p>
                    </header>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">College / Dept</th>
                                        <th className="px-6 py-4">Join Date</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {students.map((student) => (
                                        <tr key={student._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-bold text-[#1a2d45]">{student.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{student.email}</td>
                                            <td className="px-6 py-4 text-xs text-gray-400">
                                                {student.college} <br />
                                                <span className="font-semibold text-gray-300">{student.dept}</span>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-gray-400">
                                                {new Date(student.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => handleDelete(student._id)}
                                                    className="px-4 py-1.5 rounded-lg text-[10px] font-bold text-red-500 hover:bg-red-50 transition-all transform active:scale-95"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {students.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-10 text-center text-gray-400 font-medium italic">No students found.</td>
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
