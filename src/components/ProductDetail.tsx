import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProductDetail = () => {
	// 데이터느 param의 id로 받아 axios로 화면을 불러올 예정
	const navigate = useNavigate();

	const handleButtonClick = () => {
		Swal.fire({
			title: '장바구니에 담았습니다.<br>장바구니로 이동하시겠습니까?',
			icon: 'success',
			showCancelButton: true,
			confirmButtonText: '이동하기',
			cancelButtonText: '계속 둘러보기',
			reverseButtons: true,
		}).then(result => {
			if (result.isConfirmed) {
				navigate('/cart');
			}
		});
	};
	return (
		<div className='grid grid-cols-2 m-14'>
			<div className='grid grid-rows-2 justify-end mr-12'>
				<div className='m-auto mb-8 w-10/12 border-gray-400 rounded-lg overflow-hidden w-96 h-96'>
					<img
						className='w-full h-full'
						src='http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcS3l63ZFrOpbK71rCL5XfBiCxBO43vgKmYRyeDis4qDSGfMJJlmf2RX32cUE6bdFJbmBKWV5cKxlgsVNzc6-eE'
					/>
				</div>
				<div className='flex h-24 gap-2'>
					<div className='h-28 rounded-xl overflow-hidden'>
						<img
							className='w-full h-full'
							src='https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg'
						/>
					</div>
					<div className='h-28 rounded-xl overflow-hidden'>
						<img
							className='w-full h-full'
							src='https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg'
						/>
					</div>
					<div className='h-28 rounded-xl overflow-hidden'>
						<img
							className='w-full h-full'
							src='https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg'
						/>
					</div>
					<div className='h-28 rounded-xl overflow-hidden'>
						<img
							className='w-full h-full'
							src='https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg'
						/>
					</div>
					<div className='h-28 rounded-xl overflow-hidden'>
						<img
							className='w-full h-full'
							src='https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg'
						/>
					</div>
				</div>
			</div>
			<div className='grid grid-rows-[ 1fr, 2fr, 1fr,  1fr] h-96 w-6/12'>
				<div>
					<div className='text-2xl'>상품의 타이틀</div>
					<div>등록자</div>
					<div>
						<span className='font-bold'>
							￦ {'9000'.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						</span>
					</div>
				</div>
				<div>
					<div>상세 내용</div>
					<div className='h-60 w-full border border-gray-400 p-2'></div>
				</div>
				<div>장바구니 미리보기</div>
				<div className='flex justify-evenly'>
					<button
						className='border px-5 py-2 rounded-xl bg-gray-800 text-white'
						onClick={() => {
							handleButtonClick();
						}}
					>
						장바구니 담기
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
// h-60 w-full
