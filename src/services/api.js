const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://focus-flow-intital.onrender.com";

const request = async (endpoint, options = {}) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      }
    );

    let data = null;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw new Error(
        data?.message ||
          `Request failed (${response.status})`
      );
    }

    return data;
  } catch (error) {
    console.error("API request error:", error);

    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect to the server. Please check that the backend is running."
      );
    }

    throw error;
  }
};

const api = {
  get: (endpoint) =>
    request(endpoint, {
      method: "GET",
    }),

  post: (endpoint, body) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (endpoint, body) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: (endpoint, body) =>
    request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: (endpoint) =>
    request(endpoint, {
      method: "DELETE",
    }),
};

export { API_BASE_URL };

export default api;