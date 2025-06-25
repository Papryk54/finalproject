import { type UserState } from "./users.types";

export const selectUserLogin = (state: { user: UserState }) => state.user.login;
