export type FormState = 'IDLE' | 'ERROR' | 'SUCCESS';
export type FormValidationField = 'EMAIL' | 'PASSWORD';

export interface FormData {
	state: FormState;
	stateMessage: string;
	email: string;
	password: string;
}

export interface LoginFormAction {
	type: 'FORM_CHANGE' | 'FORM_SUBMIT' | 'FORM_RESET';
	value?: FormData;
}
