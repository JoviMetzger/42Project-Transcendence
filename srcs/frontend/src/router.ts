
import { About } from './pages/About';
import { loadTopBar } from './script/topBar';
import { setupUserHome } from './pages/home';
import { setupFriends } from './pages/friends';
import { setupSetting } from './pages/setting';
import { setupMatchHistory } from './pages/history';


type PageFunction = () => void;

const routes: { [key: string]: PageFunction } = {
	'/': setupUserHome,
	'/about': About,
	'/home': setupUserHome,
	'/friends': setupFriends,
	'/setting': setupSetting,
	'/history': setupMatchHistory
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

function pageFunction(path: string): void {
	const handler = routes[path] || routes['/'];
	const appElement = document.getElementById('app');
	if (appElement) {
		appElement.innerHTML = '';
	}
	handler();
	loadTopBar();
}

function renderContent() {
	const path = window.location.pathname;
	pageFunction(path);
}