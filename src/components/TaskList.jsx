import { useEffect, useState } from "react";

const API_URL = "https://focus-flow-intital.onrender.com/api/tasks";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  // GET TASKS
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {
    const text = newTask.trim();

    if (!text) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const createdTask = await response.json();

      setTasks((previousTasks) => [
        createdTask,
        ...previousTasks,
      ]);

      setNewTask("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  // COMPLETE / UNCOMPLETE TASK
  const toggleTask = async (task) => {
    try {
      const response = await fetch(
        `${API_URL}/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !task.completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((previousTasks) =>
        previousTasks.map((item) =>
          item._id === updatedTask._id
            ? updatedTask
            : item
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((previousTasks) =>
        previousTasks.filter(
          (task) => task._id !== id
        )
      );
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // ENTER KEY
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <section className="task-list" id="tasks">
      <div className="section-header">
        <div>
          <p className="section-label">TODAY</p>

          <h2>Your Tasks</h2>
        </div>

        <div className="add-task-container">
          <input
            type="text"
            placeholder="Add a task..."
            value={newTask}
            onChange={(event) =>
              setNewTask(event.target.value)
            }
            onKeyDown={handleKeyDown}
          />

          <button
            className="add-task"
            onClick={addTask}
          >
            + Add Task
          </button>
        </div>
      </div>

      <div className="tasks-container">
        {loading ? (
          <div className="empty-tasks">
            <div className="loading-spinner"></div>
            <p>Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-tasks">
            <div className="empty-icon">✓</div>
            <p>No tasks yet.</p>
            <span>Add your first task above.</span>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              className={`task ${
                task.completed ? "completed" : ""
              }`}
              key={task._id}
            >
              <label className="task-check">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    toggleTask(task)
                  }
                />

                <span className="custom-checkbox">
                  ✓
                </span>
              </label>

              <span className="task-text">
                {task.text}
              </span>

              <button
                className="delete-task"
                onClick={() =>
                  deleteTask(task._id)
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TaskList;