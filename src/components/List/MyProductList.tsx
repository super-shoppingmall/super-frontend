import React, { useState } from 'react';
import ProductItem from './ProductItem';
import { useNavigate } from 'react-router';

type Item = {
	id: number;
	name: string;
	price: string;
	itemImg: string;
};

const ItemList = () => {
	const navigate = useNavigate();
	const items: Array<Item> = [
		{
			id: 1,
			name: '상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1상품1',
			price: '5000',
			itemImg:
				'https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg',
		},
		{
			id: 2,
			name: '상품2',
			price: '8000',
			itemImg:
				'https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg',
		},
		{
			id: 3,
			name: '상품3상품3상품3상품3상품3상품3상품3상품3상품3상품3상품3상품3상품3상품3상품3',
			price: '8000',
			itemImg:
				'https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg',
		},
		{
			id: 4,
			name: '상품4',
			price: '8000',
			itemImg:
				'https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg',
		},
		{
			id: 1,
			name: '상품1',
			price: '5000',
			itemImg:
				'https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg',
		},
		{
			id: 2,
			name: '상품2',
			price: '8000',
			itemImg:
				'https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg',
		},
		{
			id: 3,
			name: '상품3',
			price: '8000',
			itemImg:
				'https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg',
		},
		{
			id: 4,
			name: '상품4',
			price: '8000',
			itemImg:
				'https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg',
		},
		{
			id: 1,
			name: '상품1',
			price: '5000',
			itemImg:
				'https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg',
		},
		{
			id: 2,
			name: '상품2',
			price: '8000',
			itemImg:
				'https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg',
		},
		{
			id: 3,
			name: '상품3',
			price: '8000',
			itemImg:
				'https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg',
		},
		{
			id: 4,
			name: '상품4',
			price: '8000',
			itemImg:
				'https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg',
		},
	];
	const authCheck = useState('false');

	const registerMove = () => {
		navigate('/register');
	};

	return (
		<main className='.container m-14'>
			<div className='font-bold text-xl mb-5'>상품 리스트</div>
			{authCheck ? (
				<div className='flex justify-end mb-3 mx-4'>
					<button
						className='border px-5 py-1.5 bg-gray-400 text-white'
						onClick={() => registerMove()}
					>
						상품 등록
					</button>
				</div>
			) : null}
			<div className='grid gap-x-1 gap-8 grid-cols-5'>
				{items.map((item, index) => (
					<ProductItem
						key={index}
						id={item.id}
						name={item.name}
						price={item.price}
						itemImg={item.itemImg}
					/>
				))}
			</div>
		</main>
	);
};

export default ItemList;
