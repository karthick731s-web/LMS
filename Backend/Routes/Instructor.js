const router = require("express").Router();
const User = require("../Models/User");
const Course = require("../Models/Course");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middleware/Auth");

// Register Instructor
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, college, dept } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            college, 
            dept, 
            role: "instructor" // Default isApproved will be false for instructor role
        });
        await user.save();
        res.status(201).json({ message: "Instructor registration submitted. Awaiting admin approval.", user: { id: user._id, name, email, role: user.role } });
    }
    catch (error) {
        console.error("Error registering instructor:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login Instructor/Admin
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // If instructor, check for approval
        if (user.role === "instructor" && !user.isApproved) {
            return res.status(403).json({ message: "Your instructor account is pending approval. Please wait for an admin to approve your request." });
        }

        // Only instructor or admin can use this login
        if (user.role !== "instructor" && user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Students must use the student login." });
        }

        const t = jwt.sign(
            {
                id: user._id,
                role: user.role
            }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ message: "Login successful", token: t, role: user.role, userName: user.name });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Instructor Dashboard Redirect/Profile
router.get("/dashboard", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// GET dashboard statistics (Instructor/Admin only)
router.get("/stats", authMiddleware, async (req, res) => {
    try {
        const studentCount = await User.countDocuments({ role: "student" });
        const instructorCount = await User.countDocuments({ role: "instructor", isApproved: true });
        const totalCourses = await Course.countDocuments();
        
        // Calculate total enrollments
        const courses = await Course.find();
        const totalEnrollments = courses.reduce((sum, c) => sum + (c.totalEnrolled || 0), 0);

        res.status(200).json({
            stats: [
                { label: "Total Students", value: studentCount.toLocaleString(), change: "+0", icon: "users" },
                { label: "Approved Instructors", value: instructorCount.toLocaleString(), change: "+0", icon: "book" },
                { label: "Active Courses", value: totalCourses.toLocaleString(), change: "+0", icon: "enroll" },
                { label: "System Revenue", value: `$${(totalEnrollments * 15.5).toFixed(1)}k`, change: "+1", icon: "revenue" },
            ],
            activity: [] 
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;

module.exports = router;