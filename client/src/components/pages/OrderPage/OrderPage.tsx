import { useEffect, useState } from "react";

type Product = {
	id: string;
	title: string;
	price: number;
};

type OrderProduct = {
	productId: string;
	quantity: number;
	note?: string;
};

type Order = {
	id: string;
	contactName: string;
	contactEmail: string;
	contactPhone?: string;
	address?: string;
	note?: string;
	createdAt: string;
	products: {
		productId: string;
		quantity: number;
		note?: string;
		product: {
			title: string;
			price: number;
		};
	}[];
};

const OrderPage = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);

	const [orders, setOrders] = useState<Order[]>([]);

	const [contactName, setContactName] = useState("");
	const [contactEmail, setContactEmail] = useState("");
	const [contactPhone, setContactPhone] = useState("");
	const [address, setAddress] = useState("");
	const [note, setNote] = useState("");

	const fetchProducts = async () => {
		try {
			const res = await fetch("http://localhost:3000/api/products");
			const data = await res.json();
			setProducts(data);
		} catch (err) {
			console.error("Błąd pobierania produktów:", err);
		}
	};

	const fetchOrders = async () => {
		try {
			const res = await fetch("http://localhost:3000/api/orders");
			const data = await res.json();
			setOrders(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchOrders();
		fetchProducts();
	}, []);

	const toggleProduct = (productId: string) => {
		const exists = orderProducts.find((p) => p.productId === productId);
		if (exists) {
			setOrderProducts((prev) => prev.filter((p) => p.productId !== productId));
		} else {
			setOrderProducts((prev) => [...prev, { productId, quantity: 1 }]);
		}
	};

	const updateQuantity = (productId: string, quantity: number) => {
		setOrderProducts((prev) =>
			prev.map((p) => (p.productId === productId ? { ...p, quantity } : p))
		);
	};

	const updateNote = (productId: string, note: string) => {
		setOrderProducts((prev) =>
			prev.map((p) => (p.productId === productId ? { ...p, note } : p))
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await fetch("http://localhost:3000/api/orders", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					contactName,
					contactEmail,
					contactPhone,
					address,
					note,
					products: orderProducts,
				}),
			});
			alert("Zamówienie wysłane!");
			// Reset
			setContactName("");
			setContactEmail("");
			setContactPhone("");
			setAddress("");
			setNote("");
			setOrderProducts([]);
		} catch (err) {
			console.error("Błąd wysyłania zamówienia:", err);
		}
	};

	return (
		<div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
			<h2>📦 Formularz zamówienia</h2>
			<form
				onSubmit={handleSubmit}
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
					maxWidth: "600px",
				}}
			>
				<input
					type="text"
					placeholder="Imię i nazwisko"
					value={contactName}
					onChange={(e) => setContactName(e.target.value)}
					required
				/>
				<input
					type="email"
					placeholder="Email"
					value={contactEmail}
					onChange={(e) => setContactEmail(e.target.value)}
					required
				/>
				<input
					type="tel"
					placeholder="Telefon"
					value={contactPhone}
					onChange={(e) => setContactPhone(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Adres"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				<textarea
					placeholder="Notatka do zamówienia"
					value={note}
					onChange={(e) => setNote(e.target.value)}
				/>

				<h3>🛒 Produkty</h3>
				{products.map((product) => {
					const selected = orderProducts.find(
						(p) => p.productId === product.id
					);
					return (
						<div
							key={product.id}
							style={{
								border: "1px solid #ccc",
								padding: "1rem",
								marginBottom: "0.5rem",
							}}
						>
							<label>
								<input
									type="checkbox"
									checked={!!selected}
									onChange={() => toggleProduct(product.id)}
								/>{" "}
								{product.title} – {product.price} zł
							</label>
							{selected && (
								<div style={{ marginTop: "0.5rem" }}>
									<input
										type="number"
										min="1"
										value={selected.quantity}
										onChange={(e) =>
											updateQuantity(product.id, parseInt(e.target.value))
										}
										placeholder="Ilość"
									/>
									<input
										type="text"
										placeholder="Notatka"
										value={selected.note || ""}
										onChange={(e) => updateNote(product.id, e.target.value)}
									/>
								</div>
							)}
						</div>
					);
				})}

				<button type="submit">Wyślij zamówienie</button>
			</form>
			<h4>📋 Aktualne zamówienia:</h4>
			{orders.length === 0 ? (
				<p>Brak zamówień.</p>
			) : (
				orders.map((order) => (
					<div
						key={order.id}
						style={{
							border: "1px solid #aaa",
							padding: "1rem",
							margin: "1rem 0",
						}}
					>
						<p>
							<strong>📇 Klient:</strong> {order.contactName} (
							{order.contactEmail})
						</p>
						<p>
							<strong>📞 Telefon:</strong> {order.contactPhone || "brak"}
						</p>
						<p>
							<strong>🏠 Adres:</strong> {order.address || "brak"}
						</p>
						<p>
							<strong>📝 Notatka:</strong> {order.note || "brak"}
						</p>
						<p>
							<strong>🕒 Data:</strong>{" "}
							{new Date(order.createdAt).toLocaleString()}
						</p>
						<h5>🛍️ Produkty:</h5>
						<ul>
							{order.products.map((item) => {
								const product = products.find((p) => p.id === item.productId);
								return (
									<li key={item.productId}>
										{product ? product.title : "Nieznany produkt"} x
										{item.quantity} – {product ? product.price : "?"} zł
										{item.note && <> (🗒️ {item.note})</>}
									</li>
								);
							})}
						</ul>
					</div>
				))
			)}
		</div>
	);
};

export default OrderPage;
