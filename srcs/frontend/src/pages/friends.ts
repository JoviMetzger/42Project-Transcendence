import { renderPage } from './index';
import { setupUserHome } from './home';
import { setupSetting } from './setting';
import { setupMatchHistory } from './history';
import { getLanguage } from '../script/language';
import { searchBar } from '../script/searchFriends';
import { connectFunc, inputToContent, requestBody } from "../script/connections"

export function setupFriends() {
	const root = document.getElementById('app');
	let publicUsers:any = [];
	connectFunc("/public/users", requestBody("GET", null))
		.then((response) => {
			if (response.ok) {
				return response.json()
			}
			else {
				// error, couldn't load users from database, check your connection or wait 5 minutes
			}
		})
		.then((array) => {
			publicUsers = array;
		})
		.then(() => {
			if (root) {
				const x:number = 1
				// console.log(publicUsers[x].profile_pic)
				root.innerHTML = "";
				root.insertAdjacentHTML("beforeend", `
				<link rel="stylesheet" href="src/styles/userMain.css">
				<link rel="stylesheet" href="src/styles/friends.css">
				<div class="overlay"></div>
				<dropdown-menu></dropdown-menu>
				
				<div class="middle">
					<!-- BODY CHANGE -->

					<div class="container">
						<div class="search-container">
							<input type="text" class="userSearch" data-i18n-placeholder="Friends_placeholder1">
							<button class="search-btn">
								<img class="searchIcon" src="src/component/Pictures/searchIcon.png"/>
							</button>
							<div class="dropdown">
							<div id="search-results" class="dropdown-content">
								<input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()">
							</div>
							button class="btn" data-i18n="btn_Add_Friend"></button>
						</div>
						</div>
						
						
						<!-- Should Be A DROPDOWN

						<div class="search-results">
							<div class="publicUser">
								<img src="src/component/Pictures/defaultPP.avif" alt="Profile Picture">
								<p> >$MaybeFriend< </p>
								<button class="btn" data-i18n="btn_Add_Friend"></button>
								<button class="btn" id="UserHistory" data-i18n="History"></button>
							</div>
						</div>
						^^^^^^^^^^^^^^^^^^^ -->

						<h1 class="header" data-i18n="Request_Header"></h1>
						<div class="friend-requests">
							<div class="publicUser">
								<img src="src/component/Pictures/defaultPP.avif" alt="Profile Picture">
								<p> >$Someone wants to be your friend< </p>
								<button class="btn accept" data-i18n="btn_Accept"></button>
								<button class="btn decline" data-i18n="btn_Decline"></button>
								<button class="btn blok" data-i18n="btn_Block"></button>
							</div>
						</div>

						<h1 class="header" data-i18n="Friends_Header"></h1>
						<div class="friends-list">
						<public-user type="friend" alias=${publicUsers[x].alias} profilePicData=${publicUsers[x].profile_pic.data} profilePicMimeType=${publicUsers[x].profile_pic.mimeType} > </public-user>
						<public-user type="friend" alias="Friend 2"> </public-user>
						<public-user type="friend" alias="Friend 3"> </public-user>
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
				document.getElementById('UserHistory')?.addEventListener('click', () => {
					window.history.pushState({}, '', '/history');
					setupMatchHistory();
				});
				document.getElementById('FriendsHistory')?.addEventListener('click', () => {
					window.history.pushState({}, '', '/history');
					setupMatchHistory();
				});
				document.querySelector('.userSearch')?.addEventListener('keyup', () => {
					searchBar();
				});
			}
		})
}


