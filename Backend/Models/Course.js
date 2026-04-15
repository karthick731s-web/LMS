const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    unique: true,
    sparse: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    default: "General"
  },
  image: {
    type: String,
    default: ""
  },
  instructorName: {
    type: String,
    required: true
  },
  instructorEmail: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner"
  },
  duration: {
    type: String,
    default: "Self-paced"
  },
  price: {
    type: Number,
    default: 0
  },
  totalEnrolled: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);