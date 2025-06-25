import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditProduct.module.scss";
import ErrorAlert from "../ui/ErrorAlert/ErrorAlert";
import SuccessAlert from "../ui/SuccessAlert/SuccessAlert";
import type { Variant } from "../../../redux/admin/admin.types";
import type { ProductImage } from "../../../redux/products/products.types";
import ButtonSubmit from "../../utils/ButtonSubmit/ButtonSubmit";
import { getImageUrl } from "../../utils/helpers/getImageUrl";

const EditProduct = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [newImages, setNewImages] = useState<File[]>([]);
	const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
	const [variants, setVariants] = useState<Variant[]>([]);
	const [variantLabel, setVariantLabel] = useState("");
	const [variantPrice, setVariantPrice] = useState("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const res = await fetch(`http://localhost:3000/api/products/${id}`);
				if (!res.ok) throw new Error("Failed to fetch product");
				const data = await res.json();

				setTitle(data.title);
				setDescription(data.description || "");
				setPrice(data.price.toString());
				setExistingImages(data.images || []);
				setVariants(data.variants || []);
			} catch {
				setErrorMessage("Something went wrong while fetching the product.");
			}
		};

		if (id) fetchProduct();
	}, [id]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFiles = Array.from(e.target.files);
			const totalFiles = newFiles.length + existingImages.length;
			if (totalFiles > 5) {
				setErrorMessage("You can upload up to 5 images.");
				return;
			}
			setNewImages([...newImages, ...newFiles]);
		}
	};

	const removeExistingImage = (imageId: string) => {
		setExistingImages(existingImages.filter((img) => img.id !== imageId));
	};

	const removeNewImage = (index: number) => {
		setNewImages(newImages.filter((_, i) => i !== index));
	};

	const addVariant = () => {
		const priceNum = parseFloat(variantPrice);
		if (variantLabel.trim() && !isNaN(priceNum)) {
			setVariants([
				...variants,
				{ label: variantLabel.trim(), price: priceNum },
			]);
			setVariantLabel("");
			setVariantPrice("");
		}
	};

	const removeVariant = (labelToRemove: string) => {
		setVariants(variants.filter((v) => v.label !== labelToRemove));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage(null);
		setSuccessMessage(null);

		const token = localStorage.getItem("token");
		if (!token) return setErrorMessage("Missing auth token.");

		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("price", price);
		formData.append("variants", JSON.stringify(variants));
		formData.append(
			"existingImageIds",
			JSON.stringify(existingImages.map((img) => img.id))
		);
		newImages.forEach((file) => formData.append("images", file));

		try {
			const res = await fetch(`http://localhost:3000/api/products/${id}`, {
				method: "PUT",
				headers: { Authorization: `Bearer ${token}` },
				body: formData,
			});
			if (!res.ok) throw new Error("Update failed");

			setSuccessMessage("Product updated successfully.");
			setNewImages([]);
		} catch {
			setErrorMessage("Something went wrong during update.");
		}
	};

	const handleDelete = async () => {
		setErrorMessage(null);

		const token = localStorage.getItem("token");
		if (!token) return setErrorMessage("Missing auth token.");

		const confirmDelete = window.confirm(
			"Are you sure you want to delete this product?"
		);
		if (!confirmDelete) return;

		try {
			const res = await fetch(`http://localhost:3000/api/products/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});
			if (!res.ok) throw new Error("Delete failed");

			setSuccessMessage("Product deleted successfully.");
			navigate("/");
		} catch {
			setErrorMessage("Something went wrong during delete.");
		}
	};

	return (
		<div className={styles.container}>
			<h1>Edit {title}</h1>
			{errorMessage && <ErrorAlert message={errorMessage} />}
			{successMessage && <SuccessAlert message={successMessage} />}

			<form onSubmit={handleSubmit} className={styles.form}>
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<textarea
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<div className={styles.imagePreview}>
					{existingImages.map((img) => (
						<div key={img.id} className={styles.previewItem}>
							<img src={getImageUrl(img.url)} alt="product" />
							<button type="button" onClick={() => removeExistingImage(img.id)}>
								✕
							</button>
						</div>
					))}
					{newImages.map((file, index) => (
						<div key={index} className={styles.previewItem}>
							<img src={URL.createObjectURL(file)} alt={`preview-${index}`} />
							<button type="button" onClick={() => removeNewImage(index)}>
								✕
							</button>
						</div>
					))}
				</div>

				<input
					type="file"
					multiple
					accept="image/*"
					onChange={handleImageChange}
					disabled={existingImages.length + newImages.length >= 5}
				/>

				<div className={styles.variants}>
					<input
						type="text"
						placeholder="Variant label (e.g. S, L, XL)"
						value={variantLabel}
						onChange={(e) => setVariantLabel(e.target.value)}
					/>
					<input
						type="number"
						placeholder="Variant price"
						value={variantPrice}
						onChange={(e) => setVariantPrice(e.target.value)}
					/>
					<button type="button" onClick={addVariant}>
						Add variant
					</button>
				</div>

				<div className={styles.variantList}>
					{variants.map((v, index) => (
						<div key={index} className={styles.variantItem}>
							<span>
								{v.label} - {v.price} $
							</span>
							<button type="button" onClick={() => removeVariant(v.label)}>
								✕
							</button>
						</div>
					))}
				</div>
				<ButtonSubmit>Update</ButtonSubmit>
			</form>

			{id && (
				<button
					type="button"
					onClick={handleDelete}
					className={styles.deleteButton}
				>
					Delete Product
				</button>
			)}
		</div>
	);
};

export default EditProduct;
