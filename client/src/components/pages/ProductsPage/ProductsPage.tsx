import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchProducts } from "../../../redux/products/products.thunks";
import {
	selectProductsLoading,
	selectProductsError,
	selectSortedProducts,
} from "../../../redux/products/products.selectors";
import type {
	Product,
	SortOption,
} from "../../../redux/products/products.types";
import ProductCard from "../../features/product/ProductCard/ProductCard";
import styles from "./ProductsPage.module.scss";

const ProductsPage = () => {
	const dispatch = useAppDispatch();
	const loadMoreRef = useRef<HTMLDivElement | null>(null);
	const [visibleCount, setVisibleCount] = useState(12);
	const [sort, setSort] = useState<SortOption>("price-asc");
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const sortedProducts = useAppSelector(selectSortedProducts(sort));
	const loading = useAppSelector(selectProductsLoading);
	const error = useAppSelector(selectProductsError);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSort(e.target.value as SortOption);
	};

	useEffect(() => {
		if (!loadMoreRef.current) return;
		const target = loadMoreRef.current;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !isLoadingMore) {
					setIsLoadingMore(true);

					setTimeout(() => {
						setVisibleCount((prev) => prev + 4);
						setIsLoadingMore(false);
					}, 300);
				}
			},
			{
				rootMargin: "0px",
				threshold: 1.0,
			}
		);

		observer.observe(target);

		return () => {
			observer.unobserve(target);
		};
	}, [loadMoreRef, isLoadingMore, sortedProducts.length]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.topBar}>
				<select
					className={styles.sortSelect}
					value={sort}
					onChange={handleSortChange}
				>
					<option value="price-asc">Price: Low to High</option>
					<option value="price-desc">Price: High to Low</option>
					<option value="name-asc">Name: A-Z</option>
					<option value="name-desc">Name: Z-A</option>
				</select>
				<span className={styles.resultsInfo}>
					Showing {Math.min(visibleCount, sortedProducts.length)} /{" "}
					{sortedProducts.length} products
				</span>
			</div>

			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p>{error}</p>
			) : (
				<div className={styles.grid}>
					{sortedProducts.slice(0, visibleCount).map((product: Product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}

			{visibleCount < sortedProducts.length && (
				<div className={styles.loadMore} ref={loadMoreRef}>
					{isLoadingMore ? (
						<p>Loading more products...</p>
					) : (
						<p>Scroll to load more</p>
					)}
				</div>
			)}
		</div>
	);
};

export default ProductsPage;
