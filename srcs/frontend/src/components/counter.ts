// src/components/counter.ts
import { renderPage } from '../index';

export function setupCounter() {
	const root = document.getElementById('app');
	if (root) {
		root.innerHTML = `
		<h1>Counter Page blabla</h1>
		<div>
		  <button id="decrement">-</button>
		  <span id="count">0</span>
		  <button id="increment">+</button>
		</div>
		<button id="toHome">Go to Home Page</button>
	  `;

		let count = 0;
		const countElement = document.getElementById('count');

		document.getElementById('increment')?.addEventListener('click', () => {
			count++;
			if (countElement) countElement.textContent = count.toString();
		});

		document.getElementById('decrement')?.addEventListener('click', () => {
			count--;
			if (countElement) countElement.textContent = count.toString();
		});

		document.getElementById('toHome')?.addEventListener('click', () => {
			window.history.pushState({}, '', '/');
			renderPage();
		});
	}
}