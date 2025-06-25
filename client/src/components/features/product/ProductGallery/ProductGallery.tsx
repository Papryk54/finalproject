import styles from "./ProductGallery.module.scss";

interface Props {
	images: { id: string; url: string }[];
	selectedIndex: number;
	onSelect: (index: number) => void;
}

const ProductGallery = ({ images, selectedIndex, onSelect }: Props) => {
	if (images.length === 0) return <p className={styles.noImages}>No images.</p>;

	return (
		<div className={styles.gallery}>
			<div className={styles.preview}>
				<img
					src={images[selectedIndex].url}
					alt={`Main image ${selectedIndex + 1}`}
				/>
			</div>
			<div className={styles.thumbs}>
				{images.map((img, i) => (
					<button
						key={img.id}
						onClick={() => onSelect(i)}
						disabled={i === selectedIndex}
						className={i === selectedIndex ? styles.activeThumb : ""}
						aria-label={`Preview image ${i + 1}`}
					>
						<img src={img.url} alt={`Thumbnail ${i + 1}`} />
					</button>
				))}
			</div>
		</div>
	);
};

export default ProductGallery;
