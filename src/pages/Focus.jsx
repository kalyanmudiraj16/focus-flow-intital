import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Play,
  Square,
  Target,
  Zap,
  Brain,
  ListTodo,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

import focusService from "../services/focusService";
import taskService from "../services/taskService";

const Focus = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [focusMode, setFocusMode] = useState("deep");

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [loadingTasks, setLoadingTasks] = useState(true);
  const [saving, setSaving] = useState(false);

  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  const timerRef = useRef(null);

  /* ================================
     LOAD TASKS
  ================================= */

  const loadTasks = async () => {
    try {
      setLoadingTasks(true);
      setError("");

      const data = await taskService.getAll();

      const pendingTasks = Array.isArray(data)
        ? data.filter((task) => !task.completed)
        : [];

      setTasks(pendingTasks);

      if (pendingTasks.length > 0 && !selectedTask) {
        setSelectedTask(pendingTasks[0]._id);
      }
    } catch (err) {
      console.error("Focus task loading error:", err);

      setError(
        err.message || "Unable to load your tasks."
      );
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  /* ================================
     TIMER
  ================================= */

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    timerRef.current = setInterval(() => {
      setElapsedSeconds((previous) => previous + 1);
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isRunning]);

  /* ================================
     FORMAT TIME
  ================================= */

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(
      (seconds % 3600) / 60
    );
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(
        remainingSeconds
      ).padStart(2, "0")}`;
    }

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  /* ================================
     START
  ================================= */

  const handleStart = () => {
    if (!selectedTask) {
      setError("Choose a task before starting focus.");
      return;
    }

    setError("");
    setCompleted(false);
    setIsRunning(true);
  };

  /* ================================
     FINISH
  ================================= */

  const handleFinish = async () => {
    if (!elapsedSeconds || saving) {
      return;
    }

    try {
      clearInterval(timerRef.current);

      setIsRunning(false);
      setSaving(true);
      setError("");

      await focusService.create({
        duration: elapsedSeconds,
      });

      setCompleted(true);
    } catch (err) {
      console.error("Focus session save error:", err);

      setError(
        err.message ||
          "Unable to save your focus session."
      );

      setIsRunning(true);
    } finally {
      setSaving(false);
    }
  };

  /* ================================
     CANCEL
  ================================= */

  const handleCancel = () => {
    clearInterval(timerRef.current);

    setElapsedSeconds(0);
    setIsRunning(false);
    setCompleted(false);
    setError("");
  };

  /* ================================
     NEW SESSION
  ================================= */

  const handleNewSession = () => {
    clearInterval(timerRef.current);

    setElapsedSeconds(0);
    setIsRunning(false);
    setCompleted(false);
    setError("");

    loadTasks();
  };

  /* ================================
     SELECTED TASK
  ================================= */

  const selectedTaskData = tasks.find(
    (task) => task._id === selectedTask
  );

  /* ================================
     PAGE
  ================================= */

  return (
    <main className="focus-page">
      <div className="focus-page-inner">

        {/* HEADER */}

        <header className="focus-page-header">

          <Link
            to="/"
            className="focus-back-link"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>

          <div className="focus-page-heading">

            <p className="focus-page-eyebrow">
              DEEP WORK
            </p>

            <h1>Focus</h1>

            <p>
              Choose what matters and give it your
              full attention.
            </p>

          </div>

        </header>

        {/* ERROR */}

        {error && (
          <div className="focus-error">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
            >
              ×
            </button>
          </div>
        )}

        {!isRunning && !completed ? (
          /* =================================
             SETUP
          ================================= */

          <section className="focus-workspace">

            <div className="focus-workspace-header">

              <div>
                <p className="focus-card-eyebrow">
                  FOCUS WORKSPACE
                </p>

                <h2>
                  What deserves your attention?
                </h2>

                <p>
                  Pick one task and work on it
                  without distractions.
                </p>
              </div>

              <div className="focus-header-icon">
                <Target size={23} />
              </div>

            </div>

            {/* TASK */}

            <div className="focus-field">

              <label htmlFor="focus-task">
                Choose a task
              </label>

              {loadingTasks ? (
                <div className="focus-loading">
                  <RefreshCw
                    size={17}
                    className="focus-spin"
                  />
                  Loading your tasks...
                </div>
              ) : tasks.length === 0 ? (
                <div className="focus-no-tasks">
                  <ListTodo size={19} />

                  <div>
                    <strong>
                      No pending tasks
                    </strong>

                    <span>
                      Add a task first, then come
                      back here to focus.
                    </span>
                  </div>

                  <Link to="/tasks">
                    Add task
                  </Link>
                </div>
              ) : (
                <select
                  id="focus-task"
                  value={selectedTask}
                  onChange={(event) =>
                    setSelectedTask(event.target.value)
                  }
                  className="focus-select"
                >
                  {tasks.map((task) => (
                    <option
                      key={task._id}
                      value={task._id}
                    >
                      {task.text}
                    </option>
                  ))}
                </select>
              )}

            </div>

            {/* MODES */}

            <div className="focus-field">

              <label>
                Choose focus mode
              </label>

              <div className="focus-mode-grid">

                <button
                  type="button"
                  className={`focus-mode ${
                    focusMode === "deep"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setFocusMode("deep")
                  }
                >
                  <div className="focus-mode-icon">
                    <Brain size={19} />
                  </div>

                  <div>
                    <strong>
                      Deep Work
                    </strong>

                    <span>
                      Best for important work
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`focus-mode ${
                    focusMode === "quick"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setFocusMode("quick")
                  }
                >
                  <div className="focus-mode-icon">
                    <Zap size={19} />
                  </div>

                  <div>
                    <strong>
                      Quick Work
                    </strong>

                    <span>
                      Handle something small
                    </span>
                  </div>
                </button>

              </div>

            </div>

            {/* START */}

            <button
              type="button"
              className="focus-start-button"
              onClick={handleStart}
              disabled={
                loadingTasks ||
                tasks.length === 0 ||
                !selectedTask
              }
            >
              <Play
                size={19}
                fill="currentColor"
              />

              Start Focus
            </button>

            <p className="focus-no-limit">
              No time limit. Stop when the work is done.
            </p>

          </section>
        ) : isRunning ? (
          /* =================================
             ACTIVE SESSION
          ================================= */

          <section className="focus-active-workspace">

            <div className="focus-active-top">

              <span className="focus-live-badge">
                <span />
                FOCUSING
              </span>

              <span className="focus-active-mode">
                {focusMode === "deep"
                  ? "Deep Work"
                  : "Quick Work"}
              </span>

            </div>

            <div className="focus-active-content">

              <p className="focus-card-eyebrow">
                CURRENT TASK
              </p>

              <h2>
                {selectedTaskData?.text ||
                  "Focused work"}
              </h2>

              <div className="focus-live-timer">
                {formatTime(elapsedSeconds)}
              </div>

              <p className="focus-active-message">
                Stay with this one thing.
              </p>

            </div>

            <div className="focus-active-actions">

              <button
                type="button"
                className="focus-finish-button"
                onClick={handleFinish}
                disabled={saving}
              >
                <CheckCircle2 size={19} />

                {saving
                  ? "Saving..."
                  : "Finish Focus"}
              </button>

              <button
                type="button"
                className="focus-cancel-button"
                onClick={handleCancel}
                disabled={saving}
              >
                <Square size={16} />

                Cancel
              </button>

            </div>

            <p className="focus-session-note">
              FocusFlow is measuring your time.
              There is no artificial countdown.
            </p>

          </section>
        ) : (
          /* =================================
             COMPLETE
          ================================= */

          <section className="focus-complete-workspace">

            <div className="focus-complete-icon">
              <CheckCircle2 size={30} />
            </div>

            <p className="focus-card-eyebrow">
              SESSION COMPLETE
            </p>

            <h2>
              Nice work.
            </h2>

            <p className="focus-complete-task">
              {selectedTaskData?.text ||
                "Focused work"}
            </p>

            <div className="focus-complete-time">
              {formatTime(elapsedSeconds)}
            </div>

            <p className="focus-complete-message">
              Your focus session has been recorded.
            </p>

            <button
              type="button"
              className="focus-start-button"
              onClick={handleNewSession}
            >
              <Play
                size={18}
                fill="currentColor"
              />

              Start another focus
            </button>

          </section>
        )}

        {/* INFO */}

        <section className="focus-info">

          <div>
            <strong>
              Work with intention.
            </strong>

            <span>
              Measure progress, don't chase a timer.
            </span>
          </div>

          <p>
            FocusFlow records your completed focus
            sessions so your productivity becomes
            visible over time.
          </p>

        </section>

      </div>
    </main>
  );
};

export default Focus;