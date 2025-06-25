import { useState } from "react";
import styles from "./ContactPage.module.scss";
import ButtonSubmit from "../../utils/ButtonSubmit/ButtonSubmit";
import SuccessAlert from "../../features/ui/SuccessAlert/SuccessAlert";

type FormState = {
	name: string;
	email: string;
	message: string;
};

const ContactPage = () => {
	const [formData, setFormData] = useState<FormState>({
		name: "",
		email: "",
		message: "",
	});

	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitted(true);
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Contact Us</h2>
			<form onSubmit={handleSubmit} className={styles.form}>
				<input
					type="text"
					name="name"
					placeholder="Your name"
					value={formData.name}
					onChange={handleChange}
					required
					className={styles.input}
				/>
				<input
					type="email"
					name="email"
					placeholder="Your email"
					value={formData.email}
					onChange={handleChange}
					required
					className={styles.input}
				/>
				<textarea
					name="message"
					placeholder="Your message"
					value={formData.message}
					onChange={handleChange}
					required
					className={styles.textarea}
					rows={5}
				/>
				<ButtonSubmit>Send Message</ButtonSubmit>
				{isSubmitted && (
					<SuccessAlert
						message="Thanks for reaching out"
					/>
				)}
			</form>
		</div>
	);
};

export default ContactPage;
