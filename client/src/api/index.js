import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getAllUsers = () => api.get(`/users`);
export const getUserById = (id) => api.get(`/user/${id}`);

const apis = {
  getAllUsers,
  getUserById,
};

export default apis;
