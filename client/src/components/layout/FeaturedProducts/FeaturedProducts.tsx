import { useEffect, useState } from "react";
import styles from "./FeaturedProducts.module.scss";
import ButtonSecondary from "../../utils/ButtonSecondary/ButtonSecondary";
import { getImageUrl } from "../../utils/helpers/getImageUrl";
import type { Product } from "../../../redux/products/products.types";

const FeaturedProducts = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const itemsPerPage = 4;

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch("http://localhost:3000/api/products");
				if (!res.ok) throw new Error("Failed to fetch products");
				const data = await res.json();
				setProducts(data);
			} catch (err) {
				setError("Could not load products.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	const paginatedProducts = products.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage
	);

	if (loading) return <p>Loading products...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className={styles.container}>
			<h3 className={styles.heading}>Featured Products</h3>

			<div className={styles.categoryButtons}>
				{Array.from({
					length: Math.min(4, Math.ceil(products.length / itemsPerPage)),
				}).map((_, index) => (
					<ButtonSecondary
						key={index}
						label={(index + 1).toString()}
						onClick={() => setPage(index + 1)}
					/>
				))}
			</div>

			<div className={styles.productGrid}>
				{paginatedProducts.map((product) => {
					const basePrice = product.variants?.length
						? Math.min(...product.variants.map((v) => v.price))
						: product.price;

					return (
						<div key={product.id} className={styles.productCard}>
							<img
								src={getImageUrl(product.images?.[0]?.url)}
								alt={product.title}
							/>
							<p>{product.title}</p>
							<p>from ${basePrice.toFixed(2)}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default FeaturedProducts;
