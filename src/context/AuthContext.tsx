import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
	isLogin: false,
	login: (token: string) => {
		token;
	},
	logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(false);

	const handleLogin = (token: string) => {
		localStorage.setItem('SUPER_TOKEN', token);
		setIsLogin(true);
	};

	const handleLogout = () => {
		localStorage.removeItem('SUPER_TOKEN');
		setIsLogin(false);
		navigate('/');
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
