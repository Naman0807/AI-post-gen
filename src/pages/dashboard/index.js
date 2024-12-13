import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
	Box,
	Container,
	Typography,
	Card,
	CardContent,
	TextField,
	Button,
	Grid,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	CircularProgress,
	Alert,
	Paper,
	IconButton,
	Divider,
	useTheme,
	Slider,
	Tooltip,
} from "@mui/material";
import { ContentCopy, Download, Send, Logout } from "@mui/icons-material";
import HistoryIcon from "@mui/icons-material/History";
import { alpha } from "@mui/material/styles";
import History from "../history";

const Dashboard = () => {
	const router = useRouter();
	const theme = useTheme();

	const [topic, setTopic] = useState("");
	const [platform, setPlatform] = useState("linkedin");
	const [imageCount, setImageCount] = useState(1);
	const [generatedContent, setGeneratedContent] = useState("");
	const [generatedImage, setGeneratedImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [hfApiKey, setHfApiKey] = useState("");
	const [geminiApiKey, setGeminiApiKey] = useState("");
	const [isConfigured, setIsConfigured] = useState(false);
	const [engagementScore, setEngagementScore] = useState(null);
	const [postLength, setPostLength] = useState("medium");
	const [temperature, setTemperature] = useState(0.7);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/auth/login");
			toast.error("Please login to continue");
		}
	}, [router]);

	useEffect(() => {
		const geminiApiKey = localStorage.getItem("gemini_api_key");
		const hfApiKey = localStorage.getItem("hf_api_key");
		setGeminiApiKey(geminiApiKey);
		setHfApiKey(hfApiKey);
	}, []);

	const handleInitializeAPI = async () => {
		if (!hfApiKey || !geminiApiKey) {
			toast.error("Please enter both API keys");
			return;
		}

		try {
			const token = localStorage.getItem("token");
			const response = await fetch(`http://localhost:5000/initialize`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					hf_api_key: hfApiKey,
					gemini_api_key: geminiApiKey,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to initialize APIs");
			}
			setIsConfigured(true);
			localStorage.setItem("gemini_api_key", geminiApiKey);
			localStorage.setItem("hf_api_key", hfApiKey);
			toast.success("APIs initialized successfully!");
		} catch (err) {
			toast.error(err.message);
		}
	};

	const handleGenerate = async () => {
		if (!topic) {
			setError("Please enter a topic");
			toast.error("Please enter a topic");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const token = localStorage.getItem("token");
			const response = await fetch(`http://localhost:5000/generate_post`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					topic,
					platform,
					imageCount,
					postLength,
					temperature,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to generate content");
			}

			setGeneratedContent(data.text);
			setGeneratedImage(data.images);
			setEngagementScore(data.engagement_score);
			toast.success("Content generated successfully!");
		} catch (err) {
			setError(err.message || "Something went wrong");
			toast.error(err.message || "Failed to generate content");
		} finally {
			setLoading(false);
		}
	};

	const handleCopyContent = () => {
		navigator.clipboard.writeText(generatedContent);
		toast.success("Content copied to clipboard!");
	};

	const handleDownloadImage = (imageUrl, index) => {
		if (imageUrl) {
			const link = document.createElement("a");
			link.href = imageUrl;
			link.download = `generated-image-${index + 1}.jpg`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			toast.success(`Image ${index + 1} download started!`);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("gemini_api_key");
		localStorage.removeItem("hf_api_key");
		toast.success("Logged out successfully");
		router.push("/auth/login");
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				py: 4,
				position: "relative",
			}}
		>
			<Container maxWidth="lg">
				{/* Header Section */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 4,
					}}
				>
					<Typography
						variant="h4"
						sx={{
							background: "linear-gradient(45deg, #00fff2, #ff00e4)",
							backgroundClip: "text",
							WebkitBackgroundClip: "text",
							color: "transparent",
							fontWeight: "bold",
							textShadow: "0 0 20px rgba(0, 255, 242, 0.3)",
						}}
					>
						NexusPost Dashboard
					</Typography>

					<Button
						onClick={() => router.push("/history")}
						startIcon={<HistoryIcon />}
						sx={{
							background: "linear-gradient(45deg, #ff00e4, #00fff2)",
							color: "black",
							fontWeight: "bold",
							"&:hover": {
								transform: "translateY(-2px)",
								boxShadow: "0 8px 20px rgba(0, 255, 242, 0.3)",
							},
						}}
					>
						History
					</Button>

					<Button
						onClick={handleLogout}
						startIcon={<Logout />}
						sx={{
							background: "linear-gradient(45deg, #ff00e4, #00fff2)",
							color: "black",
							fontWeight: "bold",
							"&:hover": {
								transform: "translateY(-2px)",
								boxShadow: "0 8px 20px rgba(0, 255, 242, 0.3)",
							},
						}}
					>
						Logout
					</Button>
				</Box>

				{/* API Configuration Section */}
				<Card
					sx={{
						mb: 4,
						background: "rgba(13, 25, 48, 0.8)",
						backdropFilter: "blur(10px)",
						border: "1px solid rgba(0, 255, 242, 0.1)",
						boxShadow: "0 8px 32px rgba(0, 255, 242, 0.1)",
					}}
				>
					<CardContent>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ color: theme.palette.primary.main }}
						>
							API Configuration
						</Typography>
						<Grid container spacing={2}>
							<Grid item xs={12} md={5}>
								<TextField
									fullWidth
									label="Hugging Face API Key"
									type="password"
									value={hfApiKey}
									onChange={(e) => setHfApiKey(e.target.value)}
									margin="normal"
									InputProps={{
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
										},
									}}
								/>
							</Grid>
							<Grid item xs={12} md={5}>
								<TextField
									fullWidth
									label="Gemini API Key"
									type="password"
									value={geminiApiKey}
									onChange={(e) => setGeminiApiKey(e.target.value)}
									margin="normal"
									InputProps={{
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
										},
									}}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={2}
								sx={{ display: "flex", alignItems: "center" }}
							>
								<Button
									variant="contained"
									fullWidth
									onClick={handleInitializeAPI}
									disabled={!hfApiKey || !geminiApiKey}
									sx={{
										mt: 2,
										background: "linear-gradient(45deg, #00fff2, #ff00e4)",
										color: "black",
										fontWeight: "bold",
										"&:hover": {
											transform: "translateY(-2px)",
											boxShadow: "0 8px 20px rgba(0, 255, 242, 0.3)",
										},
									}}
								>
									Initialize APIs
								</Button>
							</Grid>
						</Grid>
						{isConfigured && (
							<Alert
								severity="success"
								sx={{
									mt: 2,
									backgroundColor: "rgba(0, 255, 242, 0.1)",
									color: "#00fff2",
									border: "1px solid rgba(0, 255, 242, 0.3)",
								}}
							>
								APIs configured successfully
							</Alert>
						)}
					</CardContent>
				</Card>

				{/* Main Content Grid */}
				<Grid container spacing={4}>
					{/* Input Section */}
					<Grid item xs={12} md={6}>
						<Card
							sx={{
								height: "100%",
								background: "rgba(13, 25, 48, 0.8)",
								backdropFilter: "blur(10px)",
								border: "1px solid rgba(0, 255, 242, 0.1)",
								boxShadow: "0 8px 32px rgba(0, 255, 242, 0.1)",
							}}
						>
							<CardContent>
								<Typography
									variant="h6"
									gutterBottom
									sx={{ color: theme.palette.primary.main }}
								>
									Generate Content
								</Typography>
								<TextField
									fullWidth
									label="Topic"
									value={topic}
									onChange={(e) => setTopic(e.target.value)}
									margin="normal"
									multiline
									rows={3}
									InputProps={{
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
										},
									}}
								/>

								<FormControl component="fieldset" sx={{ my: 2 }}>
									<Typography
										variant="subtitle1"
										sx={{ color: "rgba(255, 255, 255, 0.7)" }}
									>
										Platform
									</Typography>
									<RadioGroup
										row
										value={platform}
										onChange={(e) => setPlatform(e.target.value)}
									>
										{["LinkedIn", "Twitter", "Instagram"].map((p) => (
											<FormControlLabel
												key={p.toLowerCase()}
												value={p.toLowerCase()}
												control={
													<Radio
														sx={{
															color: "rgba(255, 255, 255, 0.7)",
															"&.Mui-checked": {
																color: theme.palette.primary.main,
															},
														}}
													/>
												}
												label={
													<Typography sx={{ color: "#fff" }}>{p}</Typography>
												}
											/>
										))}
									</RadioGroup>
								</FormControl>

								<FormControl component="fieldset" sx={{ my: 2, width: "100%" }}>
									<Typography
										variant="subtitle1"
										sx={{ color: "rgba(255, 255, 255, 0.7)" }}
									>
										Post Length
									</Typography>
									<TextField
										select
										fullWidth
										value={postLength}
										onChange={(e) => setPostLength(e.target.value)}
										SelectProps={{
											native: true,
										}}
										sx={{
											"& .MuiOutlinedInput-root": {
												color: "#fff",
												"& fieldset": {
													borderColor: "rgba(255, 255, 255, 0.2)",
												},
												"&:hover fieldset": {
													borderColor: theme.palette.primary.main,
												},
											},
										}}
									>
										<option value="small">Small (150-300 words)</option>
										<option value="medium">Medium (300-400 words)</option>
										<option value="long">Long (400-550 words)</option>
									</TextField>
								</FormControl>

								<FormControl component="fieldset" sx={{ my: 2, width: "100%" }}>
									<Typography
										variant="subtitle1"
										sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}
									>
										Creativity Level: {temperature.toFixed(2)}
									</Typography>
									<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
										<Typography
											sx={{
												color: "rgba(255, 255, 255, 0.5)",
												fontSize: "0.875rem",
											}}
										>
											Focused
										</Typography>
										<Slider
											value={temperature}
											onChange={(_, newValue) => setTemperature(newValue)}
											min={0}
											max={1}
											step={0.1}
											sx={{
												color: theme.palette.primary.main,
												"& .MuiSlider-thumb": {
													"&:hover, &.Mui-focusVisible": {
														boxShadow: `0px 0px 0px 8px ${alpha(
															theme.palette.primary.main,
															0.16
														)}`,
													},
												},
												"& .MuiSlider-rail": {
													opacity: 0.3,
												},
											}}
										/>
										<Typography
											sx={{
												color: "rgba(255, 255, 255, 0.5)",
												fontSize: "0.875rem",
											}}
										>
											Creative
										</Typography>
									</Box>
								</FormControl>

								<FormControl component="fieldset" sx={{ my: 2 }}>
									<Typography
										variant="subtitle1"
										sx={{ color: "rgba(255, 255, 255, 0.7)" }}
									>
										Number of Images
									</Typography>
									<RadioGroup
										row
										value={imageCount}
										onChange={(e) => setImageCount(Number(e.target.value))}
									>
										{[1, 2, 3].map((num) => (
											<FormControlLabel
												key={num}
												value={num}
												control={
													<Radio
														sx={{
															color: "rgba(255, 255, 255, 0.7)",
															"&.Mui-checked": {
																color: theme.palette.primary.main,
															},
														}}
													/>
												}
												label={
													<Typography sx={{ color: "#fff" }}>
														{num} Image{num > 1 ? "s" : ""}
													</Typography>
												}
											/>
										))}
									</RadioGroup>
								</FormControl>

								<Button
									variant="contained"
									fullWidth
									onClick={handleGenerate}
									disabled={loading || !isConfigured}
									startIcon={
										loading ? <CircularProgress size={20} /> : <Send />
									}
									sx={{
										mt: 2,
										background: "linear-gradient(45deg, #00fff2, #ff00e4)",
										color: "black",
										fontWeight: "bold",
										"&:hover": {
											transform: "translateY(-2px)",
											boxShadow: "0 8px 20px rgba(0, 255, 242, 0.3)",
										},
									}}
								>
									{loading ? "Generating..." : "Generate Post"}
								</Button>
							</CardContent>
						</Card>
					</Grid>

					{/* Output Section */}
					<Grid item xs={12} md={6}>
						<Card
							sx={{
								height: "100%",
								background: "rgba(13, 25, 48, 0.8)",
								backdropFilter: "blur(10px)",
								border: "1px solid rgba(0, 255, 242, 0.1)",
								boxShadow: "0 8px 32px rgba(0, 255, 242, 0.1)",
							}}
						>
							<CardContent>
								{generatedContent && (
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 2,
											mb: 2,
										}}
									>
										<Typography
											variant="h6"
											sx={{ color: theme.palette.primary.main }}
										>
											Generated Content
										</Typography>
										<Tooltip
											title="Engagement Score: Higher scores indicate better potential engagement"
											arrow
											placement="top"
											sx={{ fontSize: "1rem" }}
										>
											<Box
												sx={{
													position: "relative",
													display: "inline-flex",
													left: 10,
												}}
											>
												<CircularProgress
													variant="determinate"
													value={engagementScore}
													size={50}
													sx={{
														color: (theme) =>
															engagementScore > 0.7
																? theme.palette.success.main
																: engagementScore > 0.4
																? theme.palette.warning.main
																: theme.palette.error.main,
													}}
												/>
												<Box
													sx={{
														top: 0,
														left: 0,
														bottom: 0,
														right: 0,
														position: "absolute",
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
													}}
												>
													<Typography
														variant="caption"
														component="div"
														color="text.secondary"
														sx={{ fontSize: "1.1rem" }}
													>
														{`${Math.round(engagementScore)}%`}
													</Typography>
												</Box>
											</Box>
										</Tooltip>
										<IconButton
											onClick={handleCopyContent}
											sx={{
												position: "absolute",
												top: 20,
												right: 20,
												color: theme.palette.primary.main,
												"&:hover": {
													background: "rgba(0, 255, 242, 0.1)",
												},
											}}
										>
											<ContentCopy />
										</IconButton>
									</Box>
								)}

								{generatedContent && (
									<Paper
										elevation={0}
										sx={{
											p: 3,
											mb: 3,
											background: "rgba(255, 255, 255, 0.05)",
											border: "1px solid rgba(0, 255, 242, 0.1)",
											borderRadius: 2,
											position: "relative",
										}}
									>
										<Typography
											whiteSpace="pre-wrap"
											sx={{ color: "#fff", lineHeight: 1.6 }}
										>
											{generatedContent}
										</Typography>
									</Paper>
								)}

								{generatedImage && (
									<>
										<Divider
											sx={{
												my: 3,
												borderColor: "rgba(0, 255, 242, 0.1)",
											}}
										/>
										<Typography
											variant="h6"
											gutterBottom
											sx={{ color: theme.palette.primary.main }}
										>
											Generated Images
										</Typography>
										<Grid container spacing={2}>
											{Array.isArray(generatedImage)
												? generatedImage.map((image, index) => (
														<Grid
															item
															xs={12}
															md={imageCount === 1 ? 12 : 6}
															key={index}
														>
															<Box
																sx={{
																	position: "relative",
																	"&:hover": {
																		transform: "translateY(-4px)",
																		transition: "transform 0.3s ease-in-out",
																	},
																}}
															>
																<img
																	src={image}
																	alt={`Generated ${index + 1}`}
																	style={{
																		width: "100%",
																		borderRadius: "12px",
																		border: "1px solid rgba(0, 255, 242, 0.2)",
																	}}
																/>
																<IconButton
																	onClick={() =>
																		handleDownloadImage(image, index)
																	}
																	sx={{
																		position: "absolute",
																		top: 8,
																		right: 8,
																		backgroundColor: "rgba(0, 0, 0, 0.6)",
																		color: theme.palette.primary.main,
																		"&:hover": {
																			backgroundColor: "rgba(0, 0, 0, 0.8)",
																		},
																	}}
																>
																	<Download />
																</IconButton>
															</Box>
														</Grid>
												  ))
												: null}
										</Grid>
									</>
								)}

								{!generatedContent && !generatedImage && (
									<Typography
										variant="body2"
										align="center"
										sx={{
											color: "rgba(255, 255, 255, 0.5)",
											py: 8,
										}}
									>
										Generated content will appear here
									</Typography>
								)}
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Dashboard;
