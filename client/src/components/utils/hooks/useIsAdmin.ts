import { useEffect, useState } from "react";
import { jwtDecode, type JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
	role?: string;
}

export const useIsAdmin = (): boolean => {
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const decoded = jwtDecode<CustomJwtPayload>(token);
				setIsAdmin(decoded.role === "admin");
			} catch {
				setIsAdmin(false);
			}
		}
	}, []);

	return isAdmin;
};
