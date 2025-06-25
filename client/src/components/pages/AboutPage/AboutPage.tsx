import styles from "./AboutPage.module.scss";

const AboutPage = () => {
	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>About FluxShop</h2>
			<p className={styles.text}>
				FluxShop is a modern, fast, and stylish e-commerce platform built with
				cutting-edge technologies like React, Redux, and NestJS. Our mission is
				to provide a smooth shopping experience with blazing-fast performance
				and a slick interface.
			</p>

			<h3 className={styles.subheading}>Built By</h3>
			<p className={styles.text}>
				This project was created by a passionate web developer as part of a
				full-stack portfolio. It features full authentication, admin panel,
				product management, responsive UI, and real-time cart syncing.
			</p>

			<h3 className={styles.subheading}>Tech Stack</h3>
			<ul className={styles.list}>
				<li>React + Redux Toolkit + TypeScript</li>
				<li>NestJS + Prisma + MySQL</li>
				<li>SCSS Modules + CSS Variables</li>
				<li>JWT Auth, Role-based Access</li>
			</ul>
		</div>
	);
};

export default AboutPage;
