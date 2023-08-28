import Input from '../components/Input/Input';
import LoginInfoLinks from '../layouts/Login/LoginInfoLinks';
import SocialLoginGroup from '../layouts/Login/SocialLoginGroup';

const Login = () => {
	return (
		<div className='min-w-min px-10'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm mb-8'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-4'>
					로그인
				</h2>
				<p className='text-center'>
					슈퍼 쇼핑몰에 오신 것을 환영합니다. <br />
					아이디와 비밀번호를 입력해 주세요.
				</p>
			</div>

			<article className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm space-y-4'>
				<section>
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
						<button
							className='w-full h-10 px-6 font-400 rounded-lg bg-black text-white'
							type='submit'
						>
							로그인
						</button>
					</form>
				</section>
				<section>
					<LoginInfoLinks />
				</section>
				<section>
					<h3 className='flex items-center mb-4'>
						<div className='flex-grow bg bg-gray-300 h-px'></div>
						<div className='flex-grow-0 mx-5 text dark:text-white'>SNS 계정으로 로그인</div>
						<div className='flex-grow bg bg-gray-300 h-px'></div>
					</h3>
					<SocialLoginGroup />
				</section>
			</article>
		</div>
	);
};

export default Login;
