import React from 'react';

type CartItemProps = {
	id: string;
	name: string;
	price: number;
	quantity: number;
	url: string;
	location: string;
	onRemoveItem: (id: string) => void;
	onDecreaseItem: (id: string) => void;
	onIncreaseItem: (id: string) => void;
};

const CartItem = ({
	id,
	name,
	price,
	quantity,
	url,
	onRemoveItem,
	onDecreaseItem,
	onIncreaseItem,
	location,
}: CartItemProps) => {
	const priceWithComma = price.toLocaleString();
	const subAmount = (price * quantity).toLocaleString();

	return (
		<li>
			<div className='flex gap-8 py-6'>
				{/* 이미지 wrapper */}
				<div className='flex-initial w-3/12'>
					<img src={url} alt={name + '사진'} />
				</div>

				<div className='flex-initial justify-between flex w-9/12'>
					{/* 제품명, 단가, 수량: 왼쪽 */}
					<div className='flex flex-col justify-between'>
						{/* 제품명, 단가 */}
						<div>
							<div className='text-base font-bold'>{name}</div>
							{location === 'CART' && <div className='text-base'>{priceWithComma}원</div>}
							{location === 'ORDER' && <div className='text-sm'>수량: {quantity}개</div>}
						</div>
						{/* 수량 controller */}
						{location === 'CART' && (
							<div className='flex gap-4 border border-solid border-black justify-center py-1 px-4 text-xs'>
								<button
									onClick={() => {
										onDecreaseItem(id);
									}}
								>
									-
								</button>
								<div>{quantity}</div>
								<button
									onClick={() => {
										onIncreaseItem(id);
									}}
								>
									+
								</button>
							</div>
						)}
					</div>
					{/* 소계, 삭제: 오른쪽 */}
					<div className='flex flex-col justify-between'>
						{/* 소계 */}
						<div>{subAmount}원</div>
						{/* 삭제 버튼 */}
						{location === 'CART' && (
							<div className='flex justify-end'>
								<button
									className='w-fit	border-b border-black'
									onClick={() => {
										onRemoveItem(id);
									}}
								>
									삭제
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			<hr />
		</li>
	);
};

export default CartItem;
