import React, { useContext } from 'react';
import CartItem from './CartItem';
import { CartContext } from '../../context/cart-context';
import { useNavigate } from 'react-router-dom';
import ShoppingCartTotal from './ShoppingCartTotal';

const ShoppingCart: React.FC = () => {
	const itemsCtx = useContext(CartContext);

	const navigate = useNavigate();
	const goToOrder = () => {
		navigate('/order');
	};

	return (
		<div className='flex p-8 gap-12'>
			{/* 장바구니 아이템 */}
			<div className='flex-initial w-2/3 mb-8'>
				<div className='font-bold mb-8 text-lg'>쇼핑백</div>
				<div className='flex justify-between mb-4 text-sm'>
					<div>상품</div>
					<div>가격</div>
				</div>
				<hr />
				<ul>
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
				</ul>
			</div>
			{/* 주문상세 */}
			<div className='flex-initial flex-col h-screen p-8 flex items-start'>
				<div className='font-bold text-lg mb-16'>주문상세</div>
				<ShoppingCartTotal
					totalAmount={itemsCtx.totalAmount}
					isCart={true}
					totalQty={itemsCtx.totalQty}
				/>

				<button className='w-full bg-black h-12 text-white font-bold mb-8' onClick={goToOrder}>
					결제하기
				</button>
				<div className='w-full text-sm'>무료 반품 서비스가 제공되오니 안심하고 구매하십시오.</div>
				<div className='w-full text-sm'>배송에 대한 자세한 내용을 확인하십시오.</div>
			</div>
		</div>
	);
};

export default ShoppingCart;
