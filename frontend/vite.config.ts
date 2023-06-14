import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	base: './',
	server: {
		cors: true,
		port: 3002,
		// origin: 'http://localhost:3000/',
		// proxy: {
		// 	'/api': {
		// 		target: 'http://localhost:3000',
		// 		changeOrigin: true,
		// 		rewrite: path => path.replace(/^\/api/, '')
		// 	}
		// },
	},
});
