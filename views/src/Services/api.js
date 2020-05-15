import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:44392',
  timeout: 5000,
});

export default api;
