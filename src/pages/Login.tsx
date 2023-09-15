import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import LoginForm from '../layouts/Login/LoginForm';
import LoginInfoLinks from '../layouts/Login/LoginInfoLinks';
import SocialLoginGroup from '../layouts/Login/SocialLoginGroup';

const Login = () => {
	const [key, setKey] = useState(0);
	const navigate = useNavigate();
	const { isLogin } = useContext(AuthContext);

	useEffect(() => {
		if (isLogin) {
			navigate('/');
		}
	}, []);

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

			<article className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
				<section className='mt-4'>
					<LoginForm key={key} />
				</section>
				<section className='mt-4'>
					<LoginInfoLinks />
				</section>
				<p className='my-4'>
					<span className='block text-gray-400 text-xs text-center'>
						혹시 판매자로 로그인을 원하시는 경우, <br />
						<Link to='/login/member' className='underline' onClick={() => setKey(key + 1)}>
							이곳
						</Link>
						을 클릭해 주세요.
					</span>
				</p>
				<section className='mt-14'>
					<h3 className='flex items-center mb-4'>
						<div className='flex-grow bg bg-gray-300 h-[0.02em]'></div>
						<div className='flex-grow-0 mx-5 text dark:text-white'>SNS 계정으로 로그인</div>
						<div className='flex-grow bg bg-gray-300 h-[0.02em]'></div>
					</h3>
					<SocialLoginGroup />
				</section>
			</article>
		</div>
	);
};

export default Login;
