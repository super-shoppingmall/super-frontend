import { AxiosError } from 'axios';
import { SignupForm } from '../interface/request';
import axiosCustom from './axios';

export const AuthApi = {
	sendOAuthInfo: (code: string, state: string) =>
		axiosCustom.post('/api/oauth2', JSON.stringify({ code, state })),
	login: async (email: string, password: string) => {
		const response = await axiosCustom.post('/api/auth/login', { email, password });
		return response;
	},
	signup: async (formData: SignupForm) => {
		try {
			const response = await axiosCustom.post('/api/auth/signup', JSON.stringify(formData), {
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.status !== 200) throw Error();
			localStorage.setItem('SUPER_TOKEN', response.data);
			localStorage.setItem('SUPER_ID', formData.email.split('@')[0]);
			window.location.href = '/';
		} catch (error: unknown) {
			const axiosError = error as AxiosError;
			const status = axiosError.response?.status;
			switch (status) {
				case 400:
					alert('동일한 이메일이 존재합니다.\n로그인 후 이용 부탁드립니다.');
					break;
				default:
					break;
			}
		}
	},
};
