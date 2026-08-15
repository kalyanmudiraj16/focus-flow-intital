import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Flame,
  ListTodo,
  Play,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

import taskService from "../services/taskService";
import analyticsService from "../services/analyticsService";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    focusTime: {
      hours: 0,
      minutes: 0,
      totalSeconds: 0,
    },
    sessions: 0,
    tasksDone: 0,
    focusScore: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [tasksData, statsData] = await Promise.all([
        taskService.getAll(),
        analyticsService.getStats(),
      ]);

      setTasks(Array.isArray(tasksData) ? tasksData : []);
      setStats(
        statsData || {
          focusTime: {
            hours: 0,
            minutes: 0,
            totalSeconds: 0,
          },
          sessions: 0,
          tasksDone: 0,
          focusScore: 0,
        }
      );
    } catch (err) {
      console.error("Dashboard loading error:", err);
      setError(
        err.message || "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  );

  const displayedTasks = pendingTasks.slice(0, 5);

  const focusHours = stats.focusTime?.hours || 0;
  const focusMinutes = stats.focusTime?.minutes || 0;

  const focusScore = Math.min(
    100,
    Math.max(0, stats.focusScore || 0)
  );

  return (
    <div className="dashboard">
      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <section className="dashboard-header">
        <div>
          <p className="eyebrow">YOUR PRODUCTIVITY</p>

          <h1>Good to see you.</h1>

          <p className="dashboard-subtitle">
            Stay focused, finish what matters, and make
            today count.
          </p>
        </div>

        <button
          className="refresh-button"
          onClick={loadDashboard}
          disabled={loading}
          title="Refresh dashboard"
        >
          <RefreshCw
            size={17}
            className={loading ? "spin" : ""}
          />

          <span>Refresh</span>
        </button>
      </section>

      {/* ============================= */}
      {/* ERROR */}
      {/* ============================= */}

      {error && (
        <div className="dashboard-error">
          <span>{error}</span>

          <button onClick={loadDashboard}>
            Try again
          </button>
        </div>
      )}

      {/* ============================= */}
      {/* STAT CARDS */}
      {/* ============================= */}

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Clock3 size={20} />
          </div>

          <div>
            <p className="stat-label">Focus time</p>

            <h2>
              {focusHours}h {focusMinutes}m
            </h2>

            <span className="stat-description">
              Focused today
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <p className="stat-label">Tasks completed</p>

            <h2>{stats.tasksDone || 0}</h2>

            <span className="stat-description">
              Completed today
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Flame size={20} />
          </div>

          <div>
            <p className="stat-label">Focus score</p>

            <h2>{focusScore}%</h2>

            <span className="stat-description">
              Today's consistency
            </span>
          </div>
        </div>
      </section>

      {/* ============================= */}
      {/* MAIN GRID */}
      {/* ============================= */}

      <section className="dashboard-grid">
        {/* TASKS */}

        <div className="dashboard-card tasks-card">
          <div className="card-header">
            <div>
              <p className="card-eyebrow">TODAY</p>

              <h2>Tasks</h2>
            </div>

            <a
              href="/tasks"
              className="card-link"
            >
              View all
              <ArrowRight size={16} />
            </a>
          </div>

          {loading ? (
            <div className="empty-state">
              Loading tasks...
            </div>
          ) : displayedTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <ListTodo size={22} />
              </div>

              <h3>You're all clear</h3>

              <p>
                No pending tasks. Great job staying on
                top of things.
              </p>

              <a
                href="/tasks"
                className="secondary-button"
              >
                Manage tasks
              </a>
            </div>
          ) : (
            <div className="task-preview-list">
              {displayedTasks.map((task) => (
                <div
                  className="task-preview"
                  key={task._id}
                >
                  <span className="task-circle" />

                  <span className="task-text">
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOCUS */}

        <div className="dashboard-card focus-card">
          <div className="card-header">
            <div>
              <p className="card-eyebrow">DEEP WORK</p>

              <h2>Focus</h2>
            </div>

            <div className="focus-status">
              Ready
            </div>
          </div>

          <div className="focus-content">
            <div className="focus-icon">
              <Play size={26} fill="currentColor" />
            </div>

            <h3>Ready to focus?</h3>

            <p>
              Start a focused session and give one
              important task your full attention.
            </p>

            <a
              href="/focus"
              className="primary-button"
            >
              Start focus session
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* ============================= */}
      {/* QUICK OVERVIEW */}
      {/* ============================= */}

      <section className="dashboard-card overview-card">
        <div className="card-header">
          <div>
            <p className="card-eyebrow">OVERVIEW</p>

            <h2>Today's progress</h2>
          </div>
        </div>

        <div className="progress-layout">
          <div className="progress-item">
            <div className="progress-label">
              <span>Focus score</span>
              <strong>{focusScore}%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${focusScore}%`,
                }}
              />
            </div>
          </div>

          <div className="overview-stat">
            <span>Focus sessions</span>
            <strong>{stats.sessions || 0}</strong>
          </div>

          <div className="overview-stat">
            <span>Pending tasks</span>
            <strong>{pendingTasks.length}</strong>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;