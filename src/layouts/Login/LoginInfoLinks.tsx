import { Link } from 'react-router-dom';

const LoginInfoLinks = () => {
	return (
		<ul className='flex justify-center gap-4'>
			<li>
				<Link to=''>아이디 찾기</Link>
			</li>
			<li>
				<Link to=''>비밀번호 찾기</Link>
			</li>
			<li>
				<Link to=''>회원가입</Link>
			</li>
		</ul>
	);
};

export default LoginInfoLinks;
