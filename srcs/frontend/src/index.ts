// src/index.ts
import { setupCounter } from './components/counter';
import { setupAboutPage } from './components/about';

document.addEventListener('DOMContentLoaded', () => {
	renderPage();
});

export function renderPage() {
	const root = document.getElementById('app');
	if (root) {
		if (window.location.pathname === '/counter') {
			setupCounter();
		} else if (window.location.pathname === '/about') {
			setupAboutPage();
		} else {
			root.innerHTML = `
        <div class="min-h-screen bg-gray-100 flex items-center justify-center">
          <div class="bg-white p-8 rounded shadow-md text-center">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Home Page</h1>
            <button id="toCounter" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Go to Counter Page
            </button>
            <button id="toAbout" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Go to About Page
            </button>
          </div>
        </div>
      `;

			document.getElementById('toCounter')?.addEventListener('click', () => {
				window.history.pushState({}, '', '/counter');
				renderPage();
			});

			document.getElementById('toAbout')?.addEventListener('click', () => {
				window.history.pushState({}, '', '/about');
				renderPage();
			});
		}
	}
}

window.addEventListener('popstate', renderPage);