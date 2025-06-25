import { createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginAction } from "./auth.slice";
import type { User } from "./auth.types";

export const loginUser = createAsyncThunk<
	void,
	{ email: string; password: string },
	{ rejectValue: string }
>(
	"auth/loginUser",
	async ({ email, password }, { dispatch, rejectWithValue }) => {
		try {
			const res = await fetch("http://localhost:3000/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (!res.ok) throw new Error("Login failed");

			const data: { access_token: string; user: User } = await res.json();
			dispatch(loginAction({ token: data.access_token, user: data.user }));
		} catch (err: unknown) {
			if (err instanceof Error) return rejectWithValue(err.message);
			return rejectWithValue("Unknown error");
		}
	}
);

export const registerUser = createAsyncThunk<
	void,
	{ email: string; password: string; name: string },
	{ rejectValue: string }
>(
	"auth/registerUser",
	async ({ email, password, name }, { dispatch, rejectWithValue }) => {
		try {
			const res = await fetch("http://localhost:3000/api/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password, name }),
			});

			if (!res.ok) throw new Error("Registration failed");

			const data: { access_token: string; user: User } = await res.json();
			dispatch(loginAction({ token: data.access_token, user: data.user }));
		} catch (err: unknown) {
			if (err instanceof Error) return rejectWithValue(err.message);
			return rejectWithValue("Unknown error");
		}
	}
);
