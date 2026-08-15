import api from "./api";

const focusService = {
  getAll: () =>
    api.get("/api/focus"),

  create: (session) =>
    api.post("/api/focus", session),
};

export default focusService;