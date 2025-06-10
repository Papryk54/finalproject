type UserState = { login: string | null } | null;

interface Action {
	type: string;
	payload?: any;
}

// selectors

export const selectUserLogin = (state: { user: UserState }) =>
	state.user?.login;

// actions
const createActionName = (actionName: string) => `app/users/${actionName}`;
const LOG_IN = createActionName("LOG_IN");
const LOG_OUT = createActionName("LOG_OUT");

// action creators
export const logIn = (payload: any) => ({
	type: LOG_IN,
	payload,
});

export const logOut = (payload: any) => ({
	type: LOG_OUT,
	payload,
});

const usersReducer = (
	statePart: UserState = null,
	action: Action
): UserState => {
	switch (action.type) {
		case LOG_IN:
			return action.payload;
		case LOG_OUT:
			return { login: null };
		default:
			return statePart;
	}
};

export default usersReducer;
