import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState } from "./cart.types";

const initialState: CartState = {
	items: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const existing = state.items.find(
				(item) =>
					item.id === action.payload.id &&
					item.variantLabel === action.payload.variantLabel
			);

			if (existing) {
				existing.quantity += action.payload.quantity;
			} else {
				state.items.push(action.payload);
			}
		},
		updateQuantity: (
			state,
			action: PayloadAction<{
				id: string;
				variantLabel: string;
				quantity: number;
			}>
		) => {
			const item = state.items.find(
				(i) =>
					i.id === action.payload.id &&
					i.variantLabel === action.payload.variantLabel
			);
			if (item && action.payload.quantity > 0) {
				item.quantity = action.payload.quantity;
			}
		},
		removeFromCart: (
			state,
			action: PayloadAction<{ id: string; variantLabel: string }>
		) => {
			state.items = state.items.filter(
				(item) =>
					!(
						item.id === action.payload.id &&
						item.variantLabel === action.payload.variantLabel
					)
			);
		},
		clearCart: (state) => {
			state.items = [];
		},
		setCartFromStorage: (state, action: PayloadAction<CartItem[]>) => {
			state.items = action.payload;
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	clearCart,
	updateQuantity,
	setCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
