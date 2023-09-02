import axiosCustom from './axios';

export const LoginApi = {
	sendOAuthInfo: (code: string, state: string) =>
		axiosCustom.get(`/token?code=${code}&state=${state}`),
};
