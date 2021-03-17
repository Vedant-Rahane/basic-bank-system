import axios from "axios";

const api = axios.create({
  baseURL: "https://basic-bank-system-project.herokuapp.com/api",
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
