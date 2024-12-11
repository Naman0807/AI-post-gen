import { useState } from "react";
import axios from "axios";
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

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const router = useRouter();
	const theme = useTheme();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`http://localhost:5000/auth/login`, {
				email,
				password,
			});
			localStorage.setItem("token", response.data.token);
			router.push("/dashboard");
		} catch (err) {
			setError(err.response?.data?.error || "An error occurred");
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
							animation: "borderGlow 3s ease-in-out infinite alternate",
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
								background: "linear-gradient(45deg, #00fff2, #ff00e4)",
								backgroundClip: "text",
								WebkitBackgroundClip: "text",
								color: "transparent",
								textShadow: "0 0 20px rgba(0, 255, 242, 0.5)",
								mb: 4,
							}}
						>
							Welcome Back
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
								Login
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
							Don't have an account?{" "}
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