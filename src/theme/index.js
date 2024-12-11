import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#00fff2",
			light: "#5cffe4",
			dark: "#00b4ff",
		},
		secondary: {
			main: "#ff00e4",
			light: "#ff5cff",
			dark: "#b400ff",
		},
		background: {
			default: "#0a192f",
			paper: "rgba(13, 25, 48, 0.8)",
		},
		text: {
			primary: "#e6f1ff",
			secondary: "#8892b0",
		},
	},
	typography: {
		fontFamily: '"Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
		h1: {
			backgroundImage: "linear-gradient(45deg, #00fff2, #ff00e4)",
			backgroundClip: "text",
			WebkitBackgroundClip: "text",
			color: "transparent",
			textShadow: "0 0 20px rgba(0, 255, 242, 0.3)",
		},
	},
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
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
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: "8px",
					textTransform: "none",
					transition: "all 0.3s ease-in-out",
					"&:hover": {
						transform: "translateY(-2px)",
						boxShadow: "0 8px 20px rgba(0, 255, 242, 0.3)",
					},
				},
			},
		},
	},
});
