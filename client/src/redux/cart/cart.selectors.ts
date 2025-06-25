import type { RootState } from "../store";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotal = (state: RootState) => {
	return state.cart.items
		.reduce((sum, item) => sum + item.price * item.quantity, 0)
		.toFixed(2);
};

export const selectCartCount = (state: RootState) => {
	return state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
};
