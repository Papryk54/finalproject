import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type ProductImage = {
	id: string;
	url: string;
};

type Product = {
	id: string;
	title: string;
	description?: string;
	price: number;
	createdAt: string;
	updatedAt: string;
	images: ProductImage[];
};

const SingleProductPage = () => {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		const fetchProduct = async () => {
			try {
				setLoading(true);
				const res = await fetch(`http://localhost:3000/api/products/${id}`);
				if (!res.ok) throw new Error("Produkt nie znaleziony");
				const data = await res.json();
				setProduct(data);
			} catch (err) {
				setError(err + "Coś poszło nie tak");
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	if (loading) return <p>Ładuję produkt...</p>;
	if (error) return <p style={{ color: "red" }}>{error}</p>;
	if (!product) return <p>Brak danych produktu.</p>;

	return (
		<div
			style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "600px" }}
		>
			<h2>{product.title}</h2>
			<p>
				<strong>Opis:</strong> {product.description || "Brak opisu"}
			</p>
			<p>
				<strong>Cena:</strong> {product.price} zł
			</p>
			<p>
				<strong>Utworzono:</strong>{" "}
				{new Date(product.createdAt).toLocaleString()}
			</p>
			<p>
				<strong>Ostatnia aktualizacja:</strong>{" "}
				{new Date(product.updatedAt).toLocaleString()}
			</p>
			<h3>Zdjęcia:</h3>
			{product.images.length === 0 ? (
				<p>Brak zdjęć.</p>
			) : (
				<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
					{product.images.map((img) => (
						<img
							key={img.id}
							src={img.url}
							alt={`Zdjęcie produktu ${product.title}`}
							style={{ width: "150px", height: "150px", objectFit: "cover" }}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default SingleProductPage;
