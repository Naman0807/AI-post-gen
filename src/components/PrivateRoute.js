// src/components/PrivateRoute.js
import { useEffect } from "react";
import { useRouter } from "next/router";

const PrivateRoute = ({ children }) => {
	const router = useRouter();
	const token =
		typeof window !== "undefined" ? localStorage.getItem("token") : null;

	useEffect(() => {
		if (!token) {
			router.push("/auth/login"); // Redirect to login if not authenticated
		}
	}, [token, router]);

	return token ? children : null;
};

export default PrivateRoute;
