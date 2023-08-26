import { FormData, FormValidationField, LoginFormAction } from '../interface/login';

const formInitialData: FormData = {
	state: 'IDLE',
	stateMessage: '',
	email: '',
	password: '',
};

function validForm(type: FormValidationField, value: FormData): FormData {
	if (type === 'EMAIL') {
		const isEmailValid = value.email.includes('@');
		return {
			...value,
			state: isEmailValid ? 'SUCCESS' : 'ERROR',
			stateMessage: '아이디를 확인해 주세요',
		};
	} else {
		const isPasswordValid = value.password.length > 0;

		return {
			...value,
			state: isPasswordValid ? 'SUCCESS' : 'ERROR',
			stateMessage: '비밀번호를 확인해 주세요',
		};
	}
}

function loginFormReducer(state: FormData, action: LoginFormAction): FormData {
	switch (action.type) {
		case 'FORM_CHANGE': {
			if (!action.value) return state;
			return action.value;
		}
		case 'FORM_SUBMIT': {
			const email = validForm('EMAIL', state);
			if (email.state === 'ERROR') return email;

			const password = validForm('PASSWORD', state);
			if (password.state === 'ERROR') return password;

			return { ...state, state: 'SUCCESS', stateMessage: '로그인이 완료되었습니다.' };
		}
		case 'FORM_RESET': {
			return formInitialData;
		}
		default: {
			return state;
		}
	}
}

export { formInitialData, loginFormReducer };
