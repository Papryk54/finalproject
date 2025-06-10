import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Product = {
	id: string;
	title: string;
	price: number;
};

const ProductsDisplay = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");

	const fetchProducts = async () => {
		try {
			const res = await fetch("http://localhost:3000/api/products/");
			const data = await res.json();
			setProducts(data);
		} catch (err) {
			console.error("Błąd pobierania produktów:", err);
		}
	};

	const addProduct = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await fetch("http://localhost:3000/api/products/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					price: parseFloat(price),
				}),
			});
			setName("");
			setPrice("");
			await fetchProducts();
		} catch (err) {
			console.error("Błąd dodawania produktu:", err);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
			<h2>🛍 Lista produktów</h2>
			<ul>
				{products.map((product) => (
					<li key={product.id}>
						<strong>{product.title}</strong> – {product.price} zł
						<Link to={`/product/${product.id}`}>
							<button
								style={{
									padding: "10px 20px",
									backgroundColor: "#007bff",
									color: "white",
									border: "none",
									borderRadius: "5px",
									cursor: "pointer",
								}}
							>
								Zobacz szczegóły
							</button>
						</Link>
					</li>
				))}
			</ul>

			<hr style={{ margin: "2rem 0" }} />

			<h3>➕ Dodaj produkt</h3>
			<form
				onSubmit={addProduct}
				style={{
					display: "flex",
					flexDirection: "column",
					maxWidth: "300px",
					gap: "0.5rem",
				}}
			>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Nazwa produktu"
					required
				/>
				<input
					type="number"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					placeholder="Cena"
					required
				/>
				<button type="submit">Dodaj</button>
			</form>
		</div>
	);
};

export default ProductsDisplay;
