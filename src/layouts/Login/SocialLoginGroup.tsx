import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import IconNaver from '../../assets/ic-naver.svg';
import IconKakao from '../../assets/ic-kakao.svg';
import ButtonImage from '../../components/Button/ImageButton';
import { AuthApi } from '../../api/api';

const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
const CALLBACK_URL = process.env.REACT_APP_OAUTH_CALLBACK_URL;

const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${CALLBACK_URL}&state=test_naver`;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${CALLBACK_URL}&state=test_kakao`;

const SocialLoginGroup = () => {
	const [searchParams] = useSearchParams();
	const code = searchParams.get('code') || '';
	const state = searchParams.get('state') || '';

	const openOAuth = (url: string) => (window.location.href = url);

	const loginLists = [
		{
			imageLink: IconNaver,
			text: '네이버로 간편 로그인하기',
			onClick: () => openOAuth(NAVER_AUTH_URL),
		},
		{
			imageLink: IconKakao,
			text: '카카오로 간편 로그인하기',
			onClick: () => openOAuth(KAKAO_AUTH_URL),
		},
	];

	useEffect(() => {
		if (code.length <= 0 || state.length <= 0) return;
		AuthApi.sendOAuthInfo(code, state);
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
