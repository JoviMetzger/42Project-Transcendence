import { renderPage } from './index';
import { setupSetting } from './setting';
import { setupFriends } from './friends';
import { setupMatchHistory } from './history';
import { setupStartGame } from './startGame';
import { switchLanguage } from '../script/language';
import { getLanguage } from '../script/language';

// DropDown Function
document.addEventListener('DOMContentLoaded', () => {
	// Handle click events for toggling settings dropdown
	document.addEventListener('click', (event) => {
		const dropdown = document.querySelector('.dropdown-content');
		const dropdownBtn = document.querySelector('.dropdown-btn');
		
		if (dropdown && dropdownBtn) {
			if (dropdownBtn.contains(event.target as Node)) {
				// Toggle dropdown visibility when clicking the button
				dropdown.classList.toggle('show');
			} else if (!dropdown.contains(event.target as Node)) {
				// Hide dropdown if clicking outside of it
				dropdown.classList.remove('show');
			}
		}
	});

	// Close both dropdowns when clicking outside
	document.addEventListener("click", (event) => {
		const languageDropdown = document.querySelector('.language-content');
		const languageBtn = document.querySelector('.language-btn');

		if (languageDropdown && languageBtn) {
			if (languageBtn.contains(event.target as Node)) {
				// Toggle dropdown visibility when clicking the button
				languageDropdown.classList.toggle('showLang');
			} else if (!languageDropdown.contains(event.target as Node)) {
				// Hide dropdown if clicking outside of it
				languageDropdown.classList.remove('showLang');
			}
		}
	});

// document.getElementById('gb')?.addEventListener('click', () => {
// 	document.querySelectorAll(".language-option").forEach(item => {
	document.addEventListener('click', (event) => {
		const gb = document.getElementById('gb');
		const de = document.getElementById('de');
		const nl = document.getElementById('nl');
		
		if (gb) {
			if (gb.contains(event.target as Node)) {
				switchLanguage("en");
			}
		}
		if (de) {
			if (de.contains(event.target as Node)) {
				switchLanguage("de");
			}
		}
		if (nl) {
			if (nl.contains(event.target as Node)) {
				switchLanguage("nl");
			}
		}
	});

});


export function setupUserHome () {
	const root = document.getElementById('app');
	if (root) {
		root.innerHTML = `
		<link rel="stylesheet" href="src/styles/userMain.css"> <!-- Link to the CSS file -->
		<link rel="stylesheet" href="src/styles/home.css"> <!-- Link to the CSS file -->
		<div class="overlay"></div>
		<div class="leftBar">
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
		</div>

		<div class="topBar">
			<div class="topBarFrame">
				<div class="aliasName">cool alias</div>
				<div class="profile-picture">
					<img src="src/component/Pictures/defaultPP.avif" alt="Profile Picture">
				</div>
			</div>
		</div>
		
		<div class="middle">
			<!-- BODY CHANGE -->

			<div class="Total score">
				<div class="imgTotalScore">
					<img src="src/component/Pictures/totalScore.png" alt="Total Score">
				</div>
				<div class="score-text">Wins</div>
				<div class="score-number">1200</div>
			</div>

			<div class="wins">
				<div class="imgWins">
					<img src="src/component/Pictures/wins.png" alt="Wins">
				</div>
				<div class="score-text">Wins</div>
				<div class="score-number">1200</div>
			</div>

			<div class="Losses">
				<div class="imgLosses">
					<img src="src/component/Pictures/losses.png" alt="Losses">
				</div>
				<div class="score-text">Losses</div>
				<div class="score-number">900</div>
			</div>

			<div class="leaderboard">
				<div class="1">
					<div class="img1">
						<img src="src/component/Pictures/1.jpg" alt="1st.">
					</div>
					<div class="score-text">Losses</div>
					<div class="score-number">900</div>
				</div>
				<div class="2">
					<div class="img2">
						<img src="src/component/Pictures/2.jpg" alt="2nd.">
					</div>
					<div class="score-text">Losses</div>
					<div class="score-number">900</div>
				</div>
				<div class="3">
					<div class="img3">
						<img src="src/component/Pictures/3.jpg" alt="3rd.">
					</div>
					<div class="score-text">Losses</div>
					<div class="score-number">900</div>
				</div>

			</div>
			<div class="buttons">
				<button class="btn" id="StartGame" data-i18n="btn_PlayGame">Play Game</button>
			</div>

			<!-- ^^^ -->
		</div>
		`;

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

		document.getElementById('StartGame')?.addEventListener('click', () => {
			window.history.pushState({}, '', '/startGame');
			setupStartGame();
		});

	}
}

	