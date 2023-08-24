import IconNaver from '../../assets/ic-naver.svg';
import IconGoogle from '../../assets/ic-google.svg';
import IconKakao from '../../assets/ic-kakao.svg';

import ButtonImage from '../../components/Button/ImageButton';

const SocialLoginGroup = () => {
	const loginLists = [
		{
			imageLink: IconNaver,
			text: '네이버로 간편 로그인하기',
			onClick: () => {
				console.log('네이버');
			},
		},
		{
			imageLink: IconGoogle,
			text: '구글로 간편 로그인하기',
			onClick: () => {
				console.log('구글');
			},
		},
		{
			imageLink: IconKakao,
			text: '카카오로 간편 로그인하기',
			onClick: () => {
				console.log('카카오');
			},
		},
	];

	return (
		<ul className='flex justify-center gap-x-2.5'>
			{loginLists.map((loginList, index) => (
				<li className='w-14 h-14 rounded-ful' key={index}>
					<ButtonImage {...loginList} />
				</li>
			))}
		</ul>
	);
};

export default SocialLoginGroup;
