// src/pages/index.js
import { useEffect, useState } from "react";
import Link from "next/link";
import {
	Button,
	Card,
	CardContent,
	Typography,
	Container,
	Grid,
	Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom styled components
const StyledButton = styled(Button)(() => ({
	textTransform: "none",
	padding: "12px 32px",
	fontSize: "1.1rem",
	borderRadius: "8px",
	transition: "all 0.3s ease-in-out",
	"&:hover": {
		transform: "translateY(-2px)",
		boxShadow: "0 8px 20px rgba(0, 255, 242, 0.3)",
	},
}));

const GlassCard = styled(Card)(() => ({
	backgroundImage:
		"linear-gradient(135deg, rgba(13, 25, 48, 0.9), rgba(13, 25, 48, 0.4))",
	backdropFilter: "blur(10px)",
	border: "1px solid rgba(0, 255, 242, 0.1)",
	boxShadow: "0 8px 32px rgba(0, 255, 242, 0.1)",
	transition: "all 0.3s ease-in-out",
	"&:hover": {
		transform: "translateY(-5px)",
		boxShadow: "0 12px 40px rgba(0, 255, 242, 0.2)",
	},
}));

const Home = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsAuthenticated(!!token);
	}, []);

	return (
		<Box
			sx={{
				minHeight: "100vh",
				position: "relative",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Container maxWidth="lg" sx={{ py: 8, flex: 1 }}>
				<Box textAlign="center" mb={8}>
					<Typography
						variant="h1"
						component="h1"
						sx={{
							fontSize: { xs: "2.5rem", md: "3.75rem" },
							fontWeight: 700,
							mb: 2,
							backgroundImage: "linear-gradient(45deg, #00fff2, #ff00e4)",
							backgroundClip: "text",
							WebkitBackgroundClip: "text",
							color: "transparent",
							textShadow: "0 0 20px rgba(0, 255, 242, 0.3)",
						}}
					>
						Welcome to PostCraft
					</Typography>

					<Typography
						variant="h5"
						sx={{
							mb: 6,
							color: "text.secondary",
						}}
					>
						AI-Powered Social Media Content Creation
					</Typography>
					<Grid container spacing={4} sx={{ mb: 6 }}>
						{[
							{
								title: "AI-Powered",
								description:
									"Generate engaging posts using advanced AI technology",
							},
							{
								title: "Multi-Platform",
								description:
									"Support for LinkedIn and Twitter and many more to come",
							},
							{
								title: "Image Generation",
								description:
									"Create matching visuals for your posts automatically",
							},
						].map((feature, index) => (
							<Grid item xs={12} md={4} key={index}>
								<GlassCard>
									<CardContent>
										<Typography
											variant="h5"
											component="h2"
											color="primary"
											gutterBottom
										>
											{feature.title}
										</Typography>
										<Typography variant="body1" color="text.secondary">
											{feature.description}
										</Typography>
									</CardContent>
								</GlassCard>
							</Grid>
						))}
					</Grid>
					<Box sx={{ mt: 4 }}>
						{isAuthenticated ? (
							<Link href="/dashboard" passHref>
								<StyledButton
									variant="contained"
									sx={{
										background: "linear-gradient(45deg, #00fff2, #ff00e4)",
										color: "background.default",
										fontWeight: "bold",
									}}
								>
									Go to Dashboard
								</StyledButton>
							</Link>
						) : (
							<Box sx={{ "& > *": { mx: 1 } }}>
								<Link href="/auth/login" passHref>
									<StyledButton
										variant="contained"
										sx={{
											background: "linear-gradient(45deg, #00fff2, #ff00e4)",
											color: "background.default",
											fontWeight: "bold",
										}}
									>
										Log In
									</StyledButton>
								</Link>
								<Link href="/auth/register" passHref>
									<StyledButton
										variant="outlined"
										sx={{
											borderColor: "primary.main",
											color: "primary.main",
											"&:hover": {
												borderColor: "primary.light",
												backgroundColor: "rgba(0, 255, 242, 0.1)",
											},
										}}
									>
										Register
									</StyledButton>
								</Link>
							</Box>
						)}
					</Box>
				</Box>
			</Container>

			<Box
				component="footer"
				sx={{
					width: "100%",
					backgroundColor: "rgba(13, 25, 48, 0.8)",
					backdropFilter: "blur(10px)",
					borderTop: "1px solid rgba(0, 255, 242, 0.1)",
					py: 2,
				}}
			>
				<Typography variant="body2" color="text.secondary" align="center">
					© 2024 PostCraft. All Rights Reserved.
				</Typography>
			</Box>
		</Box>
	);
};

export default Home;
