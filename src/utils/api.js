// src/utils/api.js
import axios from "axios";
import { API_URL } from "./constant";

// Helper function for making authenticated requests
export const apiRequest = async (url, method = "GET", data = null) => {
	try {
		const token = localStorage.getItem("token");
		const config = {
			method,
			url: `${API_URL}${url}`,
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
				"ngrok-skip-browser-warning": "69420",
			},
			data,
		};
		const response = await axios(config);
		console.log(response);
		return response;
	} catch (error) {
		throw new Error(
			error.response ? error.response.data.error : "Something went wrong!"
		);
	}
};
