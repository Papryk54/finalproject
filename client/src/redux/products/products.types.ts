export type ProductImage = {
	id: string;
	url: string;
	productId: string;
	createdAt: string;
	updatedAt: string;
};

export type ProductVariant = {
	id: string;
	label: string;
	price: number;
	productId: string;
	createdAt: string;
	updatedAt: string;
};

export type Product = {
	id: string;
	title: string;
	description?: string;
	price: number;
	createdAt: string;
	updatedAt: string;
	images: ProductImage[];
	variants: ProductVariant[];
};

export type ProductsState = {
	data: Product[];
	selectedProduct: Product | null;
	loading: boolean;
	error: string | null;
};

export type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc";
