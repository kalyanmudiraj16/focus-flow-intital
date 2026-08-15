const FocusSession = require("../models/FocusSession");

// GET /api/focus
const getFocusSessions = async (req, res, next) => {
  try {
    const sessions = await FocusSession.find()
      .sort({ completedAt: -1 });

    res.status(200).json(sessions);
  } catch (error) {
    console.error("Get sessions error:", error);
    next(error);
  }
};

// POST /api/focus
const createFocusSession = async (req, res, next) => {
  try {
    const { duration } = req.body;

    if (!duration || duration <= 0) {
      return res.status(400).json({
        message: "Valid duration is required",
      });
    }

    const session = await FocusSession.create({
      duration,
    });

    res.status(201).json(session);
  } catch (error) {
    console.error("Create session error:", error);
    next(error);
  }
};

module.exports = {
  getFocusSessions,
  createFocusSession,
};