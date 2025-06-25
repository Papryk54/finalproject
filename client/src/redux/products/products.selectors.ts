import type { RootState } from "../store";
import type { ProductsState, SortOption } from "./products.types";
import { createSelector } from "@reduxjs/toolkit";

export const selectProducts = (state: RootState): ProductsState["data"] =>
	state.products.data;

export const selectSortedProducts = (sort: SortOption) =>
	createSelector([selectProducts], (products) => {
		const sorted = [...products];

		switch (sort) {
			case "price-asc":
				return sorted.sort((a, b) => a.price - b.price);
			case "price-desc":
				return sorted.sort((a, b) => b.price - a.price);
			case "name-asc":
				return sorted.sort((a, b) => a.title.localeCompare(b.title));
			case "name-desc":
				return sorted.sort((a, b) => b.title.localeCompare(a.title));
			default:
				return sorted;
		}
	});

export const selectProductsLoading = (state: RootState): boolean =>
	state.products.loading;

export const selectProductsError = (state: RootState): string | null =>
	state.products.error;
