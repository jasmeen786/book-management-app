import axios from 'axios';

const API_URL = 'http://localhost:7000';

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.success) {
    localStorage.setItem('token', response.data.token); 
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const getToken = () => {
  return localStorage.getItem('token');
};

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export default { login, logout, getToken, isAuthenticated };
