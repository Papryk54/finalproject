import classNames from "classnames";
import styles from "./VariantSelector.module.scss";

interface Variant {
	id: string;
	label: string;
	price: number;
}

interface Props {
	variants: Variant[];
	selectedId: string | null;
	onChange: (id: string, price: number) => void;
}

const VariantSelector = ({ variants, selectedId, onChange }: Props) => {
	const sortedVariants = [...variants].sort((a, b) => a.price - b.price);

	return (
		<fieldset className={styles.wrapper}>
			<legend className={styles.heading}>Variants</legend>
			<div className={styles.options}>
				{sortedVariants.map((variant) => (
					<div key={variant.id} className={styles.optionWrapper}>
						<label
							className={classNames(styles.option, {
								[styles.active]: variant.id === selectedId,
							})}
						>
							<input
								type="radio"
								name="variant"
								value={variant.id}
								checked={selectedId === variant.id}
								onChange={() => onChange(variant.id, variant.price)}
							/>
							<span>{variant.label}</span>
						</label>
						<p className={styles.price}>{variant.price} $</p>
					</div>
				))}
			</div>
		</fieldset>
	);
};

export default VariantSelector;
