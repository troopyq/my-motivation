import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';

const api = axios.create({
	withCredentials: true,
	// baseURL: 'http://localhost:3000/api',
	baseURL: isProd ? '/api' : 'http://localhost:3000/api',
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
		'Access-Control-Allow-Origin': '*',
	},
});

api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});

export default api;
