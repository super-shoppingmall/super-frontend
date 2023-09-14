import { Link } from 'react-router-dom';
import SignupForm from '../layouts/Signup/SignupForm';

const Signup = () => {
	return (
		<div className='min-w-min px-10'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm mb-8'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-4'>
					회원가입
				</h2>
				<p className='my-4'>
					<span className='block text-gray-400 text-xs text-center'>
						혹시 판매자로 회원가입을 원하시는 경우, <br />
						<Link to='/signup/member' className='underline'>
							이곳
						</Link>
						을 클릭해 주세요.
					</span>
				</p>
			</div>
			<article className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
				<section className='mt-4'>
					<SignupForm />
				</section>
			</article>
		</div>
	);
};

export default Signup;
