import { Link } from "react-router-dom";
import styles from "./ButtonSecondary.module.scss";

type ButtonProps = {
	to?: string;
	label: string;
	type?: "button" | "submit" | "reset" | undefined;
	onClick?: () => void;
	className?: string;
};

const ButtonSecondary = ({ to, label, type, onClick }: ButtonProps) => {
	return (
		<div className={styles.container}>
			{to ? (
				<Link to={to} className={styles.buttonSecondary}>
					{label}
				</Link>
			) : (
				<button
					onClick={onClick}
					type={type}
					className={styles.buttonSecondary}
				>
					{label}
				</button>
			)}
		</div>
	);
};

export default ButtonSecondary;
