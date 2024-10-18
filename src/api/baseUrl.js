import axios from "axios";

const api = axios.create({
  baseURL: "https://task-management-m6c9.onrender.com/api",
});

export default api;
