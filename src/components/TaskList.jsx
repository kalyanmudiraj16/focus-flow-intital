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


  // =========================
  // LOAD TASKS
  // =========================

  useEffect(() => {
    fetchTasks();
  }, []);


  // =========================
  // ADD TASK
  // =========================

  const addTask = async () => {
    const text = newTask.trim();

    if (!text) {
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          text: text
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const createdTask = await response.json();

      setTasks((previousTasks) => [
        createdTask,
        ...previousTasks
      ]);

      setNewTask("");

    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };


  // =========================
  // COMPLETE TASK
  // =========================

  const toggleTask = async (task) => {
    try {
      const response = await fetch(
        `${API_URL}/${task._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            completed: !task.completed
          })
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

      setTasks((previousTasks) =>
        previousTasks.filter(
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


      {loading ? (

        <p>
          Loading tasks...
        </p>

      ) : tasks.length === 0 ? (

        <p>
          No tasks yet. Add your first task!
        </p>

      ) : (

        tasks.map((task) => (

          <div
            className="task"
            key={task._id}
          >

            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                toggleTask(task)
              }
            />


            <span
              style={{
                textDecoration: task.completed
                  ? "line-through"
                  : "none",
                opacity: task.completed
                  ? 0.5
                  : 1
              }}
            >
              {task.text}
            </span>


            <button
              onClick={() =>
                deleteTask(task._id)
              }
            >
              Delete
            </button>

          </div>

        ))

      )}

    </section>
  );
};

export default TaskList;