import axios from 'axios';

const axiosCustom = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: { 'Content-Type': 'application/json' },
});

axiosCustom.interceptors.request.use(
	config => {
		const storedToken = localStorage.getItem('SUPER_TOKEN');
		if (!storedToken) return config;
		const token = JSON.parse(storedToken);
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

export default axiosCustom;
