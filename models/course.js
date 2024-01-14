const mongoose = require("mongoose");

const courseSchmea = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
});

const Course = mongoose.model("Course", courseSchmea);

exports.Course = Course;
