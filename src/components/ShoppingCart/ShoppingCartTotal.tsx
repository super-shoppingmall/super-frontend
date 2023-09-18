type ShoppingCartTotalProps = {
	totalAmount: number;
	isCart: boolean;
	totalQty: number;
};

const ShoppingCartTotal = ({ totalAmount, isCart, totalQty }: ShoppingCartTotalProps) => {
	return (
		<>
			{/* 주문상세 */}
			<div className='flex flex-col gap-1 py-4 border-y w-full'>
				<div className='flex flex-row justify-between'>
					<div>{isCart ? '소계' : '상품 합계'}</div>
					<div>{totalAmount.toLocaleString()}원</div>
				</div>
				<div className='flex flex-row justify-between'>
					<div>배송비</div>
					<div>{isCart ? '무료' : '0원'}</div>
				</div>
			</div>
			<div className='flex flex-row w-full justify-between mt-4 mb-12'>
				<div>{isCart ? '합계' : `총합계 (수량: ${totalQty}개)`}</div>
				<div>{totalAmount.toLocaleString()}원</div>
			</div>
		</>
	);
};

export default ShoppingCartTotal;
