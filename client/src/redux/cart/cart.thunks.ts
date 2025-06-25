import type { AppThunk } from "../store";
import {
	addToCart,
	clearCart,
	removeFromCart,
	updateQuantity,
} from "./cart.slice";
import type { CartItem } from "./cart.types";

export const addItemToCart =
	(item: CartItem): AppThunk =>
	(dispatch) => {
		dispatch(addToCart(item));
	};

export const removeItemFromCart =
	(id: string, variantLabel: string): AppThunk =>
	(dispatch) => {
		dispatch(removeFromCart({ id, variantLabel }));
	};

export const clearEntireCart = (): AppThunk => (dispatch) => {
	dispatch(clearCart());
};

export const updateCartItemQuantity =
	(id: string, variantLabel: string, quantity: number): AppThunk =>
	(dispatch) => {
		dispatch(updateQuantity({ id, variantLabel, quantity }));
	};
