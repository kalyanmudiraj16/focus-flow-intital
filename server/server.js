const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");
const focusRoutes = require("./routes/focusRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// ==========================================
// ROUTES
// ==========================================

// Tasks
app.use("/api/tasks", taskRoutes);

// Focus sessions
app.use("/api/focus", focusRoutes);

// Analytics / statistics
app.use("/api/stats", analyticsRoutes);

// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FocusFlow backend is running!",
  });
});
app.use(errorMiddleware);
// ==========================================
// TEST API
// ==========================================

app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FocusFlow API is working!",
  });
});

// ==========================================
// 404 HANDLER
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// ==========================================
// DATABASE + SERVER
// ==========================================

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(
        `FocusFlow server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);

    process.exit(1);
  }
};

startServer();