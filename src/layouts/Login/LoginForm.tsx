import { useReducer } from 'react';
import Input from '../../components/Input/Input';
import { formInitialData, loginFormReducer } from '../../reducers/loginReducer';

const LoginForm = () => {
	const [formData, dispatchFormData] = useReducer(loginFormReducer, formInitialData);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatchFormData({
			type: 'FORM_CHANGE',
			value: { ...formData, [e.target.name]: e.target.value },
		});
	};

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatchFormData({ type: 'FORM_VALIDATION' });

		if (!formData.validation.isValid) {
			// NOTE: message 출력
			return;
		}

		dispatchFormData({ type: 'FORM_SUBMIT_PENDING' });
		dispatchFormData({ type: 'FORM_SUBMIT' });
	};

	return (
		<>
			<form className='space-y-4' onSubmit={handleSubmitForm}>
				<Input
					id='email'
					type='email'
					label='이메일 입력'
					value={formData.email}
					onChange={handleChangeInput}
				/>
				<Input
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
			{formData.state === 'LOADING' && <div>로딩중 ...</div>}
		</>
	);
};

export default LoginForm;
