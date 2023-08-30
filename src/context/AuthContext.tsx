import { PropsWithChildren, createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
	isLogin: false,
	login: (token: string) => {
		token;
	},
	logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [isLogin, setIsLogin] = useState(false);

	const handleLogin = (token: string) => {
		localStorage.setItem('SUPER_TOKEN', token);
		setIsLogin(true);
	};

	const handleLogout = () => {
		localStorage.setItem('SUPER_TOKEN', '');
		setIsLogin(false);
	};

	useEffect(() => {
		const tokenInStorage = localStorage.getItem('SUPER_TOKEN') || '';

		if (tokenInStorage.length > 0) {
			setIsLogin(true);
		} else {
			setIsLogin(false);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ isLogin, login: handleLogin, logout: handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};
