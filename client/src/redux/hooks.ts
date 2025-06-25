import {
	type TypedUseSelectorHook,
	useDispatch,
	useSelector,
} from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Używaj tego zamiast useDispatch — ma typy
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Używaj tego zamiast useSelector — z typami stanu
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
