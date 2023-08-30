import { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { formInitialData, loginFormReducer } from '../../reducers/loginReducer';
import FormField from './FormField';
import Spinner from '../../components/Spinner/Spinner';
import LoginMessage from './LoginMessage';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, dispatchFormData] = useReducer(loginFormReducer, formInitialData);
	const [submitCount, setSubmitCount] = useState(0);
	const [loginCount, setLoginCount] = useState(0);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatchFormData({
			type: 'FORM_CHANGE',
			value: { ...formData, [e.target.name]: e.target.value },
		});
	};

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (loginCount > 3) {
			alert('5회 이상 로그인 오류로 \n보안을 위해 로그인이 제한됩니다.');
			setLoginCount(5);
			return;
		}
		setIsLoading(true);
		dispatchFormData({ type: 'FORM_SUBMIT' });
		setSubmitCount(prevC => prevC + 1);
	};

	useEffect(() => {
		setIsLoading(false);

		switch (formData.stateMessage) {
			case 'SUCCESS_LOGIN':
				login('ksdjkfjwojfojwoD12fjlsgjlL');
				setLoginCount(1);
				dispatchFormData({ type: 'FORM_RESET' });
				navigate('/');
				break;
			case 'ERROR_LOGIN':
				setLoginCount(prevLoginCount => prevLoginCount + 1);
				break;
			default:
				break;
		}
	}, [submitCount, formData.stateMessage]);

	return (
		<>
			<form className='relative' onSubmit={handleSubmitForm}>
				<FormField
					id='email'
					type='email'
					label='이메일 입력'
					value={formData.email}
					onChange={handleChangeInput}
				/>
				<FormField
					id='password'
					type='password'
					label='비밀번호 입력'
					value={formData.password}
					onChange={handleChangeInput}
				/>
				{formData.state === 'ERROR_VALIDATION' && <LoginMessage state={formData.stateMessage} />}
				{formData.state === 'ERROR_SUBMIT' && (
					<LoginMessage type='ERROR_SUBMIT' state={formData.stateMessage} count={loginCount} />
				)}
				<button
					className='w-full h-10 mt-12 px-6 font-400 rounded-lg bg-black text-white'
					type='submit'
				>
					로그인
				</button>
			</form>
			{isLoading && <Spinner />}
		</>
	);
};

export default LoginForm;
