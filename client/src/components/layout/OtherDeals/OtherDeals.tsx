import styles from "./OtherDeals.module.scss";
import ButtonSecondary from "../../utils/ButtonSecondary/ButtonSecondary";

const OtherDeals = () => {
	return (
		<div className={styles.container}>
			<div className={styles.grid}>
				<div className={styles.topRow}>
					<div className={styles.topSquare}>
						<img
							src="/img/placeholder1.png"
							alt="Product"
						/>
						<div className={styles.textOverlay}>
							<div className={styles.text}>
								<p>Merge conflicts build character.</p>
							</div>
						</div>
					</div>
					<div className={styles.topSquare}>
						<img
							src="/img/placeholder2.png"
							alt="Product"
						/>
					</div>
					<div className={styles.topRectangle}>
						<img
							src="/img/placeholderHorizontal.png"
							alt="Product"
						/>
						<div className={styles.textOverlayRectangle}>
							<p className={styles.overlayTextRectangle}>
								Caffeine-driven development.
							</p>
							<div className={styles.overlayButtonRectangle}>
								<ButtonSecondary to="/" label="Home" />
							</div>
						</div>
					</div>
				</div>
				<div className={styles.bottomRow}>
					<div className={styles.bottomSquare}>
						<img
							src="/img/placeholder4.png"
							alt="Product"
						/>
						<div className={styles.bottomTextOverlay}>
							<div className={styles.bottomText}>
								<p className={styles.overlayText}>
									Reload your wardrobe for $25
								</p>
								<div className={styles.overlayButton}>
									<ButtonSecondary to="/" label="Home" />
								</div>
							</div>
						</div>
					</div>
					<div className={styles.bottomSquare}>
						<img
							src="/img/placeholder5.png"
							alt="Product"
						/>
					</div>
					<div className={styles.bottomSquare}>
						<img
							src="/img/placeholder6.png"
							alt="Product"
						/>
					</div>
					<div className={styles.getYourOwn}>
						<ButtonSecondary
							to="/products"
							label="Upgrade Stack"
						></ButtonSecondary>
						<p>Push gear that compiles with your vibe.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OtherDeals;
