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

export default Item;
