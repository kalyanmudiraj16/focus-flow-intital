const FocusTimer = () => {
  return (
    <section className="focus-timer">

      <p className="section-label">
        FOCUS SESSION
      </p>

      <h1>
        Ready to focus?
      </h1>

      <div className="timer">
        1:00
      </div>

      <p className="timer-status">
        Deep work session
      </p>

      <div className="timer-buttons">
        <button>
          Start Focus
        </button>

        <button>
          Reset
        </button>
      </div>

    </section>
  )
}

export default FocusTimer