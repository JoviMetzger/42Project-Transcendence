import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	root: '.',
	plugins: [
		tailwindcss(),
	],
	server: {
		historyApiFallback: true, // Ensures SPA routing works
		port: 5173,
		host: '0.0.0.0',
		strictPort: true
	},
})