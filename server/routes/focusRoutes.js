const express = require("express");
const FocusSession = require("../models/FocusSession");

const router = express.Router();


// =========================
// GET ALL FOCUS SESSIONS
// =========================

router.get("/", async (req, res) => {
  try {
    const sessions = await FocusSession.find()
      .sort({ completedAt: -1 });

    res.status(200).json(sessions);

  } catch (error) {
    console.error("Get sessions error:", error);

    res.status(500).json({
      message: "Failed to fetch focus sessions"
    });
  }
});


// =========================
// CREATE FOCUS SESSION
// =========================

router.post("/", async (req, res) => {
  try {
    const { duration } = req.body;

    if (!duration || duration <= 0) {
      return res.status(400).json({
        message: "Valid duration is required"
      });
    }

    const session = await FocusSession.create({
      duration
    });

    res.status(201).json(session);

  } catch (error) {
    console.error("Create session error:", error);

    res.status(500).json({
      message: "Failed to create focus session"
    });
  }
});


module.exports = router;