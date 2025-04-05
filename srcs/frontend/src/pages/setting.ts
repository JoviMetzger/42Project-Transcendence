import { renderPage } from './index';
import { setupUserHome } from './home';
import { setupFriends } from './friends';
import { setupMatchHistory } from './history';
import { getLanguage } from '../script/language';

export function setupSetting () {
	const root = document.getElementById('app');
	if (root) {
		root.innerHTML = "";
		root.insertAdjacentHTML("beforeend", `
		<link rel="stylesheet" href="src/styles/userMain.css"> <!-- Link to the CSS file -->
		<link rel="stylesheet" href="src/styles/setting.css"> <!-- Link to the CSS file -->
		<div class="overlay"></div>
		<dropdown-menu></dropdown-menu>
		
		<div class="middle">
			<!-- BODY CHANGE -->

			<div class="container">
				<h1 class="header" data-i18n="Setting_Header"></h1>
					
				<p class="p1" data-i18n="Setting_Avatar"></p>
				<button class="edit-picture">
					<img src="src/component/Pictures/defaultPP.avif">
				</button>
	
				<p class="p1" data-i18n="Setting_Name"></p>
				<div class="input-field display-only">Display USER LogIn Name</div>
	
				<p class="p1" data-i18n="Setting_Alias"></p>
				<input type="Alias_Name" class="input-field">
	
				<p class="p1" data-i18n="Change_Password"></p>
				<input type="Password" class="input-field">
	
				<p class="p1" data-i18n="ConfirmPassword"></p>
				<input type="Confirm_Password" class="input-field">
					
				<div class="buttons">
					<button class="btn" data-i18n="btn_Save"></button>
				</div>
			</div>
	
			<!-- ^^^ -->
		</div>
		`);

		getLanguage();
		document.getElementById('Friends')?.addEventListener('click', () => {
			window.history.pushState({}, '', '/friends');
			setupFriends();
		});

		document.getElementById('Settings')?.addEventListener('click', () => {
			window.history.pushState({}, '', '/setting');
			setupSetting();
		});

		document.getElementById('LogOut')?.addEventListener('click', () => {
			window.history.pushState({}, '', '/index');
			renderPage();
		});

		document.getElementById('History')?.addEventListener('click', () => {
			window.history.pushState({}, '', '/history');
			setupMatchHistory();
		});

		document.getElementById('Home')?.addEventListener('click', () => {
			window.history.pushState({}, '', '/home');
			setupUserHome();
		});
	}
}


