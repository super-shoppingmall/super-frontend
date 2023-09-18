import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { useParams } from 'react-router';

type Item = {
	id: number;
	name: string;
	price: string;
	itemImg: string;
};

const ProductList = () => {
	const param = useParams();

	const [pageTitle, setPageTitle] = useState('');

	const titleChoose = () => {
		if (param.pageName === 'food') {
			setPageTitle('사료');
		} else if (param.pageName === 'snack') {
			setPageTitle('간식');
		} else if (param.pageName === 'all') {
			setPageTitle('전체 용품');
		} else if (param.pageName === 'healthfood') {
			setPageTitle('건강식품');
		}
	};

	console.log(param);
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

	useEffect(() => {
		titleChoose();
	}, [param]);

	return (
		<main className='.container my-10 mx-40'>
			<div className='font-bold text-xl mb-5'>{pageTitle}</div>
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

export default ProductList;
