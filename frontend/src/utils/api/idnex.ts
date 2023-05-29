import axios from 'axios';



const api = axios.create({
	withCredentials: true,
  proxy: {
    host: 'localhost',
    port: 8000,
  },

	baseURL: 'http://localhost:8000/api',
	headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});

export default api;
