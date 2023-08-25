import { FormData, FormValidationField, LoginFormAction } from '../interface/login';

const formInitialData: FormData = {
	state: 'IDLE',
	email: '',
	password: '',
	validation: { isValid: false, message: '' },
};

function validForm(type: FormValidationField, value: FormData) {
	if (type === 'EMAIL') {
		return {
			...value,
			validation: { isValid: value.email.includes('@'), message: '아이디를 확인해 주세요' },
		};
	} else {
		return {
			...value,
			validation: { isValid: value.password.length > 0, message: '비밀번호를 확인해 주세요' },
		};
	}
}

function loginFormReducer(state: FormData, action: LoginFormAction): FormData {
	switch (action.type) {
		case 'FORM_CHANGE': {
			if (!action.value) return state;
			return action.value;
		}
		case 'FORM_VALIDATION': {
			const emailValidation = validForm('EMAIL', state);
			const passwordValidation = validForm('PASSWORD', state);
			if (!emailValidation) return { ...state, validation: emailValidation };
			if (!passwordValidation) return { ...state, validation: passwordValidation };
			return { ...state, validation: { isValid: true, message: '' } };
		}
		case 'FORM_SUBMIT_PENDING': {
			return { ...state, state: 'LOADING' };
		}
		case 'FORM_SUBMIT': {
			// API-CALL
			return formInitialData;
		}
		default: {
			return state;
		}
	}
}

export { formInitialData, loginFormReducer };
