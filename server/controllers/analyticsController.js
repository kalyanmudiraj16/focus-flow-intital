const Task = require("../models/Task");
const FocusSession = require("../models/FocusSession");

// GET /api/stats
const getStats = async (req, res, next) => {
  try {
    const [tasks, focusSessions] = await Promise.all([
      Task.find(),
      FocusSession.find(),
    ]);

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.completed
    ).length;

    const pendingTasks = totalTasks - completedTasks;

    const totalFocusMinutes = focusSessions.reduce(
      (total, session) => total + Number(session.duration || 0),
      0
    );

    const totalFocusSessions = focusSessions.length;

    const completionRate =
      totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalTasks,
        completedTasks,
        pendingTasks,
        totalFocusMinutes,
        totalFocusSessions,
        completionRate,
      },
    });
  } catch (error) {
    console.error("Get stats error:", error);
    next(error);
  }
};

module.exports = {
  getStats,
};