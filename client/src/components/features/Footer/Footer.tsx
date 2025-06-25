import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.column}>
					<h4>Quick Links</h4>
					<div className={styles.linkRow}>
						<Link to="/">Home</Link>
						<Link to="/products">Shop</Link>
						<Link to="/about">About</Link>
						<Link to="/contact">Contact</Link>
					</div>
				</div>
				<div className={styles.column}>
					<h4>Follow Us</h4>
					<div className={styles.linkRow}>
						<a href="https://instagram.com" target="_blank" rel="noreferrer">
							Instagram
						</a>
						<a href="https://twitter.com" target="_blank" rel="noreferrer">
							Twitter
						</a>
						<a href="https://facebook.com" target="_blank" rel="noreferrer">
							Facebook
						</a>
					</div>
				</div>
				<div className={styles.bottomBar}>
					<p>© {currentYear} FluxShop. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
