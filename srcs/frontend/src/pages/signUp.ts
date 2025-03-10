import { setupLogIn } from './logIn';
import { setupUserHome } from './home';
import { getLanguage } from '../script/language';

export function setupSignUp() {
	const root = document.getElementById('app');
	if (root) {
		root.innerHTML = `
		<link rel="stylesheet" href="src/styles/signUp.css"> <!-- Link to the CSS file -->
		<div class="overlay"></div>
		<div class="container">
			<h1 class="header" data-i18n="SignUp_Header"></h1>
				
			<p class="p1" data-i18n="SignUp_Avatar"></p>
			<div class="profile-picture">
				<img src="src/component/Pictures/defaultPP.avif">
			</div>

			<p class="p1" data-i18n="LogIn_Name"></p>
			<input type="Login_Name" class="input-field" data-i18n-placeholder="SignUp_placeholder1">

			<p class="p1" data-i18n="SignUp_Alias"></p>
			<input type="Alias_Name" class="input-field" data-i18n-placeholder="SignUp_placeholder2">

			<p class="p1" data-i18n="Password"></p>
			<input type="Password" class="input-field">

			<p class="p1" data-i18n="ConfirmPassword"></p>
			<input type="Confirm_Password" class="input-field">
				
			<div class="buttons">
				<button class="btn" id="Home" data-i18n="btn_SignUp"></button>
			</div>
		</div>
		`;

		getLanguage();
		document.getElementById('LogIn')?.addEventListener('click', () => {
			window.history.pushState({}, '', '/logIn');
			setupLogIn();
		});

		document.getElementById('Home')?.addEventListener('click', () => {
			window.history.pushState({}, '', '/home');
			setupUserHome();
		});
	}
}
