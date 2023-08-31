/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

interface Props {
	children: React.ReactNode;
}

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

type ItemsContextObj = {
	items: Item[];
	addItem: (id: string, name: string, price: number, quantity: number, images: string[]) => void;
	removeItem: (id: string) => void;
	decreaseItem: (id: string) => void;
	increaseItem: (id: string) => void;
};

export const CartContext = React.createContext<ItemsContextObj>({
	items: [],
	addItem: () => {},
	removeItem: (id: string) => {},
	decreaseItem: (id: string) => {},
	increaseItem: (id: string) => {},
});

const CartContextProvider: React.FC<Props> = ({ children }) => {
	const [items, setItems] = useState<Item[]>([
		{
			product_id: 'BL3',
			product_name: '파쏘 BL3',
			product_price: 450000,
			product_quantity: 1,
			product_images: [
				'https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/1/1/11001_PASO_BL3_2_1.jpg',
			],
		},
		{
			product_id: 'PC5',
			product_name: '릿 PC5',
			product_price: 370000,
			product_quantity: 5,
			product_images: [
				'https://www-prd-kr.gentlemonster.com/media/catalog/product/cache/6c6f229b8a7ab97f51028776641e27d1/r/_/r.e.a.t_pc5_2.jpg',
			],
		},
	]);
	const addItemHandler = (
		id: string,
		name: string,
		price: number,
		quantity: number,
		images: string[]
	) => {
		const newItem = new Item(id, name, price, quantity, images);
		setItems(prevItems => {
			return prevItems.concat(newItem);
		});
	};

	const removeItemHandler = (itemId: string) => {
		setItems(prevItems => {
			return prevItems.filter(item => item.product_id !== itemId);
		});
	};

	const decreaseQuantityByOne = (itemId: string) => {
		const newItems: Item[] = [];
		items.map(item => {
			if (item.product_id === itemId) {
				if (item.product_quantity === 1) {
					return;
				}
				return newItems.push({ ...item, product_quantity: item.product_quantity - 1 });
			}
			return newItems.push(item);
		});
		setItems(newItems);
	};

	const increaseQuantityByOne = (itemId: string) => {
		const newItems = items.map(item => {
			if (item.product_id === itemId) {
				return { ...item, product_quantity: item.product_quantity + 1 };
			}
			return item;
		});

		setItems(newItems);
	};

	const contextValue: ItemsContextObj = {
		items: items,
		addItem: addItemHandler,
		removeItem: removeItemHandler,
		decreaseItem: decreaseQuantityByOne,
		increaseItem: increaseQuantityByOne,
	};

	console.log(items);

	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
