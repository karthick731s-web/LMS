const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./Models/Admin");
const Instructor = require("./Models/Instructor");
const Student = require("./Models/Reg");
const Course = require("./Models/Course");
require("dotenv").config();

const seedAll = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing data (Be careful! User requested this as they deleted data anyway)
        await Admin.deleteMany({});
        await Instructor.deleteMany({});
        await Student.deleteMany({});
        await Course.deleteMany({});
        console.log("Cleared existing collections.");

        const password = "Karthick@731";
        const hashedPassword = await bcrypt.hash(password, 10);

        // 1. Create Admin
        const admin = new Admin({
            name: "LMS Admin",
            email: "admin@learnsphere.com",
            password: hashedPassword,
            role: "admin"
        });
        await admin.save();
        console.log("Admin seeded: admin@learnsphere.com");

        // 2. Create Approved Instructor
        const instructor = new Instructor({
            name: "Dr. Sarah Smith",
            email: "instructor@learnsphere.com",
            password: hashedPassword,
            college: "Stanford University",
            dept: "Computer Science",
            role: "instructor",
            isApproved: true,
            appliedAt: new Date(),
            approvedAt: new Date()
        });
        await instructor.save();
        console.log("Instructor seeded: instructor@learnsphere.com");

        // 3. Create Pending Instructor
        const pendingInstructor = new Instructor({
            name: "James Wilson",
            email: "james@learnsphere.com",
            password: hashedPassword,
            college: "MIT",
            dept: "Physics",
            role: "instructor",
            isApproved: false,
            appliedAt: new Date()
        });
        await pendingInstructor.save();
        console.log("Pending Instructor seeded: james@learnsphere.com");

        // 4. Create Student
        const student = new Student({
            name: "Karthick S",
            email: "student@learnsphere.com",
            password: hashedPassword,
            college: "CIT",
            dept: "IT",
            role: "student",
            enrolledCourses: []
        });
        await student.save();
        console.log("Student seeded: student@learnsphere.com");

        // 5. Create Courses
        const courses = [
            {
                courseId: "CRS-001",
                title: "Advanced Web Development",
                description: "Master React, Node.js, and modern CSS frameworks in this comprehensive bootcamp.",
                category: "Web Development",
                instructorName: "Dr. Sarah Smith",
                instructorEmail: "instructor@learnsphere.com",
                duration: "40 hrs",
                level: "Advanced",
                price: 49.99,
                totalEnrolled: 0,
                rating: 4.8,
                image: "https://ik.imagekit.io/zqdmtrlsv/LMS/Gemini_Generated_Image_u5j363u5j363u5j3.png"
            },
            {
                courseId: "CRS-002",
                title: "Data Science with Python",
                description: "Learn Pandas, Scikit-learn, and Matplotlib for real-world data analysis.",
                category: "Data Science",
                instructorName: "Dr. Sarah Smith",
                instructorEmail: "instructor@learnsphere.com",
                duration: "32 hrs",
                level: "Intermediate",
                price: 39.99,
                totalEnrolled: 0,
                rating: 4.6,
                image: "https://ik.imagekit.io/zqdmtrlsv/LMS/Gemini_Generated_Image_v5k123v5k123v5k1.png"
            },
            {
                courseId: "CRS-003",
                title: "Modern UI/UX Principles",
                description: "Deep dive into user experience design, wireframing, and Figma prototyping.",
                category: "UI/UX Design",
                instructorName: "Dr. Sarah Smith",
                instructorEmail: "instructor@learnsphere.com",
                duration: "20 hrs",
                level: "Beginner",
                price: 0,
                totalEnrolled: 0,
                rating: 4.9,
                image: "https://ik.imagekit.io/zqdmtrlsv/LMS/Gemini_Generated_Image_w6l456w6l456w6l4.png"
            }
        ];

        await Course.insertMany(courses);
        console.log("Courses seeded: 3 courses added.");

        console.log("-----------------------------------------");
        console.log("Seeding completed successfully!");
        console.log("Password for all accounts: Karthick@731");
        console.log("-----------------------------------------");
        
        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedAll();
