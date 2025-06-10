import React from "react";
import { Link } from "react-router-dom";
import ProductsDisplay from "../../layout/ProductsDisplay/ProductsDisplay";

const HomePage: React.FC = () => {
	return (
		<div style={{ padding: "40px", textAlign: "center" }}>
			<h1>Witaj w FluxShop 🛒</h1>
			<p style={{ fontSize: "18px", margin: "20px 0" }}>
				Odkryj najlepsze produkty dostępne w naszym sklepie.
			</p>
			<ProductsDisplay></ProductsDisplay>
			<Link to="/products">
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
					Przeglądaj produkty
				</button>
			</Link>
			<Link to="/orderPage">
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
					Złóż zamówienie
				</button>
			</Link>
		</div>
	);
};

export default HomePage;
