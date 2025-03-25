import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	root: '.',
	plugins: [
		tailwindcss(),
	],
	server: {
		historyApiFallback: true, // Ensures SPA routing works
		port: process.env.VITE_FRONTEND_PORT ? parseInt(process.env.VITE_FRONTEND_PORT) : 5173,
		host: '0.0.0.0',
		strictPort: true
	},
})
