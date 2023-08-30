import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
	const { isLogin, logout } = useContext(AuthContext);

	return (
		<header className='flex'>
			<h2 className='font-extrabold mr-2'>임시헤더</h2>
			{isLogin ? (
				<button type='button' onClick={logout} className='bg-red-300'>
					로그아웃
				</button>
			) : (
				<Link to='/login' className='bg-red-300'>
					로그인
				</Link>
			)}
		</header>
	);
};

export default Header;
