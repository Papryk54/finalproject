import { useEffect, useState } from "react";
import styles from "./ErrorAlert.module.scss";

interface ErrorAlertProps {
	message: string;
	duration?: number;
}

const ErrorAlert = ({ message, duration = 3000 }: ErrorAlertProps) => {
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

export default ErrorAlert;
