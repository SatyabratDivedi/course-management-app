const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const courseModel = require("./models");

app.use(express.json());
app.use(cors({origin: "*"}));

app.get("/", (req, res) => {
  res.status(200).send("backend working fine");
});

// app.post("/postCourse", async (req, res) => {
//   const post = req.body;
//   try {
//     const savedPost = await new courseModel(post).save();
//     console.log(savedPost);
//     res.status(200).json(post);
//   } catch (error) {
//     console.log(error);
//     res.status(404);
//   }
// });

app.get("/api/all-course", async (req, res) => {
  try {
    const getAllData = await courseModel.find();
    if (!getAllData) {
      return res.status(404).json({msg: "data not found"});
    }
    return res.status(200).json(getAllData);
  } catch (error) {
    return res.status(404).json({msg: error});
  }
});
app.post("/api/course-done-update", async (req, res) => {
  const {studentId, courseId} = req.body;

  try {
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({msg: "Course not found"});
    }
    const student = course.students.id(studentId);
    if (!student) {
      return res.status(404).json({msg: "Student not found"});
    }
    student.isCompleted = !student.isCompleted;
    await course.save();
    return res.status(200).json({msg: "Student completion status updated", course});
  } catch (error) {
    return res.status(500).json({msg: error.message});
  }
});

mongoose
  .connect("mongodb+srv://satya9005:satya9005@atlascluster.mzqnfii.mongodb.net/courseData?retryWrites=true&w=majority&appName=AtlasCluster")
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
