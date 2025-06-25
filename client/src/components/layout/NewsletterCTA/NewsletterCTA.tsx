import { useAppSelector } from "../../../redux/hooks";
import { selectIsLoggedIn } from "../../../redux/auth/auth.selectors";
import SuccessAlert from "../../features/ui/SuccessAlert/SuccessAlert";
import ButtonSecondary from "../../utils/ButtonSecondary/ButtonSecondary";
import styles from "./NewsletterCTA.module.scss";
import { useState } from "react";

const NewsletterCTA = () => {
	const isLoggedIn = useAppSelector(selectIsLoggedIn);
	const [showSuccess, setShowSuccess] = useState(false);

	const handleClick = () => {
		setShowSuccess(true);
	};

	return (
		<div className={styles.container}>
			{showSuccess && (
				<SuccessAlert message="Confirmation email has been sent!" />
			)}
			<div className={styles.wrapper}>
				<div className={styles.topSection}>
					<div className={styles.image}>
						<img src="/img/placeholderTransparent.png" alt="Newsletter promo" />
					</div>
					<div className={styles.text}>
						<h3>Newsletter Promo Code</h3>
						<p>
							Sign up for our newsletter and be the first to get an exclusive
							promo code for your next purchase. Don't miss out!
						</p>
						<h3>Join us!</h3>
					</div>
				</div>

				<div className={styles.bottomBar}>
					<div className={styles.text}>
						<h3>Join our Newsletter</h3>
						{isLoggedIn ? (
							<button onClick={handleClick} className={styles.sendBtn}>
								<ButtonSecondary label="Join!" />
							</button>
						) : (
							<ButtonSecondary to="/login" label="Sign In" />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsletterCTA;
