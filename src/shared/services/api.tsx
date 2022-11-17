import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const token = localStorage.getItem("session.token");

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export { api };
