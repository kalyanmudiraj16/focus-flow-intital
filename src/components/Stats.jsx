const Stats = () => {
  return (
    <section className="stats">

      <p className="section-label">
        YOUR PROGRESS
      </p>

      <h2>
        Today's Stats
      </h2>

      <div className="stats-container">

        <div className="stat-card">
          <h3>2h 15m</h3>
          <p>Focus Time</p>
        </div>

        <div className="stat-card">
          <h3>4</h3>
          <p>Sessions</p>
        </div>

        <div className="stat-card">
          <h3>6</h3>
          <p>Tasks Done</p>
        </div>

        <div className="stat-card">
          <h3>85%</h3>
          <p>Focus Score</p>
        </div>

      </div>

    </section>
  )
}

export default Stats