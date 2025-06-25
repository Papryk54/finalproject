import type { ButtonHTMLAttributes } from "react";
import styles from "./ButtonSubmit.module.scss";
import classNames from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

const ButtonSubmit = ({className, ...rest }: Props) => {
	return (
		<button
			className={classNames(styles.buttonSubmit, className)}
			type="submit"
			{...rest}
		>
		</button>
	);
};

export default ButtonSubmit;
