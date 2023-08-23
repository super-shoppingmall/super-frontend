import Input from '../components/Input/Input';

const Login = () => {
	return (
		<div>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					로그인
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form className='space-y-4'>
					<Input
						id='id'
						label='아이디'
						onChange={() => {
							console.log('ddd');
						}}
					/>
					<Input
						id='password'
						type='password'
						label='패스워드'
						onChange={() => {
							console.log('ddd');
						}}
					/>
					<button
						className='w-full h-10 px-6 font-400 rounded-md bg-black text-white'
						type='submit'
					>
						로그인
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
