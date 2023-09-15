import { Link } from 'react-router-dom';

const LoginInfoLinks = () => {
	return (
		<ul className='flex justify-center items-center gap-2'>
			<li className='flex items-center'>
				<Link to=''>아이디 찾기</Link>
				<div className='inline-block w-px h-full min-h-[0.7em] bg-gray-300 ml-2' aria-hidden></div>
			</li>
			<li className='flex items-center'>
				<Link to=''>비밀번호 찾기</Link>
				<div className='inline-block w-px h-full min-h-[0.7em] bg-gray-300 ml-2' aria-hidden></div>
			</li>
			<li className='flex items-center'>
				<Link to='/signup'>회원가입</Link>
			</li>
		</ul>
	);
};

export default LoginInfoLinks;
