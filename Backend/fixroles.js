// Quick diagnostic script — check all user roles in MongoDB
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const User = require("./Models/User");
    const users = await User.find().select("name email role");
    console.log("\n=== ALL USERS IN DATABASE ===");
    users.forEach(u => console.log(`  ${u.role.padEnd(12)} | ${u.email.padEnd(35)} | ${u.name}`));
    console.log(`\nTotal: ${users.length} users`);

    // Fix: any user in old instructors collection that has wrong role
    const Instructor = require("./Models/Instructor");
    const oldInstructors = await Instructor.find().select("email");
    const instructorEmails = oldInstructors.map(i => i.email);
    console.log("\n=== OLD INSTRUCTOR EMAILS ===");
    instructorEmails.forEach(e => console.log(`  ${e}`));

    if (instructorEmails.length > 0) {
        const result = await User.updateMany(
            { email: { $in: instructorEmails }, role: { $ne: "instructor" } },
            { $set: { role: "instructor" } }
        );
        console.log(`\nFixed ${result.modifiedCount} instructor accounts with wrong role.`);
    }

    // Final state
    const updated = await User.find().select("name email role");
    console.log("\n=== FINAL STATE ===");
    updated.forEach(u => console.log(`  ${u.role.padEnd(12)} | ${u.email.padEnd(35)} | ${u.name}`));
    
    mongoose.disconnect();
}).catch(err => {
    console.error("DB Error:", err.message);
    process.exit(1);
});
