import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.scss";

import ButtonSecondary from "../../utils/ButtonSecondary/ButtonSecondary";
import ErrorAlert from "../../features/ui/ErrorAlert/ErrorAlert";

import { useAppDispatch } from "../../../redux/hooks";
import { login } from "../../../redux/auth/auth.slice";
import type { UserRole } from "../../../redux/auth/auth.types";

interface LoginResponse {
	access_token: string;
	user: {
		id: string;
		email: string;
		role: string;
	};
}

const LoginPage = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!email || !password) {
			setErrorMessage("Both email and password are required.");
			return;
		}

		setErrorMessage(null);

		try {
			const res = await fetch("http://localhost:3000/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (!res.ok) {
				throw new Error("Failed to log in");
			}

			const data: LoginResponse = await res.json();

			const role = ["user", "admin"].includes(data.user.role)
				? (data.user.role as UserRole)
				: "user";

			dispatch(
				login({
					token: data.access_token,
					user: {
						id: data.user.id,
						email: data.user.email,
						role,
					},
				})
			);

			navigate("/");
		} catch (err: unknown) {
			if (err instanceof Error) {
				setErrorMessage(err.message);
			} else {
				setErrorMessage("An unknown error occurred.");
			}
		}
	};

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>Login</h2>

			{errorMessage && <ErrorAlert message={errorMessage} />}

			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.inputGroup}>
					<label htmlFor="email" className={styles.label}>
						Email
					</label>
					<input
						type="email"
						id="email"
						className={styles.input}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className={styles.inputGroup}>
					<label htmlFor="password" className={styles.label}>
						Password
					</label>
					<input
						type="password"
						id="password"
						className={styles.input}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				<ButtonSecondary label="Login" type="submit" />
			</form>
			<h2 className={styles.register}>No Account?</h2>
			<ButtonSecondary to="/register" label="register" />
		</div>
	);
};

export default LoginPage;
