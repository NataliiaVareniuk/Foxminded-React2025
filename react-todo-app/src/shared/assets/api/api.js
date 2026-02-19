const API_BASE_URL = 'https://react-todo-api-vn-demo.onrender.com';
import axios from 'axios';

export const getTodoList = async () => {
  const response = await axios.get(`${API_BASE_URL}/tasks`, {});
  return response.data;
};

export const postTodoItem = async (todo) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, todo);
  return response.data;
};

export const updateTodoItem = async (updatedTask) => {
  const response = await axios.put(
    `${API_BASE_URL}/tasks/${updatedTask.id}`,
    updatedTask,
  );
  return response.data;
};

export const deleteTodoItem = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  return response.data;
};

export const deleteAllTodos = async () => {
  const response = await axios.delete(`${API_BASE_URL}/tasks/`);
  return response.data;
};

