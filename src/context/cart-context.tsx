import React, { useState } from 'react';
import Item from '../interface/item';

interface Props {
	children: React.ReactNode;
}

type ItemsContextObj = {
	items: Item[];
	addItem: (id: string, name: string, price: number, quantity: number, images: string[]) => void;
	removeItem: (id: string) => void;
	decreaseItem: (id: string, quantity: number) => void;
	increaseItem: (id: string) => void;
	totalAmount: number;
	totalQty: number;
};

export const CartContext = React.createContext<ItemsContextObj>({
	items: [],
	addItem: () => {},
	removeItem: () => {},
	decreaseItem: () => {},
	increaseItem: () => {},
	totalAmount: 0,
	totalQty: 0,
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

	const decreaseQuantityByOne = (itemId: string, itemQty: number) => {
		const newItems: Item[] = [];
		if (itemQty > 1) {
			items.map(item => {
				if (item.product_id === itemId) {
					return newItems.push({ ...item, product_quantity: item.product_quantity - 1 });
				}
				return newItems.push(item);
			});
			setItems(newItems);
		} else {
			return setItems(items.filter(item => item.product_id !== itemId));
		}
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
		totalAmount: items.reduce((total: number, item: Item) => {
			return total + item.product_price * item.product_quantity;
		}, 0),
		totalQty: items.reduce((total: number, item: Item) => {
			return total + item.product_quantity;
		}, 0),
	};

	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
