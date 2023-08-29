import { FormData, FormValidationField, LoginFormAction } from '../interface/login';

const formInitialData: FormData = {
	state: 'IDLE',
	stateMessage: '',
	email: '',
	password: '',
};

function validForm(type: FormValidationField, value: FormData): FormData {
	if (type === 'EMAIL') {
		const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
		const isEmailEmpty = value.email.length <= 0;
		const isEmailValid = emailRegex.test(value.email);

		if (isEmailEmpty) {
			return {
				...value,
				state: 'ERROR_VALIDATION',
				stateMessage: 'EMPTY_EMAIL',
			};
		}

		return {
			...value,
			state: isEmailValid ? 'SUCCESS' : 'ERROR_VALIDATION',
			stateMessage: 'ERROR_EMAIL',
		};
	} else {
		const passwordRegex =
			/^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{8,30}$/gm;
		const isPasswordEmpty = value.password.length <= 0;
		const isPasswordValid = passwordRegex.test(value.password);

		if (isPasswordEmpty) {
			return {
				...value,
				state: 'ERROR_VALIDATION',
				stateMessage: 'EMPTY_PASSWORD',
			};
		}

		return {
			...value,
			state: isPasswordValid ? 'SUCCESS' : 'ERROR_SUBMIT',
			stateMessage: 'ERROR_LOGIN',
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
			if (email.state === 'ERROR_VALIDATION') return email;

			const password = validForm('PASSWORD', state);
			if (password.state === 'ERROR_SUBMIT') return password;

			// NOTE: API 추가 필요.
			// return { ...state, state: 'ERROR_SUBMIT', stateMessage: 'ERROR_LOGIN' };
			return { ...state, state: 'SUCCESS', stateMessage: 'SUCCESS_LOGIN' };
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
