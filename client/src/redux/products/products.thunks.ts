import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "./products.types";

export const fetchProducts = createAsyncThunk<Product[]>(
	"products/fetchAll",
	async () => {
		const res = await fetch("http://localhost:3000/api/products");
		if (!res.ok) throw new Error("Failed to fetch products");
		return res.json();
	}
);

export const fetchProductById = createAsyncThunk<Product, string>(
	"products/fetchById",
	async (id) => {
		const res = await fetch(`http://localhost:3000/api/products/${id}`);
		if (!res.ok) throw new Error("Produkt nie znaleziony");
		return res.json();
	}
);
