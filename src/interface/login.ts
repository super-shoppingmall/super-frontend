export type FormState = 'IDLE' | 'LOADING' | 'ERROR' | 'SUCCESS';
export type FormValidationField = 'EMAIL' | 'PASSWORD';

export interface FormData {
	state: FormState;
	email: string;
	password: string;
	validation: { isValid: boolean; message: string };
}

export interface LoginFormAction {
	type: 'FORM_CHANGE' | 'FORM_VALIDATION' | 'FORM_SUBMIT' | 'FORM_SUBMIT_PENDING';
	value?: FormData;
}
