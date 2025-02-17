import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	root: 'public', // Set the root directory to 'public' for serving the index.html
	plugins: [
		tailwindcss(),
	],
	// ... existing code ...
})