import { Link } from "react-router-dom";
import styles from "./ProductCard.module.scss";
import type { Product } from "../../../../redux/products/products.types";

type Props = {
	product: Product;
};

const ProductCard = ({ product }: Props) => {
	const firstImage = product.images?.[0];
	const image = firstImage?.url
		? firstImage.url.startsWith("/uploads/")
			? `http://localhost:3000${firstImage.url}`
			: firstImage.url
		: "";

	const formattedPrice = Number(product.price).toFixed(2);

	return (
		<div className={styles.card}>
			<Link to={`/product/${product.id}`}>
				{image && (
					<img
						src={image}
						alt={product.title}
						className={styles.image}
						loading="lazy"
					/>
				)}
				<h4>{product.title}</h4>
				<p className={styles.price}>${formattedPrice}</p>
			</Link>
		</div>
	);
};

export default ProductCard;
