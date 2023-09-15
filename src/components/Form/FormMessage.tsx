export type FormState =
	| ''
	| 'ERROR_EMAIL'
	| 'ERROR_EMAIL_UNIQUE'
	| 'ERROR_EMAIL_EMPTY'
	| 'ERROR_PASSWORD'
	| 'ERROR_PWD_CONFIRM'
	| 'ERROR_PWD_CONFIRM_EMPTY'
	| 'ERROR_PASSWORD_EMPTY'
	| 'ERROR_PHONE'
	| 'ERROR_PHONE_EMPTY'
	| 'ERROR_REQUIRED'
	| 'ERROR_LOGIN'
	| 'SUCCESS';

interface FormMessage {
	isValid: boolean;
	type: FormState;
}

interface ErrorMessages {
	[key: string]: string;
}

const FormMessage = ({ isValid, type }: FormMessage) => {
	if (isValid) return null;

	const errorMessages: ErrorMessages = {
		ERROR_EMAIL: '이메일을 형식에 맞게 입력해 주세요.',
		ERROR_EMAIL_UNIQUE: '이메일 중복 확인을 진행해 주세요.',
		ERROR_EMAIL_EMPTY: '이메일을 입력해 주세요.',
		ERROR_PASSWORD: '영문, 숫자, 특수문자를 포함한 8 ~ 30자 비밀번호를 입력해주세요.',
		ERROR_PASSWORD_EMPTY: '비밀번호를 입력해 주세요.',
		ERROR_PWD_CONFIRM: '비밀번호가 일치하지 않습니다',
		ERROR_PWD_CONFIRM_EMPTY: '확인을 위해 비밀번호를 한번 더 입력해 주세요.',
		ERROR_PHONE: "핸드폰 번호를 정확히 입력 했는지 확인해 주세요. ('-' 제외 숫자만)",
		ERROR_PHONE_EMPTY: '핸드폰 번호를 입력해 주세요.',
		ERROR_REQUIRED: '필수 입력 사항입니다.',
		ERROR_LOGIN: '이메일 또는 비밀번호를 잘못입력했습니다.',
	};

	const message = errorMessages[type];

	return <span className='block mt-0.5 ml-0.5 text-xs text-red-500'>{message}</span>;
};

export default FormMessage;
