import api from "./api";

const notificationService = {
  getAll: () =>
    api.get("/api/notifications"),

  markAsRead: (id) =>
    api.patch(`/api/notifications/${id}/read`),

  markAllAsRead: () =>
    api.patch("/api/notifications/read-all"),

  remove: (id) =>
    api.delete(`/api/notifications/${id}`),
};

export default notificationService;