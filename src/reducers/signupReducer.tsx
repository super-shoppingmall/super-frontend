import { validateTextField } from '../util/validate';

export type SignupState =
	| ''
	| 'ERROR_EMAIL'
	| 'ERROR_EMAIL_UNIQUE'
	| 'ERROR_PASSWORD'
	| 'ERROR_PASSWORD_CONFIRM'
	| 'SUCCESS';

export interface FormData {
	formState: SignupState[];
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
	const errorMessages: SignupState[] = [];
	const isEmailValid = validateTextField('EMAIL', state.email);
	const isPasswordValid = validateTextField('PASSWORD', state.password);

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
