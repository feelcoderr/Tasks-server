const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.post("/", async (req, res) => {
  const { title, description, createdBy } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      createdBy,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found." });
    }

    task.status = "Completed";
    task = await task.save();
    res.json(task);
  } catch (err) {
    res.send("Server Error");
  }
});

module.exports = router;
