import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userData.id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with id ${userData.id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error;
  }
};