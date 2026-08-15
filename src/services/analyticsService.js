import api from "./api";

const analyticsService = {
  getStats: () => api.get("/api/stats"),
};

export default analyticsService;