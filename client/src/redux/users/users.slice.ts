import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type UserState } from "./users.types";

const initialState: UserState = {
	id: "",
	email: "",
	name: null,
	role: "user",
	login: null,
};

const usersSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logIn: (state, action: PayloadAction<{ login: string }>) => {
			state.login = action.payload.login;
		},
		logOut: (state) => {
			state.login = null;
		},
	},
});

export const { logIn, logOut } = usersSlice.actions;

export default usersSlice.reducer;
