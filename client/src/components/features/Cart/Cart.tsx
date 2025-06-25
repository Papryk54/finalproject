import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
	selectCartItems,
	selectCartTotal,
} from "../../../redux/cart/cart.selectors";
import { removeFromCart, clearCart } from "../../../redux/cart/cart.slice";
import styles from "./Cart.module.scss";
import { updateCartItemQuantity } from "../../../redux/cart/cart.thunks";
import { Link } from "react-router-dom";
import type { CartItem } from "../../../redux/cart/cart.types";
import ButtonSecondary from "../../utils/ButtonSecondary/ButtonSecondary";

interface CartProps {
	isOpen: boolean;
	onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
	const cartRef = useRef<HTMLDivElement | null>(null);
	const dispatch = useAppDispatch();

	const items = useAppSelector(selectCartItems);
	const total = useAppSelector(selectCartTotal);

	const handleRemove = (id: string, variantLabel: string) => {
		dispatch(removeFromCart({ id, variantLabel }));
	};

	const handleClear = () => {
		dispatch(clearCart());
	};

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	return (
		<div
			ref={cartRef}
			className={`${styles.cartWrapper} ${isOpen ? styles.open : ""}`}
		>
			<div className={styles.cartContent}>
				<h3>Your Cart</h3>
				<div className={styles.items}>
					{items.length === 0 ? (
						<p>No items in your cart</p>
					) : (
						items.map((item: CartItem) => (
							<div key={item.id + item.variantLabel} className={styles.item}>
								<div className={styles.quantityControls}>
									<span>
										{item.title} ({item.variantLabel})
									</span>
									<button
										type="button"
										className={styles.quantityButton}
										onClick={() =>
											dispatch(
												updateCartItemQuantity(
													item.id,
													item.variantLabel,
													item.quantity - 1
												)
											)
										}
										disabled={item.quantity === 1}
									>
										–
									</button>
									<span>{item.quantity}</span>
									<button
										type="button"
										className={styles.quantityButton}
										onClick={() =>
											dispatch(
												updateCartItemQuantity(
													item.id,
													item.variantLabel,
													item.quantity + 1
												)
											)
										}
									>
										+
									</button>
								</div>
								<div className={styles.controls}>
									<span>${(item.price * item.quantity).toFixed(2)}</span>
									<ButtonSecondary
										label="✕"
										onClick={() => handleRemove(item.id, item.variantLabel)}
									/>
								</div>
							</div>
						))
					)}
				</div>

				{items.length > 0 && (
					<div className={styles.cartFooter}>
						<p>Total: ${total}</p>
						<Link to="/order" className={styles.checkoutBtn} onClick={onClose}>
							Proceed to Checkout
						</Link>
						<button className={styles.clearBtn} onClick={handleClear}>
							Clear Cart
						</button>
					</div>
				)}
				<button className={styles.closeBtn} onClick={onClose}>
					✕
				</button>
			</div>
		</div>
	);
};

export default Cart;
