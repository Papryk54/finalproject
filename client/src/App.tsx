import "./App.css";
import HomePage from "./components/pages/HomePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsPage from "./components/layout/ProductsDisplay/ProductsDisplay";
import OrderPage from "./components/pages/OrderPage/OrderPage";
import SingleProductPage from "./components/pages/SingleProductPage/SingleProductsPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/products" element={<ProductsPage />}></Route>
				<Route path="/product/:id" element={<SingleProductPage />}></Route>
				<Route path="/orderPage" element={<OrderPage />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
