import api from "./api";

const taskService = {
  getAll: () => api.get("/api/tasks"),

  create: (task) =>
    api.post("/api/tasks", task),

  update: (id, task) =>
    api.put(`/api/tasks/${id}`, task),

  remove: (id) =>
    api.delete(`/api/tasks/${id}`),
};

export default taskService;