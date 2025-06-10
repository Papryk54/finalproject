import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import initialState from "./InitialState";
import usersReducer from "./usersRedux";

const subreducers = {
	user: usersReducer,
};

const reducer = combineReducers<typeof subreducers>(subreducers);

const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	composeEnhancers(applyMiddleware(thunk as ThunkMiddleware))
);

export default store;
