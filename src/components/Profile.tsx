import React, { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { CartContext } from '../context/cart-context';

import CartItem from './ShoppingCart/CartItem';
import ShoppingCartTotal from './ShoppingCart/ShoppingCartTotal';
import PointRefill from './Button/PointRefill';
import Backdrop from './Modal/Backdrop';
import Modal from './Modal/Modal';

import IconWrite from '../assets/ic-write.svg';

type User = {
	email: string;
	phone: string | null;
	address: string | null;
	aboutMe: string | null;
	profileImage: string | null;
	gender: string | null;
	password: string | null;
	passwordValid: boolean;
};

const Profile = () => {
	const itemsCtx = useContext(CartContext);

	const [paymoney, setPaymoney] = useState(0);
	const [user, setUser] = useState<User | null>(null);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	function handleUpdatePaymoney(paymoney: number) {
		setPaymoney(Number(paymoney));
	}

	async function fetchPaymoney() {
		const response = await fetch('http://3.34.114.250:8080/api/paymoney');
		const result = await response.json();
		setPaymoney(Number(result.message));
	}

	async function fetchMember() {
		const response = await fetch('http://3.34.114.250:8080/api/members/2');
		const result = await response.json();
		setUser(result);
	}

	useEffect(() => {
		fetchPaymoney();
		fetchMember();
	}, []);

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	const overlayElem = document.getElementById('overlays') as HTMLElement;

	/** 회원정보 수정 모달창 (추후 별도 컴포넌트 예정) */
	interface EditModalProps {
		userEmail: string | null;
		userPhone: string | null;
		userAddress: string | null;
		userAboutMe: string | null;
		userProfileImage: File | string | null;
	}

	function EditModal({
		userEmail,
		userPhone,
		userAddress,
		userAboutMe,
		userProfileImage,
	}: EditModalProps) {
		const email = userEmail;
		const [phone, setPhone] = useState(userPhone);
		const [address, setAddress] = useState(userAddress);
		const [aboutMe, setAboutMe] = useState(userAboutMe);
		const [image, setImage] = useState(userProfileImage);
		const [imageIsChanged, setImageIsChanged] = useState(false);

		/** 회원정보 수정 후 저장 버튼 기능 */
		async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
			event.preventDefault();

			const formData = new FormData();
			formData.append('email', email ?? '');
			formData.append('phone', phone ?? '');
			formData.append('address', address ?? '');
			formData.append('aboutMe', aboutMe ?? '');

			if (imageIsChanged) {
				formData.append('image', image ?? '');
			}

			const response = await fetch('http://3.34.114.250:8080/api/members/2', {
				method: 'PUT',
				body: formData,
			});

			const result = await response.json();
			setUser(result);
			setImageIsChanged(false);

			handleModalClose();
		}

		function handlePhoneInput(event: React.ChangeEvent<HTMLInputElement>) {
			setPhone(event.target.value);
		}

		function handleAddressInput(event: React.ChangeEvent<HTMLInputElement>) {
			setAddress(event.target.value);
		}

		function handleAboutMeInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
			setAboutMe(event.target.value);
		}

		function handleImageInput(event: React.ChangeEvent<HTMLInputElement>) {
			const files = event.target.files;
			if (files && files.length > 0) {
				const selected = files[0];
				setImage(selected);
			}
			setImageIsChanged(true);
		}

		return (
			<>
				<header className='text-xl font-medium px-4 py-4 text-center'>
					<h1>회원정보 수정</h1>
				</header>
				<hr />
				{user && (
					<form
						className='px-8 py-4 flex flex-col gap-6 justify-between items-center'
						onSubmit={handleSubmit}
					>
						<div className='w-full flex flex-col gap-2 '>
							<label htmlFor='email' className='text-sm'>
								프로필 이미지
							</label>
							<input
								className='bg-gray-200 py-2 px-3'
								id='email'
								type='file'
								onChange={handleImageInput}
							/>
						</div>
						<div className='w-full flex flex-col gap-2 '>
							<label htmlFor='email' className='text-sm'>
								이메일
							</label>
							<input
								className='bg-gray-200 py-2 px-3'
								id='email'
								type='text'
								value={(email as string) || ''}
								readOnly
							/>
						</div>
						<div className='w-full flex flex-col gap-2 '>
							<label htmlFor='phone' className='text-sm'>
								휴대전화
							</label>
							<input
								className='py-2 px-3 border border-black'
								id='phone'
								type='text'
								value={(phone as string) || ''}
								onChange={handlePhoneInput}
							/>
						</div>
						<div className='w-full flex flex-col gap-2 '>
							<label htmlFor='address' className='text-sm'>
								주소
							</label>
							<input
								className='py-2 px-3 border border-black'
								id='address'
								type='text'
								value={(address as string) || ''}
								onChange={handleAddressInput}
							/>
						</div>
						<div className='w-full flex flex-col gap-2 '>
							<label htmlFor='aboutMe' className='text-sm'>
								자기소개
							</label>
							<textarea
								className='py-2 px-3 border border-black'
								id='aboutMe'
								value={(aboutMe as string) || ''}
								onChange={handleAboutMeInput}
							/>
						</div>
						<footer className='w-1/2 flex gap-2 justify-center'>
							<button
								className='bg-white px-4 py-2 text-xs border border-black'
								onClick={handleModalClose}
							>
								취소
							</button>
							<button type='submit' className='bg-black px-4 py-2 text-xs text-white'>
								저장
							</button>
						</footer>
					</form>
				)}
			</>
		);
	}

	return (
		<>
			{modalOpen && createPortal(<Backdrop handleModalClose={handleModalClose} />, overlayElem)}
			{modalOpen &&
				createPortal(
					<Modal>
						<EditModal
							userEmail={user!.email}
							userPhone={user ? user.phone : ''}
							userAddress={user ? user.address : ''}
							userAboutMe={user ? user.aboutMe : ''}
							userProfileImage={user ? user.profileImage : ''}
						/>
					</Modal>,
					overlayElem
				)}
			<div className='flex flex-col gap-8 my-8 h-full w-4/5 ml-20'>
				<div className='text-base font-bold mt-6'>사용자 정보</div>
				{/* 프로필 */}
				<div className='flex flex-row gap-10 w-full justify-between'>
					<div
						className='flex justify-center align-center bg-cover bg-center overflow-hidden'
						style={{ width: '150px', height: '150px', borderRadius: '75px' }}
					>
						<img
							className='scale-150'
							style={{ zIndex: '-1' }}
							src={
								user?.profileImage
									? user.profileImage
									: 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png'
							}
						/>
					</div>
					<div className='flex flex-col gap-6' style={{ width: '50%' }}>
						{user && (
							<>
								<div className='mt-3 flex justify-between'>
									<div className='flex gap-4 items-end'>
										<div className='font-bold'>{user.email}</div>
										<div className='text-sm text-gray-400'>{user.phone}</div>
									</div>
									<button style={{ width: '20px' }} onClick={handleModalOpen}>
										<img src={IconWrite} />
									</button>
								</div>
								<div className='line-clamp-4 leading-tight'>
									{user.aboutMe ? user.aboutMe : '자기소개 글이 없습니다.'}
								</div>
							</>
						)}
					</div>
					<div
						className='border border-gray-400 flex flex-col justify-center items-center gap-6 px-8'
						style={{ width: '30%' }}
					>
						<div className='flex flex-row items-center self-start gap-12'>
							<div className='text-xs text-gray-600'>페이머니 잔액</div>
							<div className='text-base'>{paymoney.toLocaleString()}원</div>
						</div>
						<div className='w-full text-center'>
							{<PointRefill handleUpdatePaymoney={handleUpdatePaymoney} />}
						</div>
					</div>
				</div>

				<hr />

				{/* 장바구니 */}
				<div className='text-base font-bold mt-4'>
					장바구니<span className='font-normal text-sm'> (총수량: {itemsCtx.totalQty}개)</span>
				</div>
				<ul className='w-1/2 text-sm'>
					{itemsCtx.items.map(item => (
						<CartItem
							key={item.product_id}
							id={item.product_id}
							name={item.product_name}
							price={item.product_price}
							quantity={item.product_quantity}
							url={item.product_images[0]}
							location='CART'
							onRemoveItem={itemsCtx.removeItem.bind(null, item.product_id)}
							onDecreaseItem={itemsCtx.decreaseItem.bind(
								null,
								item.product_id,
								item.product_quantity
							)}
							onIncreaseItem={itemsCtx.increaseItem.bind(null, item.product_id)}
						></CartItem>
					))}

					<ShoppingCartTotal
						totalAmount={itemsCtx.totalAmount}
						isCart={true}
						totalQty={itemsCtx.totalQty}
					/>
				</ul>
			</div>
		</>
	);
};

export default Profile;
