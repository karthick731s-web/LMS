const router = require("express").Router();
const Course = require("../Models/Course");
const User = require("../Models/User");
const authMiddleware = require("../Middleware/Auth");

// GET all courses (public — for Home page & Student dashboard)
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// GET enrolled courses for the current student
router.get("/enrolled", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate("enrolledCourses.course");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user.enrolledCourses);
    } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// POST enroll in a course
router.post("/enroll/:id", authMiddleware, async (req, res) => {
    try {
        const courseId = req.params.id;
        const userId = req.userId;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if already enrolled
        const isEnrolled = user.enrolledCourses.some(e => e.course.toString() === courseId);
        if (isEnrolled) {
            return res.status(400).json({ message: "Already enrolled in this course" });
        }

        // Add to user's enrolledCourses
        user.enrolledCourses.push({ course: courseId, progress: 0 });
        await user.save();

        // Increment course's totalEnrolled
        course.totalEnrolled += 1;
        await course.save();

        res.status(200).json({ message: "Successfully enrolled in course", courseId });
    } catch (error) {
        console.error("Enrollment error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// GET single course by ID
router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// POST create course (instructor only)
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description, category, image, instructorName, instructorEmail, level, duration, price } = req.body;

        if (!title || !instructorName || !instructorEmail) {
            return res.status(400).json({ message: "Title, instructor name and email are required." });
        }

        const courseId = `CRS-${Date.now().toString().slice(-6)}`;

        const course = new Course({
            courseId,
            title,
            description,
            category,
            image,
            instructorName,
            instructorEmail,
            level: level || "Beginner",
            duration: duration || "Self-paced",
            price: price || 0,
            totalEnrolled: 0,
            rating: 0
        });

        await course.save();
        res.status(201).json({ message: "Course created successfully", course });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// PUT update course (instructor only)
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Course not found" });
        res.status(200).json({ message: "Course updated", course: updated });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// DELETE course (instructor only)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deleted = await Course.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Course not found" });
        res.status(200).json({ message: "Course deleted" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
