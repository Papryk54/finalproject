import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
	selectCartItems,
	selectCartTotal,
} from "../../../redux/cart/cart.selectors";
import { clearCart } from "../../../redux/cart/cart.slice";
import type { CartItem } from "../../../redux/cart/cart.types";
import styles from "./OrderPage.module.scss";
import ErrorAlert from "../../features/ui/ErrorAlert/ErrorAlert";
import SuccessAlert from "../../features/ui/SuccessAlert/SuccessAlert";
import ButtonSubmit from "../../utils/ButtonSubmit/ButtonSubmit";

interface OrderPayload {
	contactName: string;
	contactEmail: string;
	contactPhone?: string;
	address?: string;
	products: {
		productId: string;
		variantId: string;
		quantity: number;
	}[];
}

const OrderPage = () => {
	const items: CartItem[] = useAppSelector(selectCartItems);
	const total = useAppSelector(selectCartTotal);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const formattedTotal = useMemo(() => Number(total).toFixed(2), [total]);

	if (items.length === 0) {
		return (
			<p style={{ height: "50vh" }}>Your cart is empty. Add something first!</p>
		);
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage(null);

		const token = localStorage.getItem("token");

		if (!token) {
			setErrorMessage("You must be logged in to place an order.");
			return;
		}

		const payload: OrderPayload = {
			contactName: name,
			contactEmail: email,
			contactPhone: phone || undefined,
			address: address || undefined,
			products: items.map((item) => ({
				productId: item.id,
				variantId: item.variantId,
				quantity: item.quantity,
			})),
		};

		try {
			const res = await fetch("http://localhost:3000/api/orders", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				throw new Error("Failed to create order");
			}

			dispatch(clearCart());
			setSuccessMessage("Order placed successfully!");

			setTimeout(() => navigate("/order-confirmation"), 1000);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setErrorMessage(err.message);
			} else {
				setErrorMessage("An unknown error occurred.");
			}
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1>Order Summary</h1>
				{errorMessage && <ErrorAlert message={errorMessage} />}
				{successMessage && <SuccessAlert message={successMessage} />}

				<div className={styles.items}>
					{items.map((item) => (
						<div key={item.id + item.variantLabel} className={styles.itemRow}>
							<p>
								<span>{item.title}</span> 
								(<span>{item.variantLabel}</span>)
							</p>
							<span>
								{item.quantity} × ${item.price.toFixed(2)}
							</span>
							<span>= ${(item.quantity * item.price).toFixed(2)}</span>
						</div>
					))}
				</div>

				<div className={styles.total}>
					<strong>Total:</strong> ${formattedTotal}
				</div>

				<form onSubmit={handleSubmit} className={styles.form}>
					<h2>Contact Info</h2>
					<input
						type="text"
						placeholder="Full Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type="tel"
						placeholder="Phone (optional)"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Address (optional)"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<ButtonSubmit>Place Order</ButtonSubmit>
				</form>
			</div>
		</div>
	);
};

export default OrderPage;
