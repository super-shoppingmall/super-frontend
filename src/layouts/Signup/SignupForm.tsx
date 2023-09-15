import { useReducer, useState } from 'react';
import { Navigate } from 'react-router-dom';
import InputField from '../../components/Form/InputField';
import signupReducer, { FormData, FormTextField } from '../../reducers/signupReducer';
import FormMessage from '../../components/Form/FormMessage';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import type { Address } from 'react-daum-postcode';
import { AuthApi } from '../../api/api';

const initialData: FormData = {
	formState: [],
	email: '',
	password: '',
	passwordConfirm: '',
	passwordValid: null,
	phone: '',
	gender: 'male',
	address: '',
	addressDetail: '',
	profileImage: '',
	aboutMe: '',
};

const SignupForm = () => {
	const [formData, dispatchFormData] = useReducer(signupReducer, initialData);
	const [isEmailUnique, setIsEmailUnique] = useState<boolean | null>(null);

	const formState = formData.formState;

	const handleEmailUnique = async () => {
		try {
			const response = await AuthApi.checkEmailUnique(formData.email);
			setIsEmailUnique(response);
		} catch (err) {
			setIsEmailUnique(false);
		}
	};

	// Form Validation & Value

	const addInputField = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		if (e.target.type === 'file') {
			const target = e.target as HTMLInputElement;
			const file = target.files && target.files[0];

			dispatchFormData({
				type: 'SET_FIELD',
				value: {
					...formData,
					profileImage: JSON.stringify(file),
				},
			});
			return;
		}

		if (e.target.name === 'email') {
			setIsEmailUnique(false);
		}

		if (e.target.name === 'password') {
			const updatedErrorState =
				e.target.value !== formData.passwordConfirm ? 'ERROR_PWD_CONFIRM' : '';
			dispatchFormData({
				type: 'SET_FIELD',
				value: {
					...formData,
					password: e.target.value,
					formState: [...formData.formState, updatedErrorState],
				},
			});
		}

		dispatchFormData({
			type: 'SET_FIELD',
			value: {
				...formData,
				[e.target.name]: e.target.value,
			},
		});
	};

	const validateInputField = (fieldType: FormTextField) => {
		dispatchFormData({ type: 'VALID_SINGLE_FIELD', fieldType: fieldType });
	};

	const validateForm = () => {
		dispatchFormData({ type: 'VALID_FIELD' });
		if (typeof isEmailUnique !== 'boolean') setIsEmailUnique(false);
	};

	const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isEmailUnique || formState.length > 0) return;
		dispatchFormData({ type: 'SUBMIT_FORM' });
	};

	// Form Address
	const open = useDaumPostcodePopup();

	const handleComplete = (data: Address) => {
		let fullAddress = data.address;
		let extraAddress = '';

		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}

		dispatchFormData({
			type: 'SET_FIELD',
			value: {
				...formData,
				address: `(${data.zonecode}) ${fullAddress}`,
			},
		});
	};

	const handleClick = () => {
		open({ onComplete: handleComplete });
	};

	if (formState.includes('SUCCESS')) {
		alert('회원가입이 완료되었습니다!');
		return <Navigate to='/' />;
	}

	return (
		<>
			<div>
				<h2>건강한 반려 생활의 시작, 슈퍼 쇼핑몰</h2>
				<p className='text-gray-400 text-sm'>빠르게 가입하고 웰컴 혜택 받으세요!</p>
			</div>
			<form className='relative' onSubmit={handleForm}>
				{/* 아이디 */}
				<div>
					<InputField theme='SECONDARY' id='email' label='이메일' isRequired>
						<input
							type='email'
							id='email'
							name='email'
							className='w-80 input-text'
							placeholder='example@example.com'
							onChange={addInputField}
							onBlur={() => validateInputField('EMAIL')}
						/>
						<button type='button' className='btn-form-sm' onClick={handleEmailUnique}>
							중복확인
						</button>
					</InputField>
					{typeof isEmailUnique === 'boolean' && (
						<FormMessage type='ERROR_EMAIL_UNIQUE' isValid={isEmailUnique} />
					)}
					<FormMessage type='ERROR_EMAIL' isValid={!formState.includes('ERROR_EMAIL')} />
					<FormMessage
						type='ERROR_EMAIL_EMPTY'
						isValid={!formState.includes('ERROR_EMAIL_EMPTY')}
					/>
				</div>

				{/* 비밀번호 */}
				<div>
					<InputField theme='SECONDARY' id='password' label='비밀번호' isRequired>
						<input
							type='password'
							id='password'
							name='password'
							className='flex-1 input-text'
							placeholder='영문, 숫자, 특수문자 혼합 8 ~ 30자 비밀번호'
							onChange={addInputField}
							onBlur={() => validateInputField('PASSWORD')}
						/>
					</InputField>
					<FormMessage type='ERROR_PASSWORD' isValid={!formState.includes('ERROR_PASSWORD')} />
					<FormMessage
						type='ERROR_PASSWORD_EMPTY'
						isValid={!formState.includes('ERROR_PASSWORD_EMPTY')}
					/>
				</div>

				{/* 비밀번호 확인 */}
				<div>
					<InputField theme='SECONDARY' id='passwordConfirm' label='비밀번호 확인' isRequired>
						<input
							type='password'
							id='passwordConfirm'
							name='passwordConfirm'
							className='flex-1 input-text'
							placeholder='비밀번호 확인'
							onChange={addInputField}
							onBlur={() => {
								validateInputField('PWD_CONFIRM');
							}}
						/>
					</InputField>
					<FormMessage
						type='ERROR_PWD_CONFIRM'
						isValid={!formState.includes('ERROR_PWD_CONFIRM')}
					/>
					<FormMessage
						type='ERROR_PWD_CONFIRM_EMPTY'
						isValid={!formState.includes('ERROR_PWD_CONFIRM_EMPTY')}
					/>
				</div>

				{/* 핸드폰 번호 */}
				<div>
					<InputField theme='SECONDARY' id='phone' label='핸드폰 번호' isRequired>
						<input
							type='text'
							id='phone'
							name='phone'
							className='flex-1 input-text'
							placeholder="'-'를 제외한 숫자"
							onChange={addInputField}
							onBlur={() => validateInputField('PHONE')}
						/>
					</InputField>
					<FormMessage type='ERROR_PHONE' isValid={!formState.includes('ERROR_PHONE')} />
					<FormMessage
						type='ERROR_PHONE_EMPTY'
						isValid={!formState.includes('ERROR_PHONE_EMPTY')}
					/>
				</div>

				{/* 주소 */}
				<div>
					<InputField theme='SECONDARY' id='address' label='주소' disabled>
						<textarea
							id='address'
							name='address'
							className='w-80 input-text pr-8'
							rows={formData.address ? 2 : 1}
							value={formData.address}
							readOnly
							disabled
						/>
						<button type='button' className='btn-form-sm' onClick={handleClick}>
							검색
						</button>
					</InputField>
					<InputField theme='PRIMARY' id='addressDetail' label='나머지 주소' isRequired>
						<input
							type='text'
							id='addressDetail'
							name='addressDetail'
							className='flex-1 input-text'
							placeholder='나머지 주소'
							onChange={addInputField}
						/>
					</InputField>
				</div>

				{/* 프로필 사진 */}
				<div className='col-span-full mt-3'>
					<label htmlFor='profile' className='text-sm'>
						프로필
					</label>
					<div className='mt-2  w-full gap-x-3'>
						<label htmlFor='profile' className='cursor-pointer'>
							<input
								type='file'
								name='profile'
								id='profile'
								className='sr-only'
								onChange={addInputField}
							/>
							<span className='flex items-center  w-full rounded-sm bg-white px-2.5 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
								<svg
									className='w-6 h-6 mr-2'
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

				{/* 성별 */}
				<div>
					<InputField theme='SECONDARY' id='gender' label='성별'>
						<select
							name='gender'
							id='gender'
							className='flex-1 input-text'
							onChange={addInputField}
						>
							<option value='male'>남성</option>
							<option value='female'>여성</option>
						</select>
					</InputField>
				</div>

				{/* 자기소개 */}
				<div>
					<InputField theme='SECONDARY' id='aboutMe' label='자기소개'>
						<textarea
							name='aboutMe'
							id='aboutMe'
							className='w-full h-[160px]'
							onChange={addInputField}
						></textarea>
					</InputField>
				</div>

				{/* NOTE: 시간 남으면 약관 추가 */}
				<button className='btn-form-lg' type='submit' onClick={validateForm}>
					가입하기
				</button>
			</form>
		</>
	);
};

export default SignupForm;
