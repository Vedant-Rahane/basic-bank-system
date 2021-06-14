import axios from "axios";
require("dotenv").config();

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getAllUsers = () => api.get(`/users`);
export const getUserById = (id) => api.get(`/user/${id}`);
export const updateUser = (id, transaction) =>
  api.patch(`/user/${id}`, transaction);

const apis = {
  getAllUsers,
  getUserById,
  updateUser,
};

export default apis;
