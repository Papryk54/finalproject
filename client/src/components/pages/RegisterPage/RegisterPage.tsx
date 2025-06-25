import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { registerUser } from "../../../redux/auth/auth.thunks";
import styles from "./RegisterPage.module.scss";
import ButtonSubmit from "../../utils/ButtonSubmit/ButtonSubmit";

const RegisterPage = () => {
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!email || !password || !name) {
			setError("All inputs are required.");
			setSuccessMessage(null);
			return;
		}

		setError(null);
		setSuccessMessage(null);

		const result = await dispatch(registerUser({ email, password, name }));

		if (registerUser.rejected.match(result)) {
			setError(result.payload ?? "Registration failed");
		} else {
			setSuccessMessage("Account created successfully!");
			setEmail("");
			setPassword("");
			setName("");
		}
	};

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>Register</h2>

			{error && <p className={styles.error}>{error}</p>}
			{successMessage && <p className={styles.success}>{successMessage}</p>}

			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.inputGroup}>
					<label htmlFor="name" className={styles.label}>
						Username
					</label>
					<input
						type="text"
						id="name"
						className={styles.input}
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>

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

				<ButtonSubmit>Register</ButtonSubmit>
			</form>
		</div>
	);
};

export default RegisterPage;
