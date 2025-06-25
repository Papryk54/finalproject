import styles from "./HeroSection.module.scss";
import ButtonMain from "../../utils/ButtonMain/ButtonMain";

const HeroSection = () => {
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				<div className={styles.textWrapper}>
					<h2>We Turn Energy Drinks Into Console Errors</h2>
					<p>
						We Don't Always Fix Bugs, But When We Do - We Break Everything Else.
						Check out our merch, it won't help you be better developer, but at
						least you will debug code with style
					</p>
					<ButtonMain to="/about" label="About" />
				</div>
			</div>
			<div className={styles.image}>
				<img src="/img/HeroImg.png" alt="Main Deal" />
			</div>
		</div>
	);
};

export default HeroSection;
