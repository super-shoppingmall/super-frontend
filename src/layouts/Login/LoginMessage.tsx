interface LoginMessage {
	type?: string;
	message: string;
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

const LoginMessage = ({ type = 'ERROR', message }: LoginMessage) => {
	const textColor = type === 'ERROR' ? 'text-red-600' : 'text-blue-600';
	return (
		<p className={`absolute bottom-12 pl-1 flex items-center gap-2 w-full ${textColor} text-xs`}>
			{type === 'ERROR' && <IconError />}
			{message}
		</p>
	);
};

export default LoginMessage;
