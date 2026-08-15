const validateTask = (req, res, next) => {
  const { text } = req.body;

  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({
      success: false,
      message: "Task text is required",
    });
  }

  next();
};

const validateFocusSession = (req, res, next) => {
  const { duration } = req.body;

  if (
    typeof duration !== "number" ||
    !Number.isFinite(duration) ||
    duration <= 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Valid duration is required",
    });
  }

  next();
};

module.exports = {
  validateTask,
  validateFocusSession,
};