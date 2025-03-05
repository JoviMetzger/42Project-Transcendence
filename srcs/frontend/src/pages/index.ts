	import { setupLogIn } from './logIn';
	import { setupSignUp } from './signUp';

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
			} else {
				root.innerHTML = `
				<link rel="stylesheet" href="src/styles/index.css"> <!-- Link to the CSS file -->
				<div class="overlay"></div>
				<div class="container">
					<h1 class="header" data-i18n="Index_Header">Welcome to Transcendence</h1>
					<p data-i18n="Index_P">Play classic Pong with your friends!</p>
					<div class="buttons">
						<button class="btn" id="LogIn" data-i18n="btn_LogIn">Log In</button>
						<button class="btn" id="SignUp" data-i18n="btn_SignUp">Sign Up</button>
					</div>
				</div>
		`;

				document.getElementById('LogIn')?.addEventListener('click', () => {
					window.history.pushState({}, '', '/logIn');
					renderPage();
				});

				document.getElementById('SignUp')?.addEventListener('click', () => {
					window.history.pushState({}, '', '/signUp');
					renderPage();
				});
			}
		}
	}

	window.addEventListener('popstate', renderPage);
