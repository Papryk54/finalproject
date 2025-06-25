import HomePage from "./components/pages/HomePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderPage from "./components/pages/OrderPage/OrderPage";
import SingleProductPage from "./components/pages/SingleProductPage/SingleProductsPage";
import Navbar from "./components/features/Navbar/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import Footer from "./components/features/Footer/Footer";
import ProductsPage from "./components/pages/ProductsPage/ProductsPage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import AdminPage from "./components/pages/AdminPage/AdminPage";
import ContactPage from "./components/pages/ContactPage/ContactPage";
import AboutPage from "./components/pages/AboutPage/AboutPage";
import OrderConfirmation from "./components/pages/OrderConfirmation/OrderConfirmation";


function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/products" element={<ProductsPage />} />
					<Route path="/product/:id" element={<SingleProductPage />} />
					<Route path="/orderPage" element={<OrderPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/admin/" element={<AdminPage />} />
					<Route path="/admin/:id" element={<AdminPage />} />
					<Route path="/order" element={<OrderPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/order-confirmation" element={<OrderConfirmation />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
