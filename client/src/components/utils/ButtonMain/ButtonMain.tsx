import { Link } from "react-router-dom";
import styles from "./ButtonMain.module.scss";

type ButtonProps = {
	to: string;
	label: string;
};

const ButtonMain = ({ to, label }: ButtonProps) => {
	return (
		<div className={styles.container}>
			<Link to={to} className={styles.buttonMain}>
				{label}
			</Link>
		</div>
	);
};

export default ButtonMain;
