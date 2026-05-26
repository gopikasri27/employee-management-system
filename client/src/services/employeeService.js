import axios from "axios";

const API_URL = "https://employee-management-system-production-ce83.up.railway.app/api/employees";

export const getEmployees = () => axios.get(API_URL);

export const addEmployee = (employeeData) =>
  axios.post(API_URL, employeeData);

export const deleteEmployee = (id) =>
  axios.delete(`${API_URL}/${id}`);

export const updateEmployee = (id, employeeData) =>
  axios.put(`${API_URL}/${id}`, employeeData);