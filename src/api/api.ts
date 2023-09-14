import { AxiosError } from 'axios';
import { LoginForm, SignupForm } from '../interface/request';
import axiosCustom from './axios';

const addUserInfo = (token: string, email: string) => {
	localStorage.setItem('SUPER_TOKEN', token);
	localStorage.setItem('SUPER_ID', email.split('@')[0]);
	location.href = '/';
};

export const AuthApi = {
	sendOAuthInfo: async (code: string, state: string) => {
		try {
			const response = await axiosCustom.post('/api/oauth2', JSON.stringify({ code, state }));
			if (response.status !== 200) throw Error();
		} catch (error: unknown) {
			alert('해당 서비스는 준비중입니다.');
			window.location.href = '/login';
		}
	},
	login: async (URL: string, formData: LoginForm) => {
		try {
			const response = await axiosCustom.post(URL, JSON.stringify(formData));
			if (response.status !== 200) throw Error();
			const data = await response.data;
			console.log(data);
			addUserInfo(data.token, data.username);
			return 'SUCCESS';
		} catch (error: unknown) {
			return 'ERROR_LOGIN';
		}
	},
	signup: async (URL: string, formData: SignupForm) => {
		try {
			const response = await axiosCustom.post(URL, JSON.stringify(formData));
			if (response.status !== 200) throw Error();
			console.log(response);
			const token = response.data;
			const email = formData.email;
			addUserInfo(token, email);
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
