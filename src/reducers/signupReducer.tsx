import { FormState } from '../components/Form/FormMessage';
import validate from '../util/validate';

export interface FormData {
	formState: FormState[];
	email: string;
	password: string;
	address: string;
	profile: string;
}

export interface SignupAction {
	type: 'SET_FIELD' | 'VALID_FIELD' | 'SUBMIT_FORM';
	value?: FormData;
}

const validForm = (state: FormData): FormData => {
	const errorMessages: FormState[] = [];
	const isEmailValid = validate.textFieldFormat('EMAIL', state.email);
	const isPasswordValid = validate.textFieldFormat('PASSWORD', state.password);

	if (!isEmailValid) {
		errorMessages.push('ERROR_EMAIL');
	}
	if (!isPasswordValid) {
		errorMessages.push('ERROR_PASSWORD');
	}

	if (errorMessages.length > 0) {
		return {
			...state,
			formState: errorMessages,
		};
	}

	return {
		...state,
		formState: [],
	};
};

const signupReducer = (state: FormData, action: SignupAction): FormData => {
	switch (action.type) {
		case 'SET_FIELD':
			if (!action.value) return state;
			return action.value;

		case 'VALID_FIELD': {
			const validationResult = validForm(state);
			return validationResult;
		}

		case 'SUBMIT_FORM': {
			// API 추가
			return {
				...state,
				formState: ['SUCCESS'],
			};
		}
	}
};

export default signupReducer;
