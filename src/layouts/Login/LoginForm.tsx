import { useReducer } from 'react';

import InputField from '../../components/Form/InputField';
import FormMessage from '../../components/Form/FormMessage';
import ErrorIcon from '../../components/Icon/ErrorIcon';

import { AuthApi } from '../../api/api';
import loginReducer, { FormData } from '../../reducers/loginReducer';

const initialData: FormData = {
	formState: [],
	email: '',
	password: '',
	loginCount: 0,
};

const LoginForm = () => {
	const [formData, dispatchFormData] = useReducer(loginReducer, initialData);
	const formState = formData.formState;
	const loginCount = formData.loginCount;

	const addInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatchFormData({
			type: 'SET_FIELD',
			value: {
				...formData,
				[e.target.name]: e.target.value,
			},
		});
	};

	const validateForm = () => {
		dispatchFormData({ type: 'VALID_FIELD' });
	};

	const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formState.length > 0) return;
		try {
			const result = await AuthApi.login({ email: formData.email, password: formData.password });
			const loginCount = result === 'SUCCESS' ? 0 : formData.loginCount + 1;

			dispatchFormData({
				type: 'SUBMIT_FORM',
				value: { ...formData, loginCount, formState: [result] },
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<form className='relative' onSubmit={handleForm}>
				<div>
					<InputField theme='SECONDARY' id='email' label='이메일'>
						<input
							type='text'
							id='email'
							name='email'
							className='flex-1 input-text'
							placeholder='example@example.com'
							onChange={addInputField}
						/>
					</InputField>
					<FormMessage type='ERROR_EMAIL' isValid={!formState.includes('ERROR_EMAIL')} />
					<FormMessage
						type='ERROR_EMAIL_EMPTY'
						isValid={!formState.includes('ERROR_EMAIL_EMPTY')}
					/>
				</div>
				<div>
					<InputField theme='SECONDARY' id='password' label='비밀번호'>
						<input
							type='password'
							id='password'
							name='password'
							className='flex-1 input-text'
							placeholder='영문, 숫자, 특수문자 혼합 8 ~ 30자 비밀번호'
							onChange={addInputField}
						/>
					</InputField>
					<FormMessage
						type='ERROR_PASSWORD_EMPTY'
						isValid={!formState.includes('ERROR_PASSWORD_EMPTY')}
					/>
				</div>
				{loginCount >= 1 && loginCount < 5 && (
					<p className='h-10 pl-1 flex items-center gap-2 w-full text-red-600 text-xs'>
						<ErrorIcon />
						{`로그인 오류 ${loginCount}회.`}
						<br />
						5회 이상 로그인 오류 시 보안을 위해 로그인이 제한됩니다.
					</p>
				)}
				{loginCount >= 5 && (
					<p className='h-10 pl-1 flex items-center gap-2 w-full text-red-600 text-xs'>
						<ErrorIcon />
						5회 이상 로그인 오류로 보안을 위해 로그인이 제한됩니다. <br />
						아이디/비밀번호 찾기를 통해 이용 부탁드립니다.
					</p>
				)}
				<button
					className='w-full h-10 mt-4 px-6 font-400 rounded-lg bg-black text-white'
					type='submit'
					disabled={loginCount >= 5}
					onClick={validateForm}
				>
					로그인
				</button>
			</form>
		</>
	);
};

export default LoginForm;
