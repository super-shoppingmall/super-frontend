import Input from '../../components/Input/Input';

const LoginForm = () => {
	return (
		<form className='space-y-4'>
			<Input
				id='id'
				label='아이디 입력'
				onChange={() => {
					console.log('ddd');
				}}
			/>
			<Input
				id='password'
				type='password'
				label='비밀번호 입력'
				onChange={() => {
					console.log('ddd');
				}}
			/>
			<button className='w-full h-10 px-6 font-400 rounded-lg bg-black text-white' type='submit'>
				로그인
			</button>
		</form>
	);
};

export default LoginForm;
