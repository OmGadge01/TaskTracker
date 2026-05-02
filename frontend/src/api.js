import axios from "axios";


const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://tasktracker-z39a.onrender.com";

const API = axios.create({
  baseURL,
});

export default API;

