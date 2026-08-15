import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Check,
  ListTodo,
  RefreshCw,
  Circle,
} from "lucide-react";

import taskService from "../services/taskService";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD TASKS
  // ==========================================

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await taskService.getAll();

      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Tasks loading error:", err);

      setError(
        err.message || "Unable to load your tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ==========================================
  // TASK FILTERS
  // ==========================================

  const pendingTasks = useMemo(
    () => tasks.filter((task) => !task.completed),
    [tasks]
  );

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed),
    [tasks]
  );

  // ==========================================
  // ADD TASK
  // ==========================================

  const addTask = async (event) => {
    event.preventDefault();

    const text = newTask.trim();

    if (!text || adding) {
      return;
    }

    try {
      setAdding(true);
      setError("");

      // IMPORTANT:
      // Send an object instead of a plain string.
      const createdTask = await taskService.create({
        text,
      });

      setTasks((currentTasks) => [
        createdTask,
        ...currentTasks,
      ]);

      setNewTask("");
    } catch (err) {
      console.error("Create task error:", err);

      setError(
        err.message || "Unable to create the task."
      );
    } finally {
      setAdding(false);
    }
  };

  // ==========================================
  // TOGGLE TASK
  // ==========================================

  const toggleTask = async (task) => {
    if (
      updatingId === task._id ||
      deletingId === task._id
    ) {
      return;
    }

    try {
      setUpdatingId(task._id);
      setError("");

      const updatedTask = await taskService.update(
        task._id,
        {
          completed: !task.completed,
        }
      );

      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask._id === updatedTask._id
            ? updatedTask
            : currentTask
        )
      );
    } catch (err) {
      console.error("Update task error:", err);

      setError(
        err.message || "Unable to update the task."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================
  // DELETE TASK
  // ==========================================

  const deleteTask = async (taskId) => {
    if (deletingId === taskId) {
      return;
    }

    try {
      setDeletingId(taskId);
      setError("");

      await taskService.remove(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task._id !== taskId
        )
      );
    } catch (err) {
      console.error("Delete task error:", err);

      setError(
        err.message || "Unable to delete the task."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="tasks-page">

      {/* HEADER */}

      <section className="tasks-header">
        <div>
          <p className="eyebrow">YOUR WORK</p>

          <h1>Tasks</h1>

          <p className="tasks-subtitle">
            Keep your priorities clear and move important
            work forward.
          </p>
        </div>

        <button
          className="refresh-button"
          onClick={loadTasks}
          disabled={loading}
          type="button"
        >
          <RefreshCw
            size={17}
            className={loading ? "spin" : ""}
          />

          <span>Refresh</span>
        </button>
      </section>

      {/* ERROR */}

      {error && (
        <div className="tasks-error">
          <span>{error}</span>

          <button
            type="button"
            onClick={loadTasks}
          >
            Try again
          </button>
        </div>
      )}

      {/* ADD TASK */}

      <section className="add-task-card">
        <form
          className="add-task-form"
          onSubmit={addTask}
        >
          <input
            type="text"
            value={newTask}
            onChange={(event) =>
              setNewTask(event.target.value)
            }
            placeholder="What needs to be done?"
            maxLength={200}
            disabled={adding}
            autoComplete="off"
          />

          <button
            type="submit"
            className="add-task-button"
            disabled={
              adding || !newTask.trim()
            }
          >
            <Plus size={18} />

            <span>
              {adding ? "Adding..." : "Add task"}
            </span>
          </button>
        </form>
      </section>

      {/* SUMMARY */}

      <section className="task-summary">
        <div>
          <span>Pending</span>
          <strong>{pendingTasks.length}</strong>
        </div>

        <div>
          <span>Completed</span>
          <strong>{completedTasks.length}</strong>
        </div>

        <div>
          <span>Total</span>
          <strong>{tasks.length}</strong>
        </div>
      </section>

      {/* TASK LIST */}

      <section className="tasks-card">

        <div className="tasks-card-header">
          <div>
            <p className="card-eyebrow">
              TASK LIST
            </p>

            <h2>Your tasks</h2>
          </div>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="tasks-empty">

            <div className="empty-icon">
              <RefreshCw
                size={21}
                className="spin"
              />
            </div>

            <h3>Loading tasks...</h3>

            <p>
              Getting your latest tasks.
            </p>

          </div>

        ) : tasks.length === 0 ? (

          /* EMPTY */

          <div className="tasks-empty">

            <div className="empty-icon">
              <ListTodo size={22} />
            </div>

            <h3>No tasks yet</h3>

            <p>
              Add your first task above and start making
              progress.
            </p>

          </div>

        ) : (

          /* TASKS */

          <div className="task-list">

            {/* PENDING */}

            {pendingTasks.length > 0 && (
              <>
                <div className="task-section-label">
                  Pending
                </div>

                {pendingTasks.map((task) => (
                  <TaskRow
                    key={task._id}
                    task={task}
                    updatingId={updatingId}
                    deletingId={deletingId}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))}
              </>
            )}

            {/* COMPLETED */}

            {completedTasks.length > 0 && (
              <>
                <div className="task-section-label completed-label">
                  Completed
                </div>

                {completedTasks.map((task) => (
                  <TaskRow
                    key={task._id}
                    task={task}
                    updatingId={updatingId}
                    deletingId={deletingId}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))}
              </>
            )}

          </div>
        )}

      </section>

    </div>
  );
};


// ==========================================
// TASK ROW
// ==========================================

const TaskRow = ({
  task,
  updatingId,
  deletingId,
  onToggle,
  onDelete,
}) => {
  const isUpdating = updatingId === task._id;
  const isDeleting = deletingId === task._id;

  return (
    <div
      className={`task-row ${
        task.completed ? "completed" : ""
      }`}
    >

      {/* CHECK */}

      <button
        type="button"
        className="task-check"
        onClick={() => onToggle(task)}
        disabled={
          isUpdating || isDeleting
        }
        aria-label={
          task.completed
            ? "Mark task incomplete"
            : "Mark task complete"
        }
      >
        {task.completed ? (
          <Check size={15} />
        ) : (
          <Circle size={18} />
        )}
      </button>

      {/* TEXT */}

      <span className="task-row-text">
        {task.text}
      </span>

      {/* DELETE */}

      <button
        type="button"
        className="delete-task-button"
        onClick={() => onDelete(task._id)}
        disabled={
          isUpdating || isDeleting
        }
        aria-label="Delete task"
        title="Delete task"
      >
        {isDeleting ? (
          <RefreshCw
            size={17}
            className="spin"
          />
        ) : (
          <Trash2 size={17} />
        )}
      </button>

    </div>
  );
};

export default Tasks;