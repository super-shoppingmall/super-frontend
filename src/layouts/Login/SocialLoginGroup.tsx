import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import IconNaver from '../../assets/ic-naver.svg';
import IconGoogle from '../../assets/ic-google.svg';
import IconKakao from '../../assets/ic-kakao.svg';
import ButtonImage from '../../components/Button/ImageButton';

const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const CALLBACK_URL = process.env.REACT_APP_NAVER_CALLBACK_URL;
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}&state=flase`;

const SocialLoginGroup = () => {
	const [searchParams] = useSearchParams();
	const code = searchParams.get('code') || '';
	const state = searchParams.get('state') || '';

	const loginLists = [
		{
			imageLink: IconNaver,
			text: '네이버로 간편 로그인하기',
			onClick: () => (window.location.href = NAVER_AUTH_URL),
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

	useEffect(() => {
		if (code.length <= 0 || state.length <= 0) return;
		// NOTE: 추후 토큰 발행을 위한 백엔드 API 적용 예정
	}, [code, state]);

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
