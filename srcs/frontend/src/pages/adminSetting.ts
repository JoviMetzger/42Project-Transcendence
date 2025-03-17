import { renderPage } from './index';
import { getLanguage } from '../script/language';

export function setupAdminSetting() {
	const root = document.getElementById('app');
	if (root) {
		root.innerHTML = "";
		root.insertAdjacentHTML("beforeend", `
		<link rel="stylesheet" href="src/styles/admin.css"> <!-- Link to the CSS file -->
		<link rel="stylesheet" href="src/styles/adminSet.css"> <!-- Link to the CSS file -->
		<div class="overlay"></div>
		<div class="topBar">
			<div class="dropdown">
				<button class="dropdown-btn">
					<img class="settingIcon" src="src/component/Pictures/setting-btn.png"/></img>
				</button>
				<div class="dropdown-content">
					
					<button class="language-btn">
						<span data-i18n="Language"></span> <img id="selected-flag" src="src/component/Pictures/flagIcon-en.png">
					</button>
					<div class="language-content">
							<div class="language-option" id="gb">
								<img src="src/component/Pictures/flagIcon-en.png"> <span data-i18n="English"></span>
							</div>
							<div class="language-option" id="de">
								<img src="src/component/Pictures/flagIcon-de.png"> <span data-i18n="German"></span>
							</div>
							<div class="language-option" id="nl">
								<img src="src/component/Pictures/flagIcon-nl.png"> <span data-i18n="Dutch"></span>
							</div>
					</div>
					<div class="dropdown-item" id="LogOut" data-i18n="LogOut"></div>
				</div>
			</div>
			<div class="topBarFrame">
				<div class="adminName" data-i18n="Admin"></div>
				<div class="profile-picture">
					<img src="src/component/Pictures/defaultPP.avif" alt="Profile Picture">
				</div>
			</div>
		</div>
		
		<div class="middle">
			<div class="ucontainer">
			<!-- BODY CHANGE -->
				<h1 class="admin_header" data-i18n="Admin_Header"></h1>
				<p class="p2" data-i18n="Admin_P"></p>
				<p class="p2">$USERNAME</p>
					
				<button class="user-picture">
					<img src="src/component/Pictures/defaultPP.avif">
				</button>
	
				<p class="p1" data-i18n="LogIn_Name"></p>
				<div class="input-field display-only">Display USER LogIn Name</div>
	
				<p class="p1" data-i18n="SignUp_Alias"></p>
				<div class="input-field display-only">Display USER Alias Name</div>
	
				<p class="p1" data-i18n="Change_Password"></p>
				<input type="Password" class="input-field">
	
				<p class="p1" data-i18n="ConfirmPassword"></p>
				<input type="Confirm_Password" class="input-field">
					
				<div class="ubuttons">
					<button class="ubtn" data-i18n="btn_admin"></button>
				</div>
				
				<!-- ^^^ -->
			</div>
		</div>
		`);

		getLanguage();
		document.getElementById('LogOut')?.addEventListener('click', () => {
			window.history.pushState({}, '', '/index');
			renderPage();
		});
		
	}
}