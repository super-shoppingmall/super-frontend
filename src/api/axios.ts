import axios from 'axios';

const http = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(
	config => {
		const token = localStorage.getItem('SUPER_TOKEN');
		if (!token) return config;
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if (error.response.status === 401) {
			alert('보안을 위해 로그인을 다시 해주세요!');
			location.href = '/';
		}
		return error;
	}
);

export default http;
