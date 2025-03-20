import { Home } from './pages/Home';
import { About } from './pages/About';

const routes: { [key: string]: () => string } = {
	'/': Home,
	'/about': About
};

export function initRouter() {
	// Add navigation to window object
	(window as any).navigate = (path: string) => {
		history.pushState({}, '', path);
		renderContent();
	};

	// Handle browser back/forward buttons
	window.addEventListener('popstate', () => {
		renderContent();
	});

	// Initial render
	renderContent();
}

function renderContent() {
	const path = window.location.pathname;
	const page = routes[path] || routes['/'];
	const content = page();
	document.getElementById('app')!.innerHTML = content;
} 