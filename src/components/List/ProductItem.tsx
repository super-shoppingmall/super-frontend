import React from 'react';
import { useNavigate } from 'react-router-dom';
type Item = {
	id: number;
	name: string;
	price: string;
	itemImg: string;
};

const ProductItem = ({ id, name, price, itemImg }: Item) => {
	const navigete = useNavigate();

	const pagemove = (param: number) => {
		navigete(`/detail/:${param}`);
	};

	return (
		<div
			key={id}
			className='mx-3'
			onClick={() => {
				pagemove(id);
			}}
		>
			<div className='w-full rounded-xl overflow-hidden mb-1'>
				<img src={itemImg} />
			</div>
			<div className='mb-1 bg-green-400 w-16 text-center rounded-md'>판매중</div>
			<div className='truncate mb-1'>{name}</div>
			<div className='font-bold mb-1'>
				{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
			</div>
		</div>
	);
};

export default ProductItem;
