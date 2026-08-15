import api from "./api";

const goalService = {
  getAll: () =>
    api.get("/api/goals"),

  getById: (id) =>
    api.get(`/api/goals/${id}`),

  create: (goal) =>
    api.post("/api/goals", goal),

  update: (id, goal) =>
    api.put(`/api/goals/${id}`, goal),

  remove: (id) =>
    api.delete(`/api/goals/${id}`),
};

export default goalService;