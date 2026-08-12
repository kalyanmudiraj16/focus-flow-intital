const mongoose = require("mongoose");

const focusSessionSchema = new mongoose.Schema(
  {
    duration: {
      type: Number,
      required: true
    },

    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "FocusSession",
  focusSessionSchema
);