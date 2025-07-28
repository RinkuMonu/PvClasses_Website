import axios from "axios";
const api = axios.create({
  baseURL: "https://api.pvclasses.in/api", 
});

// ===== Request Interceptor =====
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // console.log("Request →", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ===== Response Interceptor =====
api.interceptors.response.use(
  (response) => {
    // console.log("Response ←", response.status, response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized: Redirecting to login...");
        localStorage.removeItem("token");
        // window.location.href = "/login"; 
      }

      // console.error("Error Response:", error.response.data.message || "Error");
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
