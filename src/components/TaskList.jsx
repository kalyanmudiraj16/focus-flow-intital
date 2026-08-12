const TaskList = () => {
  return (
    <section className="task-list">

      <div className="section-header">
        <div>
          <p className="section-label">
            TODAY
          </p>

          <h2>
            Your Tasks
          </h2>
        </div>

        <button className="add-task">
          + Add Task
        </button>
      </div>

      <div className="task">
        <input type="checkbox" />

        <span>
          Complete React project
        </span>
      </div>

      <div className="task">
        <input type="checkbox" />

        <span>
          Practice DSA for 1 hour
        </span>
      </div>

      <div className="task">
        <input type="checkbox" />

        <span>
          Read React documentation
        </span>
      </div>

    </section>
  )
}

export default TaskList