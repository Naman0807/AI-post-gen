import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme';
import { Toaster } from 'react-hot-toast';
import ParallaxBackground from '../components/ParallaxBackground';

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ParallaxBackground />
			<Component {...pageProps} />
			<Toaster position="bottom-right" />
		</ThemeProvider>
	);
}

export default MyApp;
