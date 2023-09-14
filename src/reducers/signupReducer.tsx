import { AuthApi } from '../api/api';
import { FormState } from '../components/Form/FormMessage';
import validate from '../util/validate';

export type FormTextField = 'EMAIL' | 'PASSWORD' | 'PWD_CONFIRM' | 'PHONE';

export interface FormData {
	formState: FormState[];
	email: string;
	password: string;
	passwordConfirm: string;
	passwordValid: null | boolean;
	gender: string;
	phone: string;
	address: string;
	addressDetail: string;
	profileImage: string;
	aboutMe: string;
}

export interface SignupAction {
	type: 'SET_FIELD' | 'VALID_FIELD' | 'VALID_SINGLE_FIELD' | 'SUBMIT_FORM';
	value?: FormData;
	fieldType?: FormTextField;
}

const getField = (type: string, state: FormData) => {
	const FieldMap: { [key: string]: string } = {
		EMAIL: state.email,
		PASSWORD: state.password,
		PWD_CONFIRM: state.passwordConfirm,
		PHONE: state.phone,
	};
	return FieldMap[type];
};

const validSingleField = (state: FormData, fieldType: FormTextField) => {
	const errorMessages: FormState[] = [];
	const field = getField(fieldType, state);
	const isNotEmpty = validate.textFieldNotEmpty(field);
	if (!isNotEmpty) errorMessages.push(`ERROR_${fieldType}_EMPTY`);
	let isValid: boolean;

	if (fieldType !== 'PWD_CONFIRM') {
		isValid = validate.textFieldFormat(fieldType, field);
	} else {
		isValid = state.password === state.passwordConfirm;
	}

	if (!isValid && isNotEmpty) errorMessages.push(`ERROR_${fieldType}`);
	return errorMessages;
};

const validForm = (state: FormData): FormData => {
	let errorMessages: FormState[] = [];
	const emailErrMessages = validSingleField(state, 'EMAIL');
	const passwordErrMessages = validSingleField(state, 'PASSWORD');
	const passwordConfirmErrMessages = validSingleField(state, 'PWD_CONFIRM');
	const phoneErrMessages = validSingleField(state, 'PHONE');

	errorMessages = [
		...emailErrMessages,
		...passwordErrMessages,
		...passwordConfirmErrMessages,
		...phoneErrMessages,
	];

	if (errorMessages.length > 0) {
		return {
			...state,
			passwordValid: state.password === state.passwordConfirm,
			formState: errorMessages,
		};
	}

	return {
		...state,
		passwordValid: true,
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

		case 'VALID_SINGLE_FIELD': {
			if (!action.fieldType) return state;
			const type = action.fieldType;
			const filteredMessages = state.formState.filter(state => !state.includes(type));
			const newMessages = validSingleField(state, type);

			return { ...state, formState: [...filteredMessages, ...newMessages] };
		}

		case 'SUBMIT_FORM': {
			const URL = location.pathname.includes('member') ? '/api/members/signup' : '/api/auth/login';

			const formData = {
				aboutMe: state.aboutMe,
				address: `${state.address} ${state.addressDetail}`,
				email: state.email,
				gender: state.gender,
				password: state.password,
				passwordValid: true,
				phone: state.phone,
				profileImage: state.profileImage,
			};

			AuthApi.signup(URL, formData);

			return {
				...state,
				formState: ['ERROR_LOGIN'],
			};
		}
	}
};

export default signupReducer;
