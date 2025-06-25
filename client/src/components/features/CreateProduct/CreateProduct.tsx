import { useState } from "react";
import styles from "./CreateProduct.module.scss";
import ErrorAlert from "../ui/ErrorAlert/ErrorAlert";
import SuccessAlert from "../ui/SuccessAlert/SuccessAlert";
import type { Variant } from "../../../redux/admin/admin.types";
import ButtonSubmit from "../../utils/ButtonSubmit/ButtonSubmit";
import ButtonSecondary from "../../utils/ButtonSecondary/ButtonSecondary";

const CreateProduct = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [variants, setVariants] = useState<Variant[]>([]);
	const [variantLabel, setVariantLabel] = useState("");
	const [variantPrice, setVariantPrice] = useState("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFiles = Array.from(e.target.files);
			if (imageFiles.length + newFiles.length > 5) {
				setErrorMessage("You can upload up to 5 images.");
				return;
			}
			setImageFiles([...imageFiles, ...newFiles]);
		}
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

	const removeVariant = (label: string) => {
		setVariants(variants.filter((v) => v.label !== label));
	};

	const removeImage = (index: number) => {
		setImageFiles(imageFiles.filter((_, i) => i !== index));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage(null);
		setSuccessMessage(null);

		const token = localStorage.getItem("token");
		if (!token) return setErrorMessage("Missing auth token.");
		if (imageFiles.length === 0)
			return setErrorMessage("Please select at least one image.");
		if (variants.length === 0)
			return setErrorMessage("Please add at least one variant.");

		const lowestPrice = Math.min(...variants.map((v) => v.price));

		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("price", lowestPrice.toString());
		formData.append("variants", JSON.stringify(variants));
		imageFiles.forEach((file) => formData.append("images", file));

		try {
			const res = await fetch("http://localhost:3000/api/products", {
				method: "POST",
				headers: { Authorization: `Bearer ${token}` },
				body: formData,
			});

			if (!res.ok) throw new Error("Failed to create product.");

			setSuccessMessage("Product created successfully.");
			setTitle("");
			setDescription("");
			setVariants([]);
			setImageFiles([]);
		} catch (err: unknown) {
			setErrorMessage(
				err instanceof Error ? err.message : "An unknown error occurred."
			);
		}
	};

	return (
		<div className={styles.container}>
			<h1>Create New Product</h1>
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
				<input
					type="file"
					accept="image/*"
					multiple
					onChange={handleImageChange}
					required
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
					<ButtonSecondary
						type="button"
						label="Add variant"
						onClick={addVariant}
					></ButtonSecondary>
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

				<div className={styles.imagePreview}>
					{imageFiles.map((file, index) => (
						<div key={index} className={styles.previewItem}>
							<img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
							<button type="button" onClick={() => removeImage(index)}>
								✕
							</button>
						</div>
					))}
				</div>
				<ButtonSubmit>Add Product</ButtonSubmit>
			</form>
		</div>
	);
};

export default CreateProduct;
