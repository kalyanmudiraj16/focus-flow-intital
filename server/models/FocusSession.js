const mongoose = require("mongoose");

const focusSessionSchema = new mongoose.Schema(
  {
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FocusSession", focusSessionSchema);