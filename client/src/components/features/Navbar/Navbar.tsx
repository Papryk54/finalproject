import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
import ButtonSecondary from "../../utils/ButtonSecondary/ButtonSecondary";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logout } from "../../../redux/auth/auth.slice";
import Cart from "../Cart/Cart";
import { selectCartTotal } from "../../../redux/cart/cart.selectors";
import { useEffect } from "react";
import { setCartFromStorage } from "../../../redux/cart/cart.slice";
import type { CartItem } from "../../../redux/cart/cart.types";

const Navbar = () => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isNavOpen, setIsNavOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const isLogged = useAppSelector((state) => state.auth.isLoggedIn);
	const user = useAppSelector((state) => state.auth.user);
	const isAdmin = user?.role === "admin";
	const userId = user?.id;

	const cartTotal = useAppSelector(selectCartTotal);

	const toggleCart = () => setIsCartOpen((prev) => !prev);
	const toggleNav = () => setIsNavOpen((prev) => !prev);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	const handleNavClick = () => {
		setIsNavOpen(false);
	};

	useEffect(() => {
		const saved = localStorage.getItem("cart");
		if (saved) {
			try {
				const parsed = JSON.parse(saved) as CartItem[];
				dispatch(setCartFromStorage(parsed));
			} catch {
				console.error("Invalid cart data in localStorage");
			}
		}
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<Link to="/" onClick={handleNavClick}>
					<img src="/img/logo.png" alt="logoicon" />
				</Link>
			</div>

			<div className={styles.hamburger} onClick={toggleNav}>
				<span className="material-symbols-outlined">menu</span>
			</div>

			<ul className={`${styles.navigation} ${isNavOpen ? styles.open : ""}`}>
				<li>
					<Link to="/" onClick={handleNavClick}>
						Home
					</Link>
				</li>
				<li>
					<Link to="/products" onClick={handleNavClick}>
						All Products
					</Link>
				</li>
				<li>
					<Link to="/about" onClick={handleNavClick}>
						About
					</Link>
				</li>
				<li>
					<Link to="/contact" onClick={handleNavClick}>
						Contact
					</Link>
				</li>
				<li>
					{isLogged ? (
						<Link
							to="/login"
							onClick={() => {
								handleLogout();
								handleNavClick();
							}}
						>
							Logout
						</Link>
					) : (
						<Link to="/login" onClick={handleNavClick}>
							Login
						</Link>
					)}
				</li>
			</ul>

			<div className={styles.cart} onClick={toggleCart}>
				<p className={styles.total}>${Number(cartTotal).toFixed(2)}</p>
				<span className="material-symbols-outlined">shopping_cart</span>
			</div>

			<Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

			{isAdmin && userId && (
				<div className={styles.adminButton}>
					<ButtonSecondary to={`/admin`} label="Admin" />
				</div>
			)}
		</div>
	);
};

export default Navbar;
