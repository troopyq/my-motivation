import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
		port: 3002,
		proxy: {
			'/api': {
				target: 'localhost:8000',
			},
		},
	},
})
