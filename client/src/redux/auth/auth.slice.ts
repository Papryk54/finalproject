import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "./auth.types";

const initialState: AuthState = {
	isLoggedIn: !!localStorage.getItem("token"),
	user: localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user")!)
		: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<{ token: string; user: User }>) => {
			localStorage.setItem("token", action.payload.token);
			localStorage.setItem("user", JSON.stringify(action.payload.user));
			state.isLoggedIn = true;
			state.user = action.payload.user;
		},
		logout: (state) => {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			state.isLoggedIn = false;
			state.user = null;
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
