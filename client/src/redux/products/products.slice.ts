import { createSlice } from "@reduxjs/toolkit";
import type { ProductsState } from "./products.types";
import { fetchProducts, fetchProductById } from "./products.thunks";

const initialState: ProductsState = {
	data: [],
	selectedProduct: null,
	loading: false,
	error: null,
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Coś poszło nie tak";
			})
			.addCase(fetchProductById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProductById.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedProduct = action.payload;
			})
			.addCase(fetchProductById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Coś poszło nie tak";
			});
	},
});

export default productsSlice.reducer;
