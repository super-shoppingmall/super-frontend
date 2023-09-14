import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/cart-context';
import PointRefill from './Button/PointRefill';
import CartItem from './ShoppingCart/CartItem';
import ShoppingCartTotal from './ShoppingCart/ShoppingCartTotal';
import Item from '../interface/item';

const Order: React.FC = () => {
	const [paymoney, setPaymoney] = useState(0);
	const [payTypeStyle, setPayTypeStyle] = useState('border border-black');
	const [isInsufficient, setIsInsufficient] = useState(false);

	const navigate = useNavigate();
	const goToCart = () => {
		navigate('/cart');
	};

	/** 장바구니 context */
	const itemsCtx = useContext(CartContext);
	const totalAmount = itemsCtx.items.reduce((total: number, item: Item) => {
		return total + item.product_price * item.product_quantity;
	}, 0);
	const totalQty = itemsCtx.items.reduce((total: number, item: Item) => {
		return total + item.product_quantity;
	}, 0);

	/** 페이머니 잔액 조회 */
	async function fetchPaymoney() {
		const response = await fetch('http://3.34.114.250:8080/api/paymoney');
		const result = await response.json();
		setPaymoney(Number(result.message));
	}

	/** 페이머니 충전 후 잔액 업데이트 */
	function handleUpdatePaymoney(paymoney: number) {
		setPaymoney(Number(paymoney));

		if (+totalAmount > +paymoney) {
			setIsInsufficient(true);
			setPayTypeStyle('border border-red-500 border-2');
		} else {
			setIsInsufficient(false);
			setPayTypeStyle('border border-black');
		}
	}

	useEffect(() => {
		fetchPaymoney();
	}, []);

	/** 결제하기 버튼 기능 */
	async function handlePay() {
		const response = await fetch('http://3.34.114.250:8080/api/paymoney', {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				paymoney: totalAmount,
			}),
		});
		const result = await response.json();
		if (result.status.includes('200')) navigate('/ordered');
	}

	return (
		<div>
			<div className='w-full flex flex-col place-items-center m-8'>
				<div className='w-full max-w-xl'>
					<div className='font-bold text-lg mb-4'>배송지 정보</div>
					<div className='border border-black p-4 mb-8'>
						<form className='bg-white pt-6 pb-4 mb-4'>
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm mb-2' htmlFor='email'>
									이메일
								</label>
								<input
									className='shadow appearance-none border border-black w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline'
									id='email'
									type='text'
									placeholder='이메일'
								/>
							</div>
							<div className='mb-4 flex justify-between gap-4'>
								<div className='w-1/2'>
									<label className='block text-gray-700 text-sm mb-2' htmlFor='username'>
										성
									</label>
									<input
										className='shadow appearance-none border border-black w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline'
										id='username'
										type='text'
										placeholder='성'
									/>
								</div>
								<div className='w-1/2'>
									<label className='block text-gray-700 text-sm mb-2' htmlFor='username'>
										이름
									</label>
									<input
										className='shadow appearance-none border border-black w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline'
										id='username'
										type='text'
										placeholder='이름'
									/>
								</div>
							</div>
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm mb-2' htmlFor='phone'>
									전화번호
								</label>
								<input
									className='shadow appearance-none border border-black w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline'
									id='phone'
									type='text'
									placeholder='전화번호'
								/>
							</div>
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm mb-2' htmlFor='address'>
									배송지 주소
								</label>
								<input
									className='shadow appearance-none border border-black w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline'
									id='address'
									type='text'
									placeholder='예) 문래동 강서타워, 선유로 82'
								/>
							</div>
							<div>
								<label className='block text-gray-700 text-sm mb-2' htmlFor='address'>
									상세주소
								</label>
								<input
									className='shadow appearance-none border border-black w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-black focus:shadow-outline'
									id='address'
									type='text'
									placeholder='상세주소'
								/>
							</div>
						</form>
						<div className='mb-4 flex flex-col gap-2'>
							<div>
								<input id='reqCheckbox' type='checkbox' />
								<label htmlFor='reqCheckbox'>
									{' '}
									이용약관, 개인정보 수집 및 이용에 동의합니다. (필수)
								</label>
							</div>
							<div>
								<input id='optCheckbox' type='checkbox' />
								<label htmlFor='optCheckbox'>
									{' '}
									뉴스레터 발송, 맞춤 서비스 및 이벤트 제공, 신규 서비스 개발 등 서비스 품질 향상을
									위한 마케팅 정보 수신 및 활용에 동의합니다. (선택){' '}
								</label>
							</div>
						</div>
					</div>
					<div className='flex flex-row justify-between'>
						<div className='font-bold text-lg mt-8 mb-8'>주문 상품 정보</div>
						<div className='flex text-sm'>
							<button>
								<span className='border-b border-black pb-1' onClick={goToCart}>
									수정
								</span>
							</button>
						</div>
					</div>
					<div className='border border-black p-4 mb-12'>
						<ul>
							{itemsCtx.items.map(item => (
								<CartItem
									key={item.product_id}
									id={item.product_id}
									name={item.product_name}
									price={item.product_price}
									quantity={item.product_quantity}
									url={item.product_images[0]}
									location='ORDER'
									onRemoveItem={itemsCtx.removeItem.bind(null, item.product_id)}
									onDecreaseItem={itemsCtx.decreaseItem.bind(
										null,
										item.product_id,
										item.product_quantity
									)}
									onIncreaseItem={itemsCtx.increaseItem.bind(null, item.product_id)}
								></CartItem>
							))}
						</ul>
						<ShoppingCartTotal totalAmount={totalAmount} isCart={false} totalQty={totalQty} />
					</div>
					<div className='font-bold text-lg my-8'>결제 정보</div>
					<div className={payTypeStyle}>
						<div className='my-4 mx-8 flex flex-col text-base'>
							<div className='flex flex-row w-full justify-between items-center  '>
								<div className='flex gap-4'>
									<input id='superPaySelector' type='radio' defaultChecked />
									<label htmlFor='superPaySelector'>
										슈퍼페이
										<span> (잔액: {paymoney.toLocaleString()}원)</span>
									</label>
								</div>
								<div>
									<PointRefill handleUpdatePaymoney={handleUpdatePaymoney} />
								</div>
							</div>
						</div>
						{isInsufficient && (
							<div className='my-4 mx-8 text-red-600'>
								슈퍼페이 잔액이 부족합니다. 충전 후 구매해 주세요.
							</div>
						)}
					</div>
					<button
						className='mt-12 w-full h-14 bg-black hover:bg-black text-sm text-white font-bold py-2 px-4 focus:outline-black focus:shadow-outline'
						type='button'
						onClick={handlePay}
					>
						결제하기
					</button>
				</div>
			</div>
		</div>
	);
};

export default Order;
