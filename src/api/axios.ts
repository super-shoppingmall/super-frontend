import axios from 'axios';

const axiosCustom = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: { 'Content-Type': 'application/json' },
});

axiosCustom.interceptors.request.use(
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

export default axiosCustom;
