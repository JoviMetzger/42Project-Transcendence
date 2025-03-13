// src/components/about.ts
import { renderPage } from '../index';

export function setupAboutPage() {
  const root = document.getElementById('app');
  if (root) {
    root.innerHTML = `
      <div class="min-h-screen bg-blue-100 flex items-center justify-center">
        <div class="bg-white p-8 rounded shadow-md text-center">
          <h1 class="text-2xl font-bold text-blue-600 mb-4">About Page</h1>
          <p class="text-gray-700 mb-4">This is a simple about page styled with Tailwind CSS.</p>
          <button id="toHome" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Go to Home Page
          </button>
            <button id="toCounter" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Go to counter Page
          </button>
        </div>
      </div>
    `;

    document.getElementById('toHome')?.addEventListener('click', () => {
      window.history.pushState({}, '', '/');
      renderPage();
    });
    document.getElementById('toCounter')?.addEventListener('click', () => {
      window.history.pushState({}, '', '/counter');
      renderPage();
    });
  }
}