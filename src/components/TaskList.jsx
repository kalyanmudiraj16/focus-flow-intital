import { useEffect, useState } from "react";

const API_URL = "https://focus-flow-intital.onrender.com/api/tasks";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // GET TASKS
  // =========================

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

  // Load tasks when page opens

  useEffect(() => {
    fetchTasks();
  }, []);


  // =========================
  // ADD TASK
  // =========================

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          text: newTask.trim()
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const task = await response.json();

      setTasks((currentTasks) => [
        task,
        ...currentTasks
      ]);

      setNewTask("");

    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };


  // =========================
  // COMPLETE TASK
  // =========================

  const toggleTask = async (id, completed) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            completed: !completed
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === id
            ? updatedTask
            : task
        )
      );

    } catch (error) {
      console.error(
        "Failed to update task:",
        error
      );
    }
  };


  // =========================
  // DELETE TASK
  // =========================

  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task._id !== id
        )
      );

    } catch (error) {
      console.error(
        "Failed to delete task:",
        error
      );
    }
  };


  // =========================
  // ENTER KEY
  // =========================

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };


  // =========================
  // VISIBLE TASKS
  // =========================

  const activeTasks = tasks.filter(
    (task) => !task.completed
  );


  return (
    <section className="task-list">

      {/* HEADER */}

      <div className="section-header">

        <div>

          <p className="section-label">
            TODAY
          </p>

          <h2>
            Your Tasks
          </h2>

        </div>

      </div>


      {/* ADD TASK */}

      <div className="task-input-container">

        <input
          type="text"
          placeholder="What do you need to do?"
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


      {/* LOADING */}

      {loading && (
        <p className="timer-status">
          Loading tasks...
        </p>
      )}


      {/* EMPTY STATE */}

      {!loading &&
        activeTasks.length === 0 && (
          <p className="timer-status">
            No active tasks. Add a new task!
          </p>
        )}


      {/* TASKS */}

      {!loading &&
        activeTasks.map((task) => (

          <div
            className="task"
            key={task._id}
          >

            {/* CHECKBOX */}

            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                toggleTask(
                  task._id,
                  task.completed
                )
              }
            />


            {/* TASK TEXT */}

            <span>
              {task.text}
            </span>


            {/* DELETE */}

            <button
              onClick={() =>
                deleteTask(task._id)
              }
              style={{
                marginLeft: "auto",
                background: "transparent",
                border: "none",
                color: "#999",
                cursor: "pointer",
                fontSize: "18px"
              }}
              title="Delete task"
            >
              ×
            </button>

          </div>

        ))}

    </section>
  );
};

export default TaskList;