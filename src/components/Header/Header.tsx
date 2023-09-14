import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import Logo from '../../assets/logo.png';

const Header = () => {
	const { isLogin, logout } = useContext(AuthContext);

	const gnbLists = [
		{
			link: '/productList/food',
			name: '사료',
		},
		{
			link: '/productList/snack',
			name: '간식',
		},
		{
			link: '/productList/all',
			name: '전체용품',
		},
		{
			link: '/productList/healthfood',
			name: '건강식품',
		},
	];

	return (
		<header>
			<div className='max-w-[1200px] mx-auto'>
				<nav className='bg-white border-gray-200 px-6 py-2.5 dark:bg-gray-800'>
					<div className='flex justify-between items-center mx-auto max-w-screen-xl'>
						<Link to='/' className='flex items-center'>
							<img src={Logo} alt='슈퍼 펫' className='w-8 mr-2' />
							<span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
								SUPER PET
							</span>
						</Link>
						<div className='flex items-center order-2'>
							{isLogin ? (
								<ul className='flex font-medium text-sm'>
									<li>
										<span className='user-list'>
											<span className='font-semibold'>ooo님!</span> 환영합니다.
										</span>
									</li>
									<li>
										<Link to='/cart' className='user-list'>
											장바구니
										</Link>
									</li>
									<li>
										<button type='button' className='user-list' onClick={logout}>
											로그아웃
										</button>
									</li>
								</ul>
							) : (
								<ul className='flex font-medium text-sm'>
									<li>
										<Link to='/cart' className='user-list'>
											장바구니
										</Link>
									</li>
									<li>
										<Link to='/login' className='user-list'>
											로그인
										</Link>
									</li>
									<li>
										<Link to='/signup' className='user-list text-blue-600'>
											회원가입
										</Link>
									</li>
								</ul>
							)}
						</div>
						<div>
							<ul className='flex font-medium space-x-8'>
								{gnbLists.map(gnbList => (
									<li key={gnbList.name}>
										<Link to={gnbList.link} className='gnb-list'>
											{gnbList.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
