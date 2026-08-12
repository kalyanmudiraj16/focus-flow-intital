import { useEffect, useState } from "react";

const Stats = () => {
  const [stats, setStats] = useState({
    focusTime: {
      hours: 0,
      minutes: 0
    },
    sessions: 0,
    tasksDone: 0,
    focusScore: 0
  });

  const [loading, setLoading] = useState(true);


  // =========================
  // FETCH STATS
  // =========================

  const fetchStats = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/stats"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }

      const data = await response.json();

      setStats(data);

    } catch (error) {
      console.error(
        "Failed to fetch stats:",
        error
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // LOAD + AUTO REFRESH
  // =========================

  useEffect(() => {
    // Fetch immediately
    fetchStats();

    // Refresh every 5 seconds
    const interval = setInterval(() => {
      fetchStats();
    }, 5000);

    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, []);


  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="stats">

        <p className="section-label">
          YOUR PROGRESS
        </p>

        <h2>
          Today's Stats
        </h2>

        <p
          style={{
            marginTop: "20px",
            color: "#aaa"
          }}
        >
          Loading stats...
        </p>

      </section>
    );
  }


  return (
    <section className="stats">

      <p className="section-label">
        YOUR PROGRESS
      </p>

      <h2>
        Today's Stats
      </h2>


      <div className="stats-container">


        {/* =========================
            FOCUS TIME
        ========================= */}

        <div className="stat-card">

          <h3>
            {stats.focusTime.hours > 0
              ? `${stats.focusTime.hours}h ${stats.focusTime.minutes}m`
              : `${stats.focusTime.minutes}m`}
          </h3>

          <p>
            Focus Time
          </p>

        </div>


        {/* =========================
            SESSIONS
        ========================= */}

        <div className="stat-card">

          <h3>
            {stats.sessions}
          </h3>

          <p>
            Sessions
          </p>

        </div>


        {/* =========================
            TASKS DONE
        ========================= */}

        <div className="stat-card">

          <h3>
            {stats.tasksDone}
          </h3>

          <p>
            Tasks Done
          </p>

        </div>


        {/* =========================
            FOCUS SCORE
        ========================= */}

        <div className="stat-card">

          <h3>
            {stats.focusScore}%
          </h3>

          <p>
            Focus Score
          </p>

        </div>


      </div>

    </section>
  );
};


export default Stats;