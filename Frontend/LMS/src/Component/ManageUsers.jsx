import { useState, useEffect } from "react";
import { DashboardSidebar, DashboardTopBar } from "./Navbar";
import axios from "axios";

export const ManageUsers = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        college: "",
        dept: "",
        role: "student"
    });

    const token = localStorage.getItem("token") || "";

    const fetchUsers = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/users/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setUsers(res.data);
            setLoading(false);
        } catch (error) {

            console.error("Error fetching users:", error);
            if (error.response?.status === 401) {
                alert("Session expired. Please login again.");
                window.location.href = "/login";
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            window.location.href = "/login";
            return;
        }
        fetchUsers();
    }, [token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endpoint = `${import.meta.env.VITE_API_URL}/api/users/register`;

            const res = await axios.post(
                endpoint,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.status === 201) {
                alert("User created successfully!");
                fetchUsers();
                setIsModalOpen(false);
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    college: "",
                    dept: "",
                    role: "student"
                });
            }
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Failed to create user. " + (error.response?.data?.message || ""));
        }
    };

    const storedUserName = localStorage.getItem("userName") || "Admin";
    const storedRole = localStorage.getItem("role") || "admin";

    if (loading) {
        return <div className="flex h-screen items-center justify-center font-bold text-[#1a2d45]">Loading Users...</div>;
    }

    return (
        <div className="flex h-screen bg-white font-['Sora'] shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
            <DashboardSidebar
                role={storedRole}
                activePage="manage-users"
                userName={storedUserName}
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden relative">
                <DashboardTopBar
                    title="Manage Users"
                    breadcrumb={["Admin Dashboard", "Manage Users"]}
                    userName={storedUserName}
                    onMenuClick={() => setMobileMenuOpen(true)}
                />


                <main className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
                    <header className="mb-10 flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-black mb-2 px-1" style={{ color: "#1a2d45" }}>
                                Manage Users
                            </h1>
                            <p className="text-gray-500 px-1">
                                Overview of all system users and roles.
                            </p>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-3 rounded-xl text-white font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
                            style={{ background: "#1a2d45" }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            New User
                        </button>
                    </header>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">College</th>
                                        <th className="px-6 py-4">Dept</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-50">
                                    {users.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50/50 transition-colors text-sm">
                                            <td className="px-6 py-4 font-bold text-[#1a2d45]">
                                                {user.name}
                                            </td>

                                            <td className="px-6 py-4 text-gray-500">
                                                {user.email}
                                            </td>

                                            <td className="px-6 py-4 text-gray-500">
                                                {user.college}
                                            </td>

                                            <td className="px-6 py-4 text-gray-500">
                                                {user.dept}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                                    ${user.role === "admin"
                                                            ? "bg-red-50 text-red-600"
                                                            : user.role === "instructor"
                                                                ? "bg-indigo-50 text-indigo-600"
                                                                : "bg-teal-50 text-teal-600"
                                                        }`}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-2 rounded-lg text-gray-400 hover:text-[#1a2d45] hover:bg-gray-100 transition-all">
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                        </svg>
                                                    </button>

                                                    <button className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="3 6 5 6 21 6" />
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {users.length === 0 && (
                                <p className="text-center py-10 text-gray-400">
                                    No users found
                                </p>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-[#0d1b2e]/60 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    />

                    <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
                        <h2 className="text-2xl font-black text-[#1a2d45] mb-6">
                            Add New User
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50"
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50"
                            />

                            <input
                                type="text"
                                name="college"
                                placeholder="College"
                                value={formData.college}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50"
                            />

                            <input
                                type="text"
                                name="dept"
                                placeholder="Department"
                                value={formData.dept}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50"
                            />

                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50"
                            >
                                <option value="student">Student</option>
                                <option value="instructor">Instructor</option>
                                <option value="admin">Admin</option>
                            </select>

                            <button
                                type="submit"
                                className="w-full py-3 bg-[#1a2d45] text-white rounded-xl font-bold mt-4"
                            >
                                Create User
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
