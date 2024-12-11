// next.config.js

module.exports = {
	webpack(config, { isServer }) {
		// Only mock `fs` and `child_process` on the client-side
		if (!isServer) {
			config.resolve.fallback = {
				fs: false, // Mock 'fs' module
				child_process: false, // Mock 'child_process' module
				path: false, // Optionally mock 'path' module if needed
			};
		}

		return config;
	},
};
