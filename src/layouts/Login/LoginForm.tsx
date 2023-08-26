import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { formInitialData, loginFormReducer } from '../../reducers/loginReducer';
import FormField from './FormField';
import Spinner from '../../components/Spinner/Spinner';

const LoginForm = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, dispatchFormData] = useReducer(loginFormReducer, formInitialData);
	const [submitCount, setSubmitCount] = useState(1);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatchFormData({
			type: 'FORM_CHANGE',
			value: { ...formData, [e.target.name]: e.target.value },
		});
	};

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (submitCount > 5) {
			alert('5번으로 계정 제한');
			return;
		}
		setIsLoading(true);
		dispatchFormData({ type: 'FORM_SUBMIT' });
		setSubmitCount(prevSubmitCount => prevSubmitCount + 1);
	};

	useEffect(() => {
		if (formData.state === 'SUCCESS') {
			setIsLoading(false);
			setSubmitCount(1);
			dispatchFormData({ type: 'FORM_RESET' });
			alert(formData.stateMessage);
			navigate('/');
		}

		if (formData.state === 'ERROR') {
			setIsLoading(false);
		}
	}, [submitCount]);

	return (
		<>
			<form className='space-y-4' onSubmit={handleSubmitForm}>
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
				<button className='w-full h-10 px-6 font-400 rounded-lg bg-black text-white' type='submit'>
					로그인
				</button>
			</form>
			{isLoading && <Spinner />}
			{formData.state === 'ERROR' && <div style={{ color: 'red' }}>{formData.stateMessage}</div>}
		</>
	);
};

export default LoginForm;
