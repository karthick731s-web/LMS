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

    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student"
    },

    isApproved: {
      type: Boolean,
      default: function() {
        return this.role !== "instructor"; // Students and Admins approved by default
      }
    },

    appliedAt: {
      type: Date,
      default: Date.now
    },

    approvedAt: {
      type: Date
    },

    bio: {
      type: String,
      default: ""
    },

    location: {
      type: String,
      default: ""
    },

    profilePic: {
      type: String,
      default: null
    },
    enrolledCourses: [
      {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        enrolledAt: { type: Date, default: Date.now },
        progress: { type: Number, default: 0 }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
