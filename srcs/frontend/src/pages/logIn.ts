import { setupSignUp } from './signUp';
import { setupUserHome } from './home';
import { getLanguage } from '../script/language';

export function setupLogIn() {
	const root = document.getElementById('app');
	if (root) {
		root.innerHTML = "";
		root.insertAdjacentHTML("beforeend", `
		<link rel="stylesheet" href="src/styles/logIn.css"> <!-- Link to the CSS file -->
		<div class="overlay"></div>
		<div class="container">
			<h1 class="header" data-i18n="LogIn_Header"></h1>
			
			<p class="p1" data-i18n="LogIn_Name"></p>
			<input type="Login_Name" class="input-field" data-i18n-placeholder="LogIn_placeholder1">

			<p class="p1" data-i18n="Password"></p>
			<input type="Password" class="input-field">
			
			<div class="buttons">
				<button class="btn" id="Home" data-i18n="btn_LogIn"></button>
			</div>
		</div>
		`);

		getLanguage();
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