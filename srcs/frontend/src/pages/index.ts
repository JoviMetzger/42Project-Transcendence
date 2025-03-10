import { setupLogIn } from './logIn';
import { setupSignUp } from './signUp';
import { setupUserHome } from './home';
import { setupSetting } from './setting';
import { setupFriends } from './friends';
import { setupMatchHistory } from './history';
import { setupStartGame } from './startGame';
import { setupError404 } from './error404';
import { getLanguage } from '../script/language';

document.addEventListener('DOMContentLoaded', () => {
	renderPage();	
});

export function renderPage() {
	const root = document.getElementById('app');
	if (root) {
		if (window.location.pathname === '/logIn') {
			setupLogIn();
		} else if (window.location.pathname === '/signUp') {
			setupSignUp();
		} else if (window.location.pathname === '/home') {
			setupUserHome();
		} else if (window.location.pathname === '/signUp') {
			setupSignUp();
		} else if (window.location.pathname === '/home') {
			setupUserHome();
		} else if (window.location.pathname === '/signUp') {
			setupSignUp();
		} else if (window.location.pathname === '/startGame') {
			setupStartGame();
		} else if (window.location.pathname === '/setting') {
			setupSetting();
		} else if (window.location.pathname === '/history') {
			setupMatchHistory();
		} else if (window.location.pathname === '/friends') {
			setupFriends();
		} else if (window.location.pathname === '/error404') {
			setupError404();
		} else {
			root.innerHTML = "";
			root.insertAdjacentHTML("beforeend", `
			<link rel="stylesheet" href="src/styles/index.css"> <!-- Link to the CSS file -->
			<div class="overlay"></div>
			<div class="container">
				<h1 class="header" data-i18n="Index_Header"></h1>
				<p data-i18n="Index_P"></p>
				<div class="buttons">
					<button class="btn" id="LogIn" data-i18n="btn_LogIn"></button>
					<button class="btn" id="SignUp" data-i18n="btn_SignUp"></button>
				</div>
			</div>
			`);

			getLanguage();
			document.getElementById('LogIn')?.addEventListener('click', () => {
				window.history.pushState({}, '', '/logIn');
				renderPage();
			});

			document.getElementById('SignUp')?.addEventListener('click', () => {
				window.history.pushState({}, '', '/signUp');
				renderPage();
			});

		}
	} else {
		// If invalid route -> 404 page
		window.history.pushState({}, '', '/error404');
		setupError404();
	}
}

window.addEventListener('popstate', renderPage);
