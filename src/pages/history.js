import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
	Box,
	Container,
	Typography,
	Card,
	CardContent,
	Grid,
	IconButton,
	CircularProgress,
	Tooltip,
	Paper,
	Button,
	useTheme,
} from "@mui/material";
import toast from "react-hot-toast";
import { ContentCopy, Download, ArrowBack, Delete } from "@mui/icons-material";
import { apiRequest } from "../utils/api";

const History = () => {
	const router = useRouter();
	const theme = useTheme();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/auth/login");
			return;
		}
		fetchPosts();
	}, []);

	const handleDeletePost = async (postId) => {
		if (!postId) {
			toast.error("Invalid post ID");
			return;
		}

		try {
			const token = localStorage.getItem("token");
			if (!token) {
				toast.error("Authentication required");
				return;
			}

			const response = await apiRequest(
				`/user/posts/${postId}`,
				"DELETE",
				null
			);

			if (response.status === 200) {
				setPosts(posts.filter((post) => post._id !== postId));
				toast.success("Post deleted successfully");
			} else {
				throw new Error(data.error || "Failed to delete post");
			}
		} catch (error) {
			console.error("Delete error:", error);
			toast.error(error.message || "Failed to delete post");
		}
	};

	const fetchPosts = async () => {
		try {
			const response = await apiRequest("/user/posts", "GET", null);
			if (response.status === 200) {
				const postsWithIds = response.data.posts.map((post) => ({
					...post,
					_id: post._id.$oid || post._id, // Handle both string and ObjectId formats
				}));
				setPosts(postsWithIds.reverse());
			} else {
				throw Error("Failed to fetch posts");
			}
		} catch (error) {
			toast.error("Failed to fetch posts");
		} finally {
			setLoading(false);
		}
	};

	const handleCopyContent = (content) => {
		navigator.clipboard.writeText(content);
		toast.success("Content copied to clipboard!");
	};

	const handleDownloadImage = (imageUrl, index) => {
		const link = document.createElement("a");
		link.href = imageUrl;
		link.download = `post-image-${index}.jpg`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		toast.success("Image download started!");
	};

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "100vh",
					background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
				}}
			>
				<CircularProgress sx={{ color: "#00fff2" }} />
			</Box>
		);
	}

	return (
		<Box
			sx={{
				minHeight: "100vh",
				py: 4,
				background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
			}}
		>
			<Container maxWidth="lg">
				<Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
					<Button
						onClick={() => router.push("/dashboard")}
						startIcon={<ArrowBack />}
						sx={{
							background: "linear-gradient(45deg, #00fff2, #ff00e4)",
							color: "black",
							fontWeight: "bold",
							mr: 2,
							"&:hover": {
								transform: "translateY(-2px)",
								boxShadow: "0 8px 20px rgba(0, 255, 242, 0.3)",
							},
						}}
					>
						Back to Dashboard
					</Button>
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
						Post History
					</Typography>
				</Box>

				<Grid container spacing={3}>
					{posts.map((post, index) => (
						<Grid item xs={12} key={index}>
							<Card
								sx={{
									background: "rgba(13, 25, 48, 0.8)",
									backdropFilter: "blur(10px)",
									border: "1px solid rgba(0, 255, 242, 0.1)",
									boxShadow: "0 8px 32px rgba(0, 255, 242, 0.1)",
									transition: "transform 0.3s ease-in-out",
									"&:hover": {
										transform: "translateY(-4px)",
									},
								}}
							>
								<CardContent>
									<Grid container spacing={3}>
										<Grid item xs={12} md={8}>
											<Box sx={{ mb: 2 }}>
												<Typography
													variant="h6"
													sx={{
														color: theme.palette.primary.main,
														mb: 1,
														display: "flex",
														alignItems: "center",
														justifyContent: "space-between",
													}}
												>
													{post.platform.toUpperCase()} Post
													<Tooltip title="Delete Post" arrow placement="top">
														<IconButton
															onClick={() => {
																handleDeletePost(post._id);
															}}
															sx={{
																color: "#ff4444",
																"&:hover": {
																	backgroundColor: "rgba(255, 68, 68, 0.1)",
																},
															}}
														>
															<Delete />
														</IconButton>
													</Tooltip>
													<Tooltip
														title="Engagement Score"
														arrow
														placement="top"
													>
														<Box
															sx={{
																display: "inline-flex",
																position: "relative",
																width: 50,
																height: 50,
															}}
														>
															<CircularProgress
																variant="determinate"
																value={post.engagement_score}
																size={50}
																sx={{
																	color: (theme) =>
																		post.engagement_score > 70
																			? theme.palette.success.main
																			: post.engagement_score > 40
																			? theme.palette.warning.main
																			: theme.palette.error.main,
																}}
															/>
															<Box
																sx={{
																	position: "absolute",
																	top: 0,
																	left: 0,
																	bottom: 0,
																	right: 0,
																	display: "flex",
																	alignItems: "center",
																	justifyContent: "center",
																}}
															>
																<Typography
																	variant="caption"
																	sx={{ color: "white", fontSize: "0.9rem" }}
																>
																	{`${post.engagement_score}%`}
																</Typography>
															</Box>
														</Box>
													</Tooltip>
												</Typography>
												<Typography
													variant="body2"
													sx={{ color: "rgba(255, 255, 255, 0.7)" }}
												>
													Topic: {post.topic}
												</Typography>
											</Box>
											<Paper
												sx={{
													p: 3,
													background: "rgba(255, 255, 255, 0.05)",
													border: "1px solid rgba(0, 255, 242, 0.1)",
													borderRadius: 2,
													position: "relative",
												}}
											>
												<Typography
													sx={{ color: "white", whiteSpace: "pre-wrap" }}
												>
													{post.content}
												</Typography>
												<IconButton
													onClick={() => handleCopyContent(post.content)}
													sx={{
														position: "absolute",
														top: 8,
														right: 8,
														color: theme.palette.primary.main,
														"&:hover": {
															background: "rgba(0, 255, 242, 0.1)",
														},
													}}
												>
													<ContentCopy />
												</IconButton>
											</Paper>
										</Grid>
										<Grid item xs={12} md={4}>
											{post.images?.map((image, imgIndex) => (
												<Box
													key={imgIndex}
													sx={{
														position: "relative",
														mb: 2,
														"&:hover": {
															transform: "translateY(-4px)",
															transition: "transform 0.3s ease-in-out",
														},
													}}
												>
													<img
														src={image}
														alt={`Post ${index + 1} Image ${imgIndex + 1}`}
														style={{
															width: "100%",
															borderRadius: "12px",
															border: "1px solid rgba(0, 255, 242, 0.2)",
														}}
													/>
													<IconButton
														onClick={() => handleDownloadImage(image, imgIndex)}
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
											))}
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	);
};

export default History;
