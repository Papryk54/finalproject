import { Link } from "react-router-dom";
import styles from "./OrderConfirmation.module.scss";

const OrderConfirmation = () => {
	return (
		<div className={styles.container}>
			<h2>Thank you for your order!</h2>
			<p>
				Your order has been successfully placed. We'll contact you soon with
				more details.
			</p>

			<div className={styles.actions}>
				<Link to="/" className={styles.primaryBtn}>
					Back to Homepage
				</Link>
				<Link to="/products" className={styles.secondaryBtn}>
					Continue Shopping
				</Link>
			</div>
		</div>
	);
};

export default OrderConfirmation;
