import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
const GradientBackground = styled("div")`
	min-height: 100vh;
	background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
	position: relative;
`;

const GlassCard = styled(Card)`
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	transition: transform 0.3s ease;
	&:hover {
		transform: translateY(-5px);
	}
`;

const StyledButton = styled(Button)`
	text-transform: none;
	padding: 12px 32px;
	font-size: 1.1rem;
`;

const Home = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsAuthenticated(!!token);
	}, []);

	return (
		<GradientBackground>
			<Container maxWidth="lg" sx={{ py: 8 }}>
				<Box textAlign="center" mb={8}>
					<Typography
						variant="h1"
						component="h1"
						color="white"
						sx={{
							fontSize: { xs: "2.5rem", md: "3.75rem" },
							fontWeight: 700,
							mb: 2,
						}}
					>
						Welcome to Your Social Media Post Generator
					</Typography>

					<Typography
						variant="h5"
						color="rgba(255, 255, 255, 0.9)"
						sx={{ mb: 6 }}
					>
						Create and Manage Your Social Media Posts Effortlessly
					</Typography>

					<Grid container spacing={4} sx={{ mb: 6 }}>
						<Grid item xs={12} md={4}>
							<GlassCard>
								<CardContent>
									<Typography
										variant="h5"
										component="h2"
										color="white"
										gutterBottom
									>
										AI-Powered
									</Typography>
									<Typography variant="body1" color="rgba(255, 255, 255, 0.8)">
										Generate engaging posts using advanced AI technology
									</Typography>
								</CardContent>
							</GlassCard>
						</Grid>

						<Grid item xs={12} md={4}>
							<GlassCard>
								<CardContent>
									<Typography
										variant="h5"
										component="h2"
										color="white"
										gutterBottom
									>
										Multi-Platform
									</Typography>
									<Typography variant="body1" color="rgba(255, 255, 255, 0.8)">
										Support for LinkedIn, Twitter, Instagram, and more
									</Typography>
								</CardContent>
							</GlassCard>
						</Grid>

						<Grid item xs={12} md={4}>
							<GlassCard>
								<CardContent>
									<Typography
										variant="h5"
										component="h2"
										color="white"
										gutterBottom
									>
										Image Generation
									</Typography>
									<Typography variant="body1" color="rgba(255, 255, 255, 0.8)">
										Create matching visuals for your posts automatically
									</Typography>
								</CardContent>
							</GlassCard>
						</Grid>
					</Grid>

					<Box sx={{ mt: 4 }}>
						{isAuthenticated ? (
							<Link href="/dashboard" passHref>
								<StyledButton
									variant="contained"
									color="primary"
									sx={{
										backgroundColor: "white",
										color: "#1e3c72",
										"&:hover": {
											backgroundColor: "rgba(255, 255, 255, 0.9)",
										},
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
											backgroundColor: "white",
											color: "#1e3c72",
											"&:hover": {
												backgroundColor: "rgba(255, 255, 255, 0.9)",
											},
										}}
									>
										Log In
									</StyledButton>
								</Link>
								<Link href="/auth/register" passHref>
									<StyledButton
										variant="outlined"
										sx={{
											borderColor: "white",
											color: "white",
											"&:hover": {
												borderColor: "rgba(255, 255, 255, 0.9)",
												backgroundColor: "rgba(255, 255, 255, 0.1)",
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
					position: "absolute",
					bottom: 0,
					width: "100%",
					backgroundColor: "rgba(0, 0, 0, 0.2)",
					backdropFilter: "blur(10px)",
					py: 2,
				}}
			>
				<Typography variant="body2" color="white" align="center">
					© 2024 Your App Name. All Rights Reserved.
				</Typography>
			</Box>
		</GradientBackground>
	);
};

export default Home;
