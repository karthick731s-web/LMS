const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middleware/Auth");

// Register Student
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
            role: "student" 
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully", user: { id: user._id, name, email, role: user.role } });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login Student
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
        // Enforce role — only students can use this login
        if (user.role !== "student") {
            return res.status(403).json({ message: "Access denied. Instructors and admins must use the instructor login." });
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

// Get logged-in user profile
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;