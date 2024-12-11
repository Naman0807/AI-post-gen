// tailwind.config.js
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./src/styles/**/*.{css,scss}", // Ensure that styles are included here
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
