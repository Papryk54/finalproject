export interface CartItem {
	id: string;
	title: string;
	price: number;
	quantity: number;
	variantLabel: string;
	variantId: string;
	imageUrl?: string;
}

export interface CartState {
	items: CartItem[];
}