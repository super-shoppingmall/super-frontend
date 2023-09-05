import { useContext } from 'react';
import { CartContext } from '../store/cart-context';
import CartItem from './ShoppingCart/CartItem';
import ShoppingCartTotal from './ShoppingCart/ShoppingCartTotal';
const Profile = () => {
	const itemsCtx = useContext(CartContext);

	return (
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
						src='https://mblogthumb-phinf.pstatic.net/MjAyMTAyMDRfMTgy/MDAxNjEyNDA5MDAwMTQ5.xAL2IL0PLx1GEkteQW9hO0VQQ5hp6G_KW51CDSesCOIg.ptpcPrdvUq9uhozgN0_nUHssItIl3BhLOqabQuy1A8gg.JPEG.sunny_side_up12/1612312679152%EF%BC%8D3.jpg?type=w800'
					/>
				</div>
				<div className='flex flex-col gap-6' style={{ width: '50%' }}>
					<div className='font-bold mt-3'>축구하는푸팟퐁커리</div>
					<div className='line-clamp-4 leading-tight'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse posuere at enim
						eget hendrerit. Vivamus et urna scelerisque, accumsan orci aliquet, maximus risus. Sed
						imperdiet ut est eu consectetur. Sed mattis velit nunc, vel iaculis mi pharetra ut. Cras
						rhoncus augue eget pulvinar mollis. Phasellus id tellus diam. Integer et euismod massa.
						Pellentesque sed ullamcorper elit. Ut in ligula lectus. Donec dolor neque, auctor a
						auctor in, feugiat maximus libero. Orci varius natoque penatibus et magnis dis
						parturient montes, nascetur ridiculus mus. Cras ornare sagittis urna quis eleifend.
						Donec faucibus sit amet nisi sit amet dignissim.
					</div>
				</div>
				<div
					className='border border-black flex flex-col justify-center items-center gap-6 px-8'
					style={{ width: '30%' }}
				>
					<div
						className='flex flex-row items-center self-start gap-12 '
						// style={{ placeSelf: 'normal' }}
					>
						<div className='text-sm text-gray-600'>페이머니 잔액</div>
						<div className='text-base'>1,000,000원</div>
					</div>
					<div className='bg-black w-full h-1/3 flex justify-center items-center'>
						<div className='text-white text-sm'>페이머니 충전하기</div>
					</div>
				</div>
			</div>

			<hr />

			{/* 장바구니 */}
			<div className='text-base font-bold mt-4'>
				장바구니<span className='font-normal text-sm'> (총수량: {itemsCtx.totalQty}개)</span>
			</div>
			{/* <div className='grid grid-cols-5 gap-4 py-6'> */}
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
			{/* </div> */}
		</div>
	);
};

export default Profile;
