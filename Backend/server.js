const express=require("express");
const app=express();
require("dotenv").config();
const cors=require("cors");
const mongoose=require("mongoose");
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};
connectDB();

const R=require("./Routes/Student");
app.use("/api/students",R);

const R2=require("./Routes/Instructor");
app.use("/api/instructors",R2);

const usersRouter = require("./Routes/Users");
app.use("/api/users", usersRouter);

const coursesRouter = require("./Routes/Courses");
app.use("/api/courses", coursesRouter);

const adminRouter = require("./Routes/Admin");
app.use("/api/admin", adminRouter);

app.use((err, req, res, next) => { res.status(500).json({ error: err.message }) });

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
