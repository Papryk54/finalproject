import styles from "./CallToContact.module.scss";
import ButtonMain from "../../utils/ButtonMain/ButtonMain";

const CallToContact = () => {
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<h3>Any questions?</h3>
				<p>
					Got a crazy idea for a product? Or just wanna say hi? Hit us up and
					let's build something nerdy together.
				</p>
				<ButtonMain to="/contact" label="Contact Us" />
			</div>
			<div className={styles.right}>
				<img
					src="/img/placeholder3.png"
					alt="Design Gallery"
					loading="lazy"
				/>
			</div>
		</div>
	);
};

export default CallToContact;
