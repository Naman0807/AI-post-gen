// src/utils/api.js
import axios from "axios";
import { BASE_URL } from "./const";
// Helper function for making authenticated requests
export const apiRequest = async (url, method = "GET", data = null) => {
	try {
		const token = localStorage.getItem("token");
		const config = {
			method,
			url: `http://localhost:5000${url}`,
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			data,
		};
		const response = await axios(config);
		return response.data;
	} catch (error) {
		throw new Error(
			error.response ? error.response.data.error : "Something went wrong!"
		);
	}
};
