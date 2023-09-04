import { Outlet } from 'react-router-dom';

const Signup = () => {
	return (
		<div className='min-w-min px-10'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm mb-8'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-4'>
					회원가입
				</h2>
			</div>
			<article className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
				<section className='mt-4'>
					<Outlet />
				</section>
			</article>
		</div>
	);
};

export default Signup;
