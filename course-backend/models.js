const mongoose = require("mongoose");

const syllabusSchema = new mongoose.Schema({
  week: { type: Number, required: true },
  topic: { type: String, required: true },
  content: { type: String, required: true },
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  isCompleted:{type: Boolean}
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  instructor: { type: String, required: true },
  description: { type: String, required: true },
  enrollmentStatus: { type: String, required: true },
  instructorImg: { type: String},
  courseThumbnail: { type: String },
  duration: { type: String, required: true },
  schedule: { type: String, required: true },
  location: { type: String, required: true },
  prerequisites: [String],
  syllabus: [syllabusSchema],
  students: [studentSchema],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
