import { renderPage } from './index';
import { setupSignUp } from './signUp';
import { setupUserHome } from './home';

document.addEventListener('DOMContentLoaded', () => {
    setupSignUp();
	setupUserHome();
});

export function setupLogIn() {
	const root = document.getElementById('app');
	if (root) {
		if (window.location.pathname === '/home') {
			setupUserHome();
		} else if (window.location.pathname === '/signUp') {
			setupSignUp();
		} else {
			root.innerHTML = `
			<link rel="stylesheet" href="src/styles/logIn.css"> <!-- Link to the CSS file -->
			<div class="overlay"></div>
			<div class="container">
				<h1 class="header" data-i18n="LogIn_Header">Login</h1>
				
				<p class="p1" data-i18n="LogIn_Name">Login Name</p>
				<input type="Login_Name" class="input-field" data-i18n-placeholder="LogIn_placeholder1">

				<p class="p1" data-i18n="Password">Password</p>
				<input type="Password" class="input-field">
				
				<div class="buttons">
					<button class="btn" id="Home" data-i18n="btn_LogIn">Log In</button>
				</div>
				<p data-i18n="LogIn_P">Don't have an account? <a id="SignUp" style="color:rgb(209, 7, 128);"><u>Sign Up</u></p>
			</div>
	`;

			document.getElementById('SignUp')?.addEventListener('click', () => {
				window.history.pushState({}, '', '/signUp');
				setupSignUp();
			});

			document.getElementById('Home')?.addEventListener('click', () => {
				window.history.pushState({}, '', '/home');
				setupUserHome();
			});
		}
	}
}

window.addEventListener('popstate', renderPage);