import axios from "axios";

const API_URL = "https://employee-management-system-production-ce83.up.railway.app/api/auth";

export const loginUser = (userData) =>
  axios.post(`${API_URL}/login`, userData);