import { useParams } from "react-router-dom";
import EditProduct from "../../features/EditProduct/EditProduct";
import CreateProduct from "../../features/CreateProduct/CreateProduct";
import styles from "./AdminPage.module.scss";

const AdminPage = () => {
	const { id } = useParams<{ id: string }>();

	return (
		<div className={styles.wrapper}>
			{id ? <EditProduct /> : <CreateProduct />}
		</div>
	);
};

export default AdminPage;
