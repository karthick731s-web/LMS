const mongoose = require("mongoose");
require("dotenv").config();
const Course = require("./Models/Course");

const BG_IMAGE = "https://ik.imagekit.io/zqdmtrlsv/LMS/Gemini_Generated_Image_u5j363u5j363u5j3.png";

const coursesData = [
    {
        title: "Complete Web Development Bootcamp 2024",
        description: "Learn HTML, CSS, JavaScript, React, Node, and MongoDB from scratch. Build 10+ real-world projects.",
        category: "Web Development",
        image: BG_IMAGE,
        instructorName: "Dr. Angela Smith",
        instructorEmail: "angela@example.com",
        level: "Beginner",
        duration: "65 hrs",
        price: 49.99,
        totalEnrolled: 1250,
        rating: 4.8
    },
    {
        title: "Python for Data Science & Machine Learning",
        description: "Master Python programming for data analysis. Covers NumPy, Pandas, Matplotlib, Scikit-Learn and more.",
        category: "Data Science",
        image: BG_IMAGE,
        instructorName: "Jose Portilla",
        instructorEmail: "jose@example.com",
        level: "Intermediate",
        duration: "42 hrs",
        price: 39.99,
        totalEnrolled: 850,
        rating: 4.7
    },
    {
        title: "UI/UX Design Mastery: From Zero to Pro",
        description: "Learn Figma, Adobe XD, and fundamental design principles to create stunning user interfaces.",
        category: "UI/UX Design",
        image: BG_IMAGE,
        instructorName: "Gary Simon",
        instructorEmail: "gary@example.com",
        level: "Beginner",
        duration: "28 hrs",
        price: 0,
        totalEnrolled: 3200,
        rating: 4.9
    },
    {
        title: "Advanced React Patterns & Performance",
        description: "Deep dive into React internals, custom hooks, higher-order components, and performance optimization.",
        category: "Web Development",
        image: BG_IMAGE,
        instructorName: "Kent C. Dodds",
        instructorEmail: "kent@example.com",
        level: "Advanced",
        duration: "15 hrs",
        price: 59.99,
        totalEnrolled: 450,
        rating: 4.9
    },
    {
        title: "Mobile App Development with Flutter",
        description: "Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.",
        category: "Mobile Development",
        image: BG_IMAGE,
        instructorName: "Max Schwarzmüller",
        instructorEmail: "max@example.com",
        level: "Beginner",
        duration: "35 hrs",
        price: 44.99,
        totalEnrolled: 1100,
        rating: 4.6
    },
    {
        title: "Digital Marketing Strategy 2024",
        description: "Master SEO, Social Media Marketing, Email Marketing, and Google Ads to grow any business.",
        category: "Marketing",
        image: BG_IMAGE,
        instructorName: "Neil Patel",
        instructorEmail: "neil@example.com",
        level: "Beginner",
        duration: "20 hrs",
        price: 29.99,
        totalEnrolled: 2100,
        rating: 4.5
    },
    {
        title: "Machine Learning A-Z™: Hands-On Python",
        description: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.",
        category: "Machine Learning",
        image: BG_IMAGE,
        instructorName: "Kirill Eremenko",
        instructorEmail: "kirill@example.com",
        level: "Intermediate",
        duration: "55 hrs",
        price: 49.99,
        totalEnrolled: 980,
        rating: 4.7
    },
    {
        title: "The Business Intelligence Analyst Course",
        description: "The skills you need to become a BI analyst: SQL, Tableau, Python, and Statistics.",
        category: "Business",
        image: BG_IMAGE,
        instructorName: "365 Careers",
        instructorEmail: "info@365careers.com",
        level: "Beginner",
        duration: "18 hrs",
        price: 34.99,
        totalEnrolled: 670,
        rating: 4.4
    },
    {
        title: "Java Programming Masterclass",
        description: "Learn Java In 14 Days: Learn to code with Java and be a productive developer.",
        category: "Software Engineering",
        image: BG_IMAGE,
        instructorName: "Tim Buchalka",
        instructorEmail: "tim@example.com",
        level: "Beginner",
        duration: "80 hrs",
        price: 54.99,
        totalEnrolled: 1500,
        rating: 4.8
    },
    {
        title: "AWS Certified Cloud Practitioner",
        description: "Master the fundamentals of AWS Cloud and prepare for the CLF-C01 exam with confidence.",
        category: "Cloud Computing",
        image: BG_IMAGE,
        instructorName: "Stephane Maarek",
        instructorEmail: "stephane@example.com",
        level: "Beginner",
        duration: "12 hrs",
        price: 19.99,
        totalEnrolled: 4200,
        rating: 4.9
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing courses
        await Course.deleteMany({});
        console.log("Cleared existing courses.");

        // Add courseId and Save
        const courses = coursesData.map(c => ({
            ...c,
            courseId: `CRS-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`
        }));

        await Course.insertMany(courses);
        console.log("Successfully seeded 10 courses!");

        process.exit();
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedDB();
