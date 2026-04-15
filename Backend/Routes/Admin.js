const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middleware/Auth");
const adminMiddleware = require("../Middleware/AdminMiddleware");

// Admin Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Only administrators can login here." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        const token = jwt.sign(
            { id: user._id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({ 
            message: "Admin login successful", 
            token, 
            role: "admin", 
            userName: user.name 
        });
    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get System Stats
router.get("/stats", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const studentCount = await User.countDocuments({ role: "student" });
        const instructorCount = await User.countDocuments({ role: "instructor", isApproved: true });
        const pendingCount = await User.countDocuments({ role: "instructor", isApproved: false });
        
        // Recent activity: Combine recent students and instructors
        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(10);
        
        const activity = recentUsers.map(u => {
            if (u.role === "student") {
                return {
                    id: u._id,
                    user: u.name,
                    role: "student",
                    activity: "Joined LearnSphere",
                    time: u.createdAt
                };
            } else if (u.role === "instructor") {
                return {
                    id: u._id,
                    user: u.name,
                    role: "instructor",
                    activity: u.isApproved ? "Instructor role approved" : "Applied for Instructor role",
                    time: u.approvedAt || u.createdAt
                };
            }
            return null;
        }).filter(a => a !== null).sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);

        res.status(200).json({
            stats: [
                { label: "Total Students", value: studentCount.toLocaleString(), change: "+0", icon: "users" },
                { label: "Approved Instructors", value: instructorCount.toLocaleString(), change: "+0", icon: "book" },
                { label: "Pending Approvals", value: pendingCount.toLocaleString(), change: "+0", icon: "enroll" },
                { label: "System Status", value: "Active", change: "Online", icon: "revenue" },
            ],
            activity: activity.map(a => ({
                ...a,
                time: new Date(a.time).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })
            }))
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// --- Student Management ---

router.get("/students", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const students = await User.find({ role: "student" }).select("-password");
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students" });
    }
});

router.delete("/students/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Student removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting student" });
    }
});

// --- Instructor Management ---

router.get("/instructors/pending", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const pending = await User.find({ role: "instructor", isApproved: false }).select("-password");
        res.status(200).json(pending);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pending instructors" });
    }
});

router.get("/instructors/approved", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const approved = await User.find({ role: "instructor", isApproved: true }).select("-password");
        res.status(200).json(approved);
    } catch (error) {
        res.status(500).json({ message: "Error fetching approved instructors" });
    }
});

router.post("/instructors/approve/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const instructor = await User.findByIdAndUpdate(req.params.id, {
            isApproved: true,
            approvedAt: new Date()
        }, { new: true });
        res.status(200).json({ message: "Instructor approved", instructor });
    } catch (error) {
        res.status(500).json({ message: "Error approving instructor" });
    }
});

router.post("/instructors/reject/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Instructor application rejected and removed" });
    } catch (error) {
        res.status(500).json({ message: "Error rejecting instructor" });
    }
});

router.post("/instructors/revoke/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const instructor = await User.findByIdAndUpdate(req.params.id, {
            role: "student",
            isApproved: true,
            approvedAt: null
        }, { new: true });

        res.status(200).json({ message: "Instructor role revoked. User demoted to student." });
    } catch (error) {
        console.error("Error revoking instructor:", error);
        res.status(500).json({ message: "Error revoking instructor role" });
    }
});

router.delete("/instructors/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Instructor removed from system" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting instructor" });
    }
});

module.exports = router;
