const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    college: {
      type: String,
      required: true
    },

    dept: {
      type: String,
      required: true
    },

    // ✅ ADD THIS
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student"
    },
    enrolledCourses: [
      {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        enrolledAt: { type: Date, default: Date.now },
        progress: { type: Number, default: 0 }
      }
    ]
  },
  { timestamps: true } // ✅ already perfect
);

module.exports = mongoose.model("Student", userSchema);