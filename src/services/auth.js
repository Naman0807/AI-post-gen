// src/service/auth.js
import axios from "axios";
import { BASE_URL } from "../utils/const";

// Base URL for the API
const API_URL = `http://localhost:5000/auth`; // Replace with your backend URL

// Register a new user
export const register = async (userData) => {
	try {
		const response = await axios.post(`${API_URL}/auth/register`, userData);
		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.error || "Registration failed");
	}
};

// Log in an existing user
export const login = async (email, password) => {
	try {
		const response = await axios.post(`${API_URL}/auth/login`, {
			email,
			password,
		});
		// Save the token to localStorage or sessionStorage
		localStorage.setItem("token", response.data.token);
		return response.data; // Return the response data which includes the token and user details
	} catch (error) {
		throw new Error(error.response?.data?.error || "Login failed");
	}
};

// Get the current user's profile using JWT token
export const getCurrentUser = async () => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No token found, please login");
		}

		const response = await axios.get(`${API_URL}/user/profile`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data; // Return the current user's data
	} catch (error) {
		throw new Error(error.response?.data?.error || "Failed to fetch user data");
	}
};

// Log out the user
export const logout = () => {
	localStorage.removeItem("token"); // Remove the token from localStorage
};

// Check if the user is authenticated
export const isAuthenticated = () => {
	const token = localStorage.getItem("token");
	return token !== null; // If token is in localStorage, the user is authenticated
};
