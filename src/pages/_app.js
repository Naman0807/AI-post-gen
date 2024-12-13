import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../theme";
import { Toaster } from "react-hot-toast";
import ParallaxBackground from "../components/ParallaxBackground";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>NexusPost - AI Social Media Content Generator</title>
				<meta
					name="description"
					content="AI-powered social media content creation platform"
				/>
			</Head>
			<CssBaseline />
			<ParallaxBackground />
			<Component {...pageProps} />
			<Toaster position="bottom-right" />
		</ThemeProvider>
	);
}

export default MyApp;
