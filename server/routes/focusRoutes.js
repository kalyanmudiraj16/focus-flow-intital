const express = require("express");

const {
  getFocusSessions,
  createFocusSession,
} = require("../controllers/focusController");

const {
  validateFocusSession,
} = require("../middleware/validationMiddleware");

const router = express.Router();

router.get("/", getFocusSessions);

router.post(
  "/",
  validateFocusSession,
  createFocusSession
);

module.exports = router;