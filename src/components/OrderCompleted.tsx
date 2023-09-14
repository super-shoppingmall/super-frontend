import Header from './Header/Header';

function OrderCompleted() {
	return (
		<div className='flex flex-col justify-center items-center gap-48'>
			<div className='w-screen'>
				<Header />
			</div>
			<div className='border border-gray-400 px-24 py-12 text-center' style={{ width: '70vw' }}>
				주문이 성공적으로 처리되었습니다.
			</div>
		</div>
	);
}

export default OrderCompleted;
