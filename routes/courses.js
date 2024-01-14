const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { Course } = require("../models/course");

async function getAllCourses() {
  try {
    return await Course.find().sort("name");
  } catch (error) {
    return error;
  }
}

router.get("/", async (req, res) => {
  const allCourses = await getAllCourses();
  res.send(allCourses);
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  console.error(course);

  return course ? res.send(course) : res.status(404).send("Course Not Found");
});

router.post("/", async (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let course = new Course({
    name: req.body.name,
  });

  course = await course.save();
  return res.status(200).send(course);
});

router.put("/:id", async (req, res) => {
  //[1] Joi Validation
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  //[2] Find and Update By DB
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  if (!course) return res.status(404).send("Course Not Found");

  return res.status(200).send(course);
});

router.delete("/:id", async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course) return res.status(404).send("Course Not Found");

  return res.send(course);
});

module.exports = router;
