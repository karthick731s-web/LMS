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
    isApproved: {
      type: Boolean,
      default: false
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    approvedAt: {
      type: Date
    },
    role: {
      type: String,
      default: "instructor"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Instructor", userSchema);