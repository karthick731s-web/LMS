const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./Models/Admin");
require("dotenv").config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const adminEmail = "admin@learnsphere.com"; // Default admin email
        const adminPassword = "AdminPassword123!"; // Default admin password

        const existingAdmin = await Admin.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log("Admin уже exists.");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const admin = new Admin({
            name: "LMS Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin"
        });

        await admin.save();
        console.log("-----------------------------------------");
        console.log("Admin account created successfully!");
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        console.log("-----------------------------------------");
        console.log("Please delete this script after use for security.");
        
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();
