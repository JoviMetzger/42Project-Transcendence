import { renderPage } from './index';
import { setupLogIn } from './logIn';
import { setupUserHome } from './home';

document.addEventListener('DOMContentLoaded', () => {
    setupLogIn();
	setupUserHome();
});

export function setupSignUp() {
	const root = document.getElementById('app');
	if (root) {
		if (window.location.pathname === '/home') {
			setupUserHome();
		}else if (window.location.pathname === '/logIn') {
			setupLogIn();
		} else {
			root.innerHTML = `
			<link rel="stylesheet" href="src/styles/signUp.css"> <!-- Link to the CSS file -->
			<div class="overlay"></div>
			<div class="container">
				<h1 class="header" data-i18n="SignUp_Header">Create Account</h1>
					
				<p class="p1" data-i18n="SignUp_Avatar">Add your Avatar</p>
				<div class="profile-picture">
					<img src="src/component/Pictures/defaultPP.avif">
				</div>

				<p class="p1" data-i18n="LogIn_Name">Login Name</p>
				<input type="Login_Name" class="input-field" data-i18n-placeholder="SignUp_placeholder1">

				<p class="p1" data-i18n="SignUp_Alias">Alias Name</p>
				<input type="Alias_Name" class="input-field" data-i18n-placeholder="SignUp_placeholder2">

				<p class="p1" data-i18n="Password">Password</p>
				<input type="Password" class="input-field">

				<p class="p1" data-i18n="ConfirmPassword">Confirm Password</p>
				<input type="Confirm_Password" class="input-field">
					
				<div class="buttons">
					<button class="btn" id="Home" data-i18n="btn_SignUp">Sign Up</button>
				</div>
				<p data-i18n="SignUp_P">Already have an account? <a id="LogIn" style="color: rgb(209, 7, 128); "><u>Log In</u></p>
			</div>
	`;

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
}

window.addEventListener('popstate', renderPage);