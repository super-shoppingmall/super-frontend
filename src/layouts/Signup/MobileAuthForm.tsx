import { useNavigate } from 'react-router-dom';

const MobileAuthForm = () => {
	const navigate = useNavigate();
	const goToNextPage = () => {
		navigate('/signup/step1');
	};
	return (
		<>
			<div>
				<h2>휴대폰 번호를 입력해주세요</h2>
				<p className='text-gray-400 text-sm'>입력하신 번호로 인증번호가 전송됩니다.</p>
			</div>
			<form>
				<div>
					<label htmlFor='phone-number' className='sr-only'>
						휴대폰 번호
					</label>
					<div className='relative mt-2.5'>
						<div className='absolute inset-y-0 left-0 flex items-center'>
							<label htmlFor='carrier' className='sr-only'>
								통신사
							</label>
							<select
								id='carrier'
								name='carrier'
								className='h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm'
							>
								<option value='0'>SKT</option>
								<option value='1'>KT</option>
								<option value='2'>LG U+</option>
								<option value='3'>SKT 알뜰폰</option>
								<option value='4'>KT 알뜰폰</option>
								<option value='5'>LG U+ 알뜰폰</option>
							</select>
						</div>
						<input
							type='tel'
							name='phone'
							id='phone'
							autoComplete='tel'
							placeholder={`'-'를 제외한 숫자만 입력해주세요`}
							className='block w-full rounded-sm ring-1 ring-inset ring-gray-300 border-0 bg-transparent py-1.5 pl-44 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
						/>
					</div>
					<div>
						<input
							type='number'
							name='authNum'
							id='authNum'
							placeholder='인증번호'
							className='block w-full  rounded-sm mt-2 ring-1 ring-inset ring-gray-300 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
						/>
					</div>
					<button
						className='w-full h-10 mt-2 px-6 font-400 rounded-sm bg-black text-white cursor-pointer disabled:bg-gray-300 disabled:cursor-default'
						type='submit'
					>
						인증하기
					</button>
				</div>
			</form>
			<button
				// disabled
				className='w-full h-10 mt-12 px-6 font-400 rounded-sm bg-black text-white disabled:bg-gray-300 disabled:cursor-default'
				type='button'
				onClick={goToNextPage}
			>
				다음
			</button>
		</>
	);
};

export default MobileAuthForm;
