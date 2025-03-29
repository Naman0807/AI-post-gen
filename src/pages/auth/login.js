import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
	TextField,
	Button,
	Card,
	CardContent,
	Typography,
	Box,
	Container,
	Alert,
	useTheme,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { apiRequest } from "../../utils/api";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const theme = useTheme();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const loginData = {
				email,
				password,
			};
			const response = await apiRequest("/auth/login", "POST", loginData);

			// Store token
			localStorage.setItem("token", response.data.token);

			// Store user info
			localStorage.setItem("user", JSON.stringify(response.data.user));

			// Store API keys if they exist in the response
			if (response.data.api_keys) {
				localStorage.setItem("hf_api_key", response.data.api_keys.hf_api_key);
				localStorage.setItem(
					"gemini_api_key",
					response.data.api_keys.gemini_api_key
				);
			}

			// Check if there's a warning message
			if (response.data.warning) {
				console.warn(response.data.warning);
			}

			// Redirect to dashboard
			router.push("/dashboard");
		} catch (err) {
			console.error("Login error:", err);
			setError(
				err.response?.data?.error ||
					"An error occurred during login. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				py: 4,
				position: "relative",
				overflow: "hidden",
			}}
		>
			<Container maxWidth="sm">
				<Card
					sx={{
						position: "relative",
						overflow: "visible",
						backgroundColor: "rgba(13, 25, 48, 0.9)",
						"&::before": {
							content: '""',
							position: "absolute",
							top: -2,
							left: -2,
							right: -2,
							bottom: -2,
							background: "linear-gradient(45deg, #00fff2, #ff00e4)",
							borderRadius: "inherit",
							zIndex: -1,
							animation: "borderGlow 2.5s ease-in-out infinite alternate",
						},
					}}
				>
					<CardContent sx={{ p: 4 }}>
						<Typography
							variant="h4"
							component="h1"
							align="center"
							gutterBottom
							sx={{
								fontWeight: 700,
								background: "linear-gradient(20deg, #00fff2, #ff11e4)",
								backgroundClip: "text",
								WebkitBackgroundClip: "text",
								color: "transparent",
								textShadow: "0 0 20px rgba(0, 255, 151, 0.7)",
								mb: 4,
							}}
						>
							Welcome to PostCraft
						</Typography>

						{error && (
							<Alert
								severity="error"
								sx={{
									mb: 3,
									backgroundColor: "rgba(255, 0, 0, 0.1)",
									color: "#ff4444",
									border: "1px solid rgba(255, 0, 0, 0.3)",
								}}
							>
								{error}
							</Alert>
						)}

						<form onSubmit={handleSubmit}>
							<TextField
								fullWidth
								label="Email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								margin="normal"
								InputProps={{
									startAdornment: (
										<Email sx={{ mr: 1, color: theme.palette.primary.main }} />
									),
									sx: { color: "#fff" },
								}}
								InputLabelProps={{
									sx: { color: "rgba(255, 255, 255, 0.7)" },
								}}
								sx={{
									"& .MuiOutlinedInput-root": {
										"& fieldset": {
											borderColor: "rgba(255, 255, 255, 0.2)",
										},
										"&:hover fieldset": {
											borderColor: theme.palette.primary.main,
										},
										"&.Mui-focused fieldset": {
											borderColor: theme.palette.primary.main,
										},
									},
								}}
							/>

							<TextField
								fullWidth
								label="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								margin="normal"
								InputProps={{
									startAdornment: (
										<Lock sx={{ mr: 1, color: theme.palette.primary.main }} />
									),
									sx: { color: "#fff" },
								}}
								InputLabelProps={{
									sx: { color: "rgba(255, 255, 255, 0.7)" },
								}}
								sx={{
									"& .MuiOutlinedInput-root": {
										"& fieldset": {
											borderColor: "rgba(255, 255, 255, 0.2)",
										},
										"&:hover fieldset": {
											borderColor: theme.palette.primary.main,
										},
										"&.Mui-focused fieldset": {
											borderColor: theme.palette.primary.main,
										},
									},
								}}
							/>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								size="large"
								disabled={loading}
								sx={{
									mt: 4,
									mb: 2,
									background: "linear-gradient(45deg, #00fff2, #ff00e4)",
									color: "#000",
									fontWeight: "bold",
									transition: "all 0.3s ease-in-out",
									"&:hover": {
										transform: "translateY(-2px)",
										boxShadow: "0 8px 20px rgba(0, 255, 242, 0.3)",
									},
								}}
							>
								{loading ? "Logging in..." : "Login"}
							</Button>
						</form>

						<Typography
							align="center"
							variant="body2"
							sx={{
								color: "rgba(255, 255, 255, 0.7)",
								mt: 2,
							}}
						>
							Don&apos;t have an account?{" "}
							<Link
								href="/auth/register"
								style={{
									color: theme.palette.primary.main,
									textDecoration: "none",
									fontWeight: 500,
									textShadow: "0 0 10px rgba(0, 255, 242, 0.3)",
								}}
							>
								Register
							</Link>
						</Typography>
					</CardContent>
				</Card>
			</Container>
		</Box>
	);
};

export default Login;
