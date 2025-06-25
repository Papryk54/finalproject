import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/users.slice";
import productsReducer from "./products/products.slice";
import authReducer from "./auth/auth.slice";
import cartReducer from "./cart/cart.slice";

const store = configureStore({
	reducer: {
		user: usersReducer,
		products: productsReducer,
		auth: authReducer,
		cart: cartReducer,
	},
});

store.subscribe(() => {
	const { cart } = store.getState();
	localStorage.setItem("cart", JSON.stringify(cart.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = (
	dispatch: AppDispatch,
	getState: () => RootState
) => ReturnType;

export default store;
