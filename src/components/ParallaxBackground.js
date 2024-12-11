import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

const ParallaxBackground = () => {
	const backgroundRef = useRef(null);

	useEffect(() => {
		const handleMouseMove = (e) => {
			if (!backgroundRef.current) return;

			const { clientX, clientY } = e;
			const { innerWidth, innerHeight } = window;

			const moveX = ((clientX - innerWidth / 2) / innerWidth) * 20;
			const moveY = ((clientY - innerHeight / 2) / innerHeight) * 20;

			backgroundRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<Box
			ref={backgroundRef}
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: -1,
				transition: "transform 0.2s ease-out",
				"&::before": {
					content: '""',
					position: "absolute",
					top: "0",
					left: "0",
					right: "0",
					bottom: "0",
					background:
						"radial-gradient(circle at 50% 50%, rgba(0, 255, 242, 0.1) 0%, rgba(255, 0, 228, 0.1) 100%)",
					filter: "blur(100px)",
				},
				"&::after": {
					content: '""',
					position: "absolute",
					top: "0",
					left: "0",
					right: "0",
					bottom: "0",
					background: 'url("/grid.png")',
					opacity: 0.1,
					animation: "grid-animation 20s linear infinite",
				},
				"@keyframes grid-animation": {
					"0%": { transform: "translateZ(0)" },
					"100%": { transform: "translateZ(100px)" },
				},
			}}
		/>
	);
};

export default ParallaxBackground;
