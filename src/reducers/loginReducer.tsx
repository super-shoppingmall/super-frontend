import { FormState } from '../components/Form/FormMessage';
import validate from '../util/validate';

export interface FormData {
	formState: FormState[];
	email: string;
	password: string;
	token: string;
}

export interface LoginAction {
	type: 'SET_FIELD' | 'VALID_FIELD' | 'SUBMIT_FORM';
	value?: FormData;
}

function validForm(state: FormData): FormData {
	const errorMessages: FormState[] = [];
	const isEmailFilledIn = validate.textFieldNotEmpty(state.email);
	const isEmailValid = validate.textFieldFormat('EMAIL', state.email);
	const isPasswordFilledIn = validate.textFieldNotEmpty(state.password);

	if (!isEmailFilledIn && !isEmailValid) {
		errorMessages.push('ERROR_EMAIL_EMPTY');
	}

	if (isEmailFilledIn && !isEmailValid) {
		errorMessages.push('ERROR_EMAIL');
	}

	if (!isPasswordFilledIn) {
		errorMessages.push('ERROR_PASSWORD_EMPTY');
	}

	if (errorMessages.length > 0) {
		return {
			...state,
			formState: [errorMessages[0]],
		};
	}

	return {
		...state,
		formState: [],
	};
}

function loginReducer(state: FormData, action: LoginAction): FormData {
	switch (action.type) {
		case 'SET_FIELD':
			if (!action.value) return state;
			return action.value;

		case 'VALID_FIELD': {
			const validationResult = validForm(state);
			return validationResult;
		}

		case 'SUBMIT_FORM': {
			// return {
			// 	...state,
			// 	formState: ['ERROR_LOGIN'],
			// };
			// API 추가
			return {
				...state,
				token: 'khsdfksdhfkshkhfk',
				formState: ['SUCCESS'],
			};
		}
	}
}

export default loginReducer;
