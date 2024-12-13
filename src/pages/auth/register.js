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
import { Email, Lock, Person } from "@mui/icons-material";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const router = useRouter();
	const theme = useTheme();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`http://localhost:5000/auth/register`, {
				name,
				email,
				password,
			});
			localStorage.setItem("token", response.data.token);
			router.push("/dashboard");
		} catch (err) {
			setError(err.response?.data?.error || "An error occurred");
		}
	};

	const textFieldStyles = {
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
	};

	const inputProps = {
		sx: { color: "#fff" },
	};

	const inputLabelProps = {
		sx: { color: "rgba(255, 255, 255, 0.7)" },
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
						"@keyframes borderGlow": {
							"0%": { opacity: 0.5 },
							"100%": { opacity: 1 },
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
								fontWeight: 900,
								background: "linear-gradient(45deg, #00fff2, #ff00e4)",
								backgroundClip: "text",
								WebkitBackgroundClip: "text",
								color: "transparent",
								textShadow: "0 0 20px rgba(0, 255, 242, 0.3)",
								mb: 4,
							}}
						>
							Create Your NexusPost Account
						</Typography>

						{error && (
							<Alert
								severity="error"
								sx={{
									mb: 3,
									backgroundColor: "rgba(255, 0, 0, 0.1)",
									color: "#ff4444",
								}}
							>
								{error}
							</Alert>
						)}

						<form onSubmit={handleSubmit}>
							<TextField
								fullWidth
								label="Full Name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								margin="normal"
								InputProps={{
									startAdornment: (
										<Person sx={{ mr: 1, color: theme.palette.primary.main }} />
									),
									...inputProps,
								}}
								InputLabelProps={inputLabelProps}
								sx={textFieldStyles}
							/>

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
									...inputProps,
								}}
								InputLabelProps={inputLabelProps}
								sx={textFieldStyles}
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
									...inputProps,
								}}
								InputLabelProps={inputLabelProps}
								sx={textFieldStyles}
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
									transition: "all 0.3s ease-in-out",
									"&:hover": {
										transform: "translateY(-2px)",
										boxShadow: "0 8px 20px rgba(0, 255, 242, 0.3)",
									},
								}}
							>
								Register
							</Button>
						</form>

						<Typography
							align="center"
							variant="body2"
							sx={{ color: theme.palette.text.secondary }}
						>
							Already have an account?{" "}
							<Link
								href="/auth/login"
								style={{
									color: theme.palette.primary.main,
									textDecoration: "none",
									fontWeight: 500,
								}}
							>
								Login
							</Link>
						</Typography>
					</CardContent>
				</Card>
			</Container>
		</Box>
	);
};

export default Register;
