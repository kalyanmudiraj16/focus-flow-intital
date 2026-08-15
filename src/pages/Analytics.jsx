import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Clock3,
  RefreshCw,
  Target,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

import analyticsService from "../services/analyticsService";

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await analyticsService.getStats();

      setStats(data);
    } catch (err) {
      console.error("Analytics loading error:", err);

      setError(
        err.message || "Unable to load your analytics."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const focusHours = stats?.focusTime?.hours ?? 0;
  const focusMinutes = stats?.focusTime?.minutes ?? 0;
  const sessions = stats?.sessions ?? 0;
  const tasksDone = stats?.tasksDone ?? 0;
  const focusScore = stats?.focusScore ?? 0;

  const scoreMessage = useMemo(() => {
    if (focusScore === 0) {
      return "Start your first focus session today.";
    }

    if (focusScore < 40) {
      return "You're getting started. Keep building the habit.";
    }

    if (focusScore < 80) {
      return "Good progress. Keep your momentum going.";
    }

    return "Excellent focus today. You're in a strong rhythm.";
  }, [focusScore]);

  const focusProgress = Math.min(
    100,
    (focusMinutes / 120) * 100 +
      focusHours * 100
  );

  const taskProgress =
    tasksDone > 0
      ? Math.min(100, tasksDone * 20)
      : 0;

  return (
    <main className="analytics-page">
      <div className="analytics-page-inner">

        {/* HEADER */}

        <header className="analytics-header">
          <div>
            <Link
              to="/"
              className="analytics-back-link"
            >
              <ArrowLeft size={16} />
              Dashboard
            </Link>

            <p className="analytics-eyebrow">
              PRODUCTIVITY
            </p>

            <h1>Analytics</h1>

            <p className="analytics-subtitle">
              Understand your focus, consistency, and
              progress from today's work.
            </p>
          </div>

          <button
            type="button"
            className="analytics-refresh-button"
            onClick={loadStats}
            disabled={loading}
          >
            <RefreshCw
              size={16}
              className={
                loading ? "analytics-spin" : ""
              }
            />

            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </header>

        {/* ERROR */}

        {error && (
          <div className="analytics-error">
            <span>{error}</span>

            <button
              type="button"
              onClick={loadStats}
            >
              Try again
            </button>
          </div>
        )}

        {/* SCORE */}

        <section className="analytics-score-card">

          <div className="analytics-score-content">

            <p className="analytics-card-eyebrow">
              TODAY'S FOCUS SCORE
            </p>

            <div className="analytics-score-number">
              {loading ? "—" : focusScore}
            </div>

            <h2>
              {loading
                ? "Loading your progress..."
                : scoreMessage}
            </h2>

            <p>
              Based on your completed focus sessions
              today.
            </p>

          </div>

          <div className="analytics-score-ring">
            <div
              className="analytics-score-ring-fill"
              style={{
                "--score": `${focusScore * 3.6}deg`,
              }}
            >
              <div className="analytics-score-ring-inner">
                <strong>
                  {focusScore}%
                </strong>
              </div>
            </div>
          </div>

        </section>

        {/* STATS */}

        <section className="analytics-stats-grid">

          <div className="analytics-stat-card">

            <div className="analytics-stat-icon">
              <Clock3 size={20} />
            </div>

            <div>
              <span>Focus time</span>

              <strong>
                {loading
                  ? "—"
                  : `${focusHours}h ${focusMinutes}m`}
              </strong>

              <small>
                Total focused time today
              </small>
            </div>

          </div>

          <div className="analytics-stat-card">

            <div className="analytics-stat-icon">
              <Target size={20} />
            </div>

            <div>
              <span>Sessions</span>

              <strong>
                {loading ? "—" : sessions}
              </strong>

              <small>
                Completed focus sessions
              </small>
            </div>

          </div>

          <div className="analytics-stat-card">

            <div className="analytics-stat-icon">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <span>Tasks done</span>

              <strong>
                {loading ? "—" : tasksDone}
              </strong>

              <small>
                Completed today
              </small>
            </div>

          </div>

          <div className="analytics-stat-card">

            <div className="analytics-stat-icon">
              <Zap size={20} />
            </div>

            <div>
              <span>Focus score</span>

              <strong>
                {loading ? "—" : `${focusScore}%`}
              </strong>

              <small>
                Today's productivity score
              </small>
            </div>

          </div>

        </section>

        {/* BREAKDOWN */}

        <section className="analytics-card">

          <div className="analytics-card-header">
            <p className="analytics-card-eyebrow">
              DAILY BREAKDOWN
            </p>

            <h2>
              How your day is going
            </h2>
          </div>

          <div className="analytics-breakdown">

            <div className="analytics-breakdown-item">

              <div className="analytics-breakdown-top">
                <span>Focus progress</span>

                <strong>
                  {focusHours}h {focusMinutes}m
                </strong>
              </div>

              <div className="analytics-progress">
                <div
                  className="analytics-progress-fill"
                  style={{
                    width: `${focusProgress}%`,
                  }}
                />
              </div>

            </div>

            <div className="analytics-breakdown-item">

              <div className="analytics-breakdown-top">
                <span>Completed tasks</span>

                <strong>
                  {tasksDone}
                </strong>
              </div>

              <div className="analytics-progress">
                <div
                  className="analytics-progress-fill"
                  style={{
                    width: `${taskProgress}%`,
                  }}
                />
              </div>

            </div>

          </div>

        </section>

        {/* SESSION ACTIVITY */}

        <section className="analytics-card">

          <div className="analytics-card-header">
            <p className="analytics-card-eyebrow">
              FOCUS ACTIVITY
            </p>

            <h2>
              Today's sessions
            </h2>
          </div>

          <div className="analytics-session-dots">

            {Array.from({ length: 8 }).map(
              (_, index) => (
                <span
                  key={index}
                  className={
                    index < sessions
                      ? "active"
                      : ""
                  }
                />
              )
            )}

          </div>

          <p
            style={{
              marginTop: "15px",
              color: "rgba(255,255,255,0.45)",
              fontSize: "13px",
            }}
          >
            {sessions === 0
              ? "No completed sessions yet today."
              : `${sessions} completed session${
                  sessions === 1 ? "" : "s"
                } today.`}
          </p>

        </section>

        {/* INSIGHT */}

        <section className="analytics-insight">

          <div className="analytics-insight-icon">
            <BarChart3 size={21} />
          </div>

          <div>

            <h2>
              Today's insight
            </h2>

            <p>
              {sessions === 0 && tasksDone === 0
                ? "Your analytics will become more useful as you complete tasks and focus sessions."
                : sessions > 0
                ? "You're building measurable focus time. Keep completing focused sessions to strengthen your productivity pattern."
                : "You've completed tasks today. Try adding a focused session to make your productivity more balanced."}
            </p>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Analytics;