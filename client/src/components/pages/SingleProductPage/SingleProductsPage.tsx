import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonSecondary from "../../utils/ButtonSecondary/ButtonSecondary";
import { fetchProductById } from "../../../redux/products/products.thunks";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import styles from "./SingleProductPage.module.scss";
import { addItemToCart } from "../../../redux/cart/cart.thunks";
import { useIsAdmin } from "../../utils/hooks/useIsAdmin";
import type { CartItem } from "../../../redux/cart/cart.types";
import ProductGallery from "../../features/product/ProductGallery/ProductGallery";
import ErrorAlert from "../../features/ui/ErrorAlert/ErrorAlert";
import VariantSelector from "../../features/product/VarianSelector/VariantSelector";
import { getImageUrl } from "../../utils/helpers/getImageUrl";
import ButtonSubmit from "../../utils/ButtonSubmit/ButtonSubmit";

const SingleProductPage = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const [chosenImage, setChosenImage] = useState(0);
	const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
		null
	);
	const {
		selectedProduct: product,
		loading,
		error,
	} = useAppSelector((state) => state.products);
	const isAdmin = useIsAdmin();

	useEffect(() => {
		if (id) dispatch(fetchProductById(id));
	}, [id, dispatch]);

	useEffect(() => {
		if (product && product.variants.length > 0) {
			const sortedVariants = [...product.variants].sort(
				(a, b) => a.price - b.price
			);
			setSelectedVariantId(sortedVariants[0].id);
		}
	}, [product]);

	const sortedVariants = useMemo(() => {
		if (!product) return [];
		return [...product.variants].sort((a, b) => a.price - b.price);
	}, [product]);

	if (loading) return <p>Loading...</p>;
	if (error) return <ErrorAlert message={error} />;
	if (!product) return <ErrorAlert message={"Product not Found"} />;

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>{product.title}</h2>
			<p className={styles.description}>{product.description}</p>

			{product.images.length > 0 && (
				<ProductGallery
					images={product.images.map((img) => ({
						...img,
						url: getImageUrl(img.url),
					}))}
					selectedIndex={chosenImage}
					onSelect={setChosenImage}
				/>
			)}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (!selectedVariantId || !product) return;

					const variant = product.variants.find(
						(v) => v.id === selectedVariantId
					);
					if (!variant) return;

					const item: CartItem = {
						id: product.id,
						title: product.title,
						price: variant.price,
						quantity: 1,
						variantLabel: variant.label,
						variantId: variant.id,
						imageUrl: product.images?.[0]?.url || "",
					};

					dispatch(addItemToCart(item));
				}}
				className={styles.form}
			>
				<VariantSelector
					variants={sortedVariants}
					selectedId={selectedVariantId}
					onChange={(id) => {
						setSelectedVariantId(id);
					}}
				/>
				<ButtonSubmit>Add to cart</ButtonSubmit>
			</form>

			{isAdmin && <ButtonSecondary label="Edit" to={`/admin/${product.id}`} />}
		</div>
	);
};

export default SingleProductPage;
