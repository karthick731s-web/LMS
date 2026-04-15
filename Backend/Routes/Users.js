const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const authMiddleware = require("../Middleware/Auth");

// Get current logged-in user profile
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

// Update current logged-in user profile
router.put("/profile", authMiddleware, async (req, res) => {
    try {
        const { name, college, dept, bio, location } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { name, college, dept, bio, location },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch all users (for Admin)
router.get("/all", authMiddleware, async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Register/Create user (Admin functionality)
router.post("/register", authMiddleware, async (req, res) => {
    try {
        const { name, email, password, college, dept, role = "student" } = req.body;

        if (!name || !email || !password || !college || !dept) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            college,
            dept,
            role
        });

        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;

