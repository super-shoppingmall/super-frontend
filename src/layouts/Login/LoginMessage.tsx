interface LoginMessage {
	type?: string;
	state: string;
	count?: number;
}

const IconError = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			fill='currentColor'
			aria-hidden='true'
			className='w-4'
		>
			<path
				fillRule='evenodd'
				d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z'
				clipRule='evenodd'
			></path>
		</svg>
	);
};

const message: { [key: string]: string } = {
	EMPTY_EMAIL: '이메일을 입력해 주세요.',
	EMPTY_PASSWORD: '비밀번호를 입력해 주세요.',
	ERROR_EMAIL: '이메일 형식에 맞게 입력해 주세요.',
	ERROR_LOGIN: '5회 이상 로그인 오류 시 보안을 위해 로그인이 제한됩니다.',
	SUCCESS_LOGIN: '',
};

const LoginMessage = ({ type = 'ERROR_VALIDATION', state, count }: LoginMessage) => {
	const textColor = type.includes('ERROR') ? 'text-red-600' : 'text-blue-600';
	return (
		<p
			className={`absolute bottom-11 h-10 pl-1 flex items-center gap-2 w-full ${textColor} text-xs`}
		>
			{type.includes('ERROR') && <IconError />}
			{count && `로그인 오류 ${count}회.`}
			{type === 'ERROR_SUBMIT' && <br />}
			{message[state]}
		</p>
	);
};

export default LoginMessage;
