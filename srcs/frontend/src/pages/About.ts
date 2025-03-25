export function About() {
	return `
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">About Page</h1>
      <button 
        onclick="window.navigate('/')"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go to Home
      </button>
    </div>
  `;
} 