export type UserRole = "user" | "admin";

export type User = {
	id: string;
	email: string;
	role?: UserRole;
};

export type AuthState = {
	isLoggedIn: boolean;
	user: User | null;
};
