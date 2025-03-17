import { renderPage } from './index';
import { setupUserHome } from './home';
import { setupSetting } from './setting';
import { setupMatchHistory } from './history';
import { getLanguage } from '../script/language';

export function setupFriends () {
	const root = document.getElementById('app');
	if (root) {
		root.innerHTML = "";
		root.insertAdjacentHTML("beforeend", `
		<link rel="stylesheet" href="src/styles/userMain.css"> <!-- Link to the CSS file -->
		<link rel="stylesheet" href="src/styles/friends.css"> <!-- Link to the CSS file -->
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
					<div class="dropdown-item" id="Home" data-i18n="Home"></div>
					<div class="dropdown-item" id="Settings" data-i18n="Settings"></div>
					<div class="dropdown-item" id="Friends" data-i18n="Friends"></div>
					<div class="dropdown-item" id="History" data-i18n="History"></div>
					<div class="dropdown-item" id="LogOut" data-i18n="LogOut"></div>
				</div>
			</div>
			<div class="topBarFrame">
				<div class="aliasName">cool alias</div>
				<div class="profile-picture">
					<img src="src/component/Pictures/defaultPP.avif" alt="Profile Picture">
				</div>
			</div>
		</div>
		
		<div class="middle">
			<!-- BODY CHANGE -->

			<div class="container">
				 <h1 class="header">Your Friends</h1>
				<div class="friends-list">
					<div class="friend">
						<img src="src/component/Pictures/defaultPP.avif" alt="Profile Picture">
						<p>Friend 1</p>
						<button class="btn">Match History</button>
					</div>
					<div class="friend">
						<img src="src/component/Pictures/defaultPP.avif" alt="Profile Picture">
						<p>Friend 2</p>
						<button class="btn">Match History</button>
					</div>
					<div class="friend">
						<img src="src/component/Pictures/defaultPP.avif" alt="Profile Picture">
						<p>Friend 3</p>
						<button class="btn">Match History</button>
					</div>
				</div>

				<h1 class="header">Friend Requests</h1>
				<div class="friend-requests">
					<div class="friend">
						<img src="src/component/Pictures/defaultPP.avif" alt="Profile Picture">
						<p>Someone wants to be your friend</p>
						<button class="btn accept">Accept</button>
						<button class="btn decline">Decline</button>
					</div>
				</div>

				<h1 class="header">Find Friends</h1>
				<input type="text" placeholder="Search for friends..." class="search-bar">
				
				<div class="search-results">
					<div class="friend">
						<img src="src/component/Pictures/defaultPP.avif" alt="Profile Picture">
						<p>MaybeFriend</p>
						<button class="btn">Add Friend</button>
						<button class="btn">Match History</button>
					</div>
				</div>

			</div>
			<!-- ^^^ -->
		</div>
		`);

		getLanguage();
		document.getElementById('LogOut')?.addEventListener('click', () => {
			window.history.pushState({}, '', '/index');
			renderPage();
		});

		document.getElementById('Home')?.addEventListener('click', () => {
			window.history.pushState({}, '', '/home');
			setupUserHome();
		});

		document.getElementById('Settings')?.addEventListener('click', () => {
			window.history.pushState({}, '', '/setting');
			setupSetting();
		});

		document.getElementById('Friends')?.addEventListener('click', () => {
			window.history.pushState({}, '', '/friends');
			setupFriends();
		});

		document.getElementById('History')?.addEventListener('click', () => {
			window.history.pushState({}, '', '/history');
			setupMatchHistory();
		});

	}
}


