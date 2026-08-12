import { useEffect, useState } from "react";

const FOCUS_TIME = 25 * 60;
const API_URL = "http://localhost:5000/api/focus";

const FocusTimer = () => {
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(timer);
          setIsRunning(false);

          saveCompletedSession();

          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);


  // =========================
  // SAVE COMPLETED SESSION
  // =========================

  const saveCompletedSession = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          duration: FOCUS_TIME
        })
      });

      if (!response.ok) {
        throw new Error("Failed to save focus session");
      }

      console.log("Focus session saved successfully");

    } catch (error) {
      console.error(
        "Failed to save focus session:",
        error
      );
    }
  };


  // =========================
  // FORMAT TIME
  // =========================

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;


  // =========================
  // START / PAUSE
  // =========================

  const handleStartPause = () => {
    if (timeLeft === 0) {
      return;
    }

    setIsRunning((previous) => !previous);
  };


  // =========================
  // RESET
  // =========================

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(FOCUS_TIME);
  };


  return (
    <section className="focus-timer">

      <p className="section-label">
        FOCUS SESSION
      </p>

      <h1>
        {timeLeft === 0
          ? "Session complete!"
          : isRunning
          ? "Stay focused"
          : "Ready to focus?"}
      </h1>

      <div className="timer">
        {formattedTime}
      </div>

      <p className="timer-status">
        {timeLeft === 0
          ? "Great work! Take a short break."
          : isRunning
          ? "Deep work session"
          : "25 minute focus session"}
      </p>

      <div className="timer-buttons">

        <button onClick={handleStartPause}>
          {isRunning
            ? "Pause"
            : "Start Focus"}
        </button>

        <button onClick={handleReset}>
          Reset
        </button>

      </div>

    </section>
  );
};

export default FocusTimer;