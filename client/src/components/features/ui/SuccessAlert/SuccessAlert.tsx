import { useEffect, useState } from "react";
import styles from "./SuccessAlert.module.scss";

interface SuccessAlertProps {
	message: string;
	duration?: number;
}

const SuccessAlert = ({ message, duration = 3000 }: SuccessAlertProps) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
		}, duration);

		return () => clearTimeout(timer);
	}, [duration]);

	if (!visible) return null;

	return <div className={styles.alert}>{message}</div>;
};

export default SuccessAlert;
