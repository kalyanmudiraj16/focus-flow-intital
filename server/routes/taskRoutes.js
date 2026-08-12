const express = require("express");
const Task = require("../models/Task");

const router = express.Router();


// =========================
// GET ALL TASKS
// =========================

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);

  } catch (error) {
    console.error("Get tasks error:", error);

    res.status(500).json({
      message: "Failed to fetch tasks"
    });
  }
});


// =========================
// CREATE TASK
// =========================

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Task text is required"
      });
    }

    const task = await Task.create({
      text: text.trim(),
      completed: false
    });

    res.status(201).json(task);

  } catch (error) {
    console.error("Create task error:", error);

    res.status(500).json({
      message: "Failed to create task"
    });
  }
});


// =========================
// UPDATE TASK
// =========================

router.put("/:id", async (req, res) => {
  try {
    const { completed, text } = req.body;

    const updateData = {};

    if (typeof completed === "boolean") {
      updateData.completed = completed;
    }

    if (typeof text === "string") {
      updateData.text = text.trim();
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json(task);

  } catch (error) {
    console.error("Update task error:", error);

    res.status(500).json({
      message: "Failed to update task"
    });
  }
});


// =========================
// DELETE TASK
// =========================

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    console.error("Delete task error:", error);

    res.status(500).json({
      message: "Failed to delete task"
    });
  }
});


module.exports = router;