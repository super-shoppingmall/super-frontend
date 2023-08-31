import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../store/cart-context';
import PointRefill from './Button/PointRefill';
import CartItem from './ShoppingCart/CartItem';
import ShoppingCartTotal from './ShoppingCart/ShoppingCartTotal';

class Item {
	product_id: string;
	product_name: string;
	product_price: number;
	product_quantity: number;
	product_images: string[];

	constructor(id: string, name: string, price: number, quantity: number, images: string[]) {
		this.product_id = id;
		this.product_name = name;
		this.product_price = price;
		this.product_quantity = quantity;
		this.product_images = images;
	}
}

const Order: React.FC = () => {
	const navigate = useNavigate();
	const goToCart = () => {
		navigate('/cart');
	};

	const itemsCtx = useContext(CartContext);
	console.log(itemsCtx.items);

	const totalAmount = itemsCtx.items.reduce((total: number, item: Item) => {
		return total + item.product_price * item.product_quantity;
	}, 0);
	const totalQty = itemsCtx.items.reduce((total: number, item: Item) => {
		return total + item.product_quantity;
	}, 0);

	return (
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
								onDecreaseItem={itemsCtx.decreaseItem.bind(null, item.product_id)}
								onIncreaseItem={itemsCtx.increaseItem.bind(null, item.product_id)}
							></CartItem>
						))}
					</ul>
					<ShoppingCartTotal totalAmount={totalAmount} isCart={false} totalQty={totalQty} />
				</div>
				<div className='font-bold text-lg my-8'>결제 정보</div>
				<div className='border border-black mb-12'>
					<div className='my-4 mx-8 flex flex-row text-base justify-between items-center'>
						<div className='flex gap-4'>
							<input id='superPaySelector' type='radio' />
							<label htmlFor='superPaySelector'>슈퍼페이</label>
						</div>
						<div>
							<PointRefill />
						</div>
					</div>
				</div>
				<button
					className='w-full h-14 bg-black hover:bg-black text-sm text-white font-bold py-2 px-4 focus:outline-black focus:shadow-outline'
					type='button'
				>
					결제하기
				</button>
			</div>
		</div>
	);
};

export default Order;
