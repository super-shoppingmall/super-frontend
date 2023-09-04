import FormField from '../../components/Form/FormField';

const SignupForm = () => {
	return (
		<>
			<div>
				<h2>건강한 반려 생활의 시작, 슈퍼 쇼핑몰</h2>
				<p className='text-gray-400 text-sm'>빠르게 가입하고 웰컴 혜택 받으세요!</p>
			</div>
			<form className='relative' onSubmit={() => {}}>
				<FormField
					id='email'
					type='email'
					label='example@example.com'
					value={''}
					onChange={() => {}}
				/>
				<FormField
					id='password'
					type='password'
					label='영문/숫자/특수문자 혼합8~30자'
					value={''}
					onChange={() => {}}
				/>
				<FormField
					id='password_check'
					type='password'
					label='비밀번호를 한번 더 입력해주세요!'
					value={''}
					onChange={() => {}}
				/>
				<div className='flex rounded-sm mt-2 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md py-1 px-2'>
					<input
						placeholder='주소입력'
						type='text'
						className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus:outline-none cursor-pointer'
						onClick={() => {}}
					/>
				</div>
				<div className='col-span-full'>
					<label htmlFor='photo' className='sr-only'>
						프로필
					</label>
					<div className='mt-2  w-full gap-x-3'>
						<label htmlFor='userProfile' className='cursor-pointer'>
							<input type='file' name='userProfile' id='userProfile' className='sr-only' />
							<span className='flex items-center  w-full rounded-sm bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
								<svg
									className='w-8 h-8 mr-2'
									fill='currentColor'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
								>
									<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
								</svg>
								프로필 사진 등록
							</span>
						</label>
					</div>
				</div>
				{/* NOTE: 시간 남으면 약관 추가 */}
				<button
					className='w-full h-10 mt-12 px-6 font-400 rounded-lg bg-black text-white'
					type='submit'
				>
					회원가입하기
				</button>
			</form>
		</>
	);
};

export default SignupForm;
