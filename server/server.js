const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const Task = require("./models/Task");
const FocusSession = require("./models/FocusSession");

const taskRoutes = require("./routes/taskRoutes");
const focusRoutes = require("./routes/focusRoutes");

const app = express();

const PORT = process.env.PORT || 5000;


// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());


// =========================
// ROUTES
// =========================

app.use("/api/tasks", taskRoutes);
app.use("/api/focus", focusRoutes);


// =========================
// REAL STATS API
// =========================

app.get("/api/stats", async (req, res) => {
  try {

    // Start of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // End of today
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);


    // =========================
    // FOCUS SESSIONS
    // =========================

    const sessions = await FocusSession.find({
      completedAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });


    // Total focus time
    const totalFocusSeconds = sessions.reduce(
      (total, session) => {
        return total + session.duration;
      },
      0
    );


    // Convert to hours and minutes
    const focusHours = Math.floor(
      totalFocusSeconds / 3600
    );

    const focusMinutes = Math.floor(
      (totalFocusSeconds % 3600) / 60
    );


    // =========================
    // COMPLETED TASKS
    // =========================

    const tasksDone = await Task.countDocuments({
      completed: true,
      updatedAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });


    // =========================
    // FOCUS SCORE
    // =========================

    const focusScore = Math.min(
      100,
      sessions.length * 20
    );


    // =========================
    // RESPONSE
    // =========================

    res.json({

      focusTime: {
        hours: focusHours,
        minutes: focusMinutes,
        totalSeconds: totalFocusSeconds
      },

      sessions: sessions.length,

      tasksDone,

      focusScore

    });

  } catch (error) {

    console.error(
      "Stats error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch stats"
    });
  }
});


// =========================
// HOME
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "FocusFlow backend is running!"
  });
});


// =========================
// TEST API
// =========================

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "FocusFlow API is working!"
  });
});


// =========================
// MONGODB
// =========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:");
    console.error(error.message);
  });


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(
    `FocusFlow server running on http://localhost:${PORT}`
  );
});