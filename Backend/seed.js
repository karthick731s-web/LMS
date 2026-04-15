const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./Models/User");
const Course = require("./Models/Course");
require("dotenv").config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing data (Be careful!)
        // The user said they deleted data, but let's be sure.
        await User.deleteMany({});
        await Course.deleteMany({});
        console.log("Cleared existing Users and Courses.");

        const hashedPassword = await bcrypt.hash("Karthick@731", 10);

        // 1. Create Admin
        const admin = new User({
            name: "LMS Admin",
            email: "admin@lms.com",
            password: hashedPassword,
            college: "LMS Academy",
            dept: "Administration",
            role: "admin",
            isApproved: true
        });
        await admin.save();
        console.log("Admin created: admin@lms.com / Karthick@731");

        // 2. Create Instructor (Approved)
        const instructor = new User({
            name: "Karthick S",
            email: "instructor@lms.com",
            password: hashedPassword,
            college: "Engineering College",
            dept: "Computer Science",
            role: "instructor",
            isApproved: true,
            approvedAt: new Date()
        });
        await instructor.save();
        console.log("Instructor created: instructor@lms.com / Karthick@731");

        // 3. Create Student
        const student = new User({
            name: "Sample Student",
            email: "student@lms.com",
            password: hashedPassword,
            college: "Engineering College",
            dept: "Information Technology",
            role: "student",
            isApproved: true
        });
        await student.save();
        console.log("Student created: student@lms.com / Karthick@731");

        // 4. Create Sample Courses
        const courses = [
            {
                courseId: "CRS-101",
                title: "Mastering React.js & Modern Web Development",
                description: "Learn React from scratch with hooks, context API, and advanced state management. Build real-world projects and master the frontend ecosystem.",
                category: "Web Development",
                image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
                instructorName: "Karthick S",
                instructorEmail: "instructor@lms.com",
                level: "Intermediate",
                duration: "24 Hours",
                price: 49.99,
                totalEnrolled: 1250,
                rating: 4.8
            },
            {
                courseId: "CRS-102",
                title: "Python for Data Science & Machine Learning",
                description: "Deep dive into NumPy, Pandas, Matplotlib, and Scikit-Learn. Learn to build predictive models and analyze complex datasets with ease.",
                category: "Data Science",
                image: "https://images.unsplash.com/photo-1551288049-bbbda536ad8a?w=800&auto=format&fit=crop",
                instructorName: "Karthick S",
                instructorEmail: "instructor@lms.com",
                level: "Beginner",
                duration: "32 Hours",
                price: 59.99,
                totalEnrolled: 850,
                rating: 4.9
            },
            {
                courseId: "CRS-103",
                title: "UI/UX Design Masterclass: From Figma to Web",
                description: "Learn the principles of modern design. Master Figma, typography, color theory, and user psychology to create stunning interfaces.",
                category: "UI/UX Design",
                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
                instructorName: "Karthick S",
                instructorEmail: "instructor@lms.com",
                level: "Beginner",
                duration: "18 Hours",
                price: 39.99,
                totalEnrolled: 2100,
                rating: 4.7
            }
        ];

        await Course.insertMany(courses);
        console.log("Sample courses created.");

        console.log("\nSeeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedData();
