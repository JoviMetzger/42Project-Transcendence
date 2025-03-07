import { renderPage } from './index';
import { setupFriends } from './friends';
import { setupSetting } from './setting';
import { setupUserHome } from './home';
// import { setupError404 } from './error404';

document.addEventListener('DOMContentLoaded', () => {
     setupMatchHistory();
});

export function  setupMatchHistory () {
    const root = document.getElementById('app');
    if (root) {
        if (window.location.pathname === '/setting') {
        	setupSetting();
        } else if (window.location.pathname === '/index') {
            renderPage();
        } else if (window.location.pathname === '/friends') {
            setupFriends();
		} else if (window.location.pathname === '/home') {
            setupUserHome();
        } else {
            root.innerHTML = `
            <link rel="stylesheet" href="src/styles/userMain.css"> <!-- Link to the CSS file -->
            <link rel="stylesheet" href="src/styles/history.css"> <!-- Link to the CSS file -->
            <div class="overlay"></div>
            <div class='leftBar'>
                <div class="dropdown">
                    <button class="dropdown-btn">
                        <img class='settingIcon' src='src/component/Pictures/setting-btn.png'/></img>
                    </button>
                    <div class="dropdown-content">
                        <div class="dropdown-item">Langauge
                            <!-- <select onchange="switchLanguage(this.value)">
                                <option value="en">🇬🇧 </option>
                                <option value="de">🇩🇪 </option>
                                <option value="nl">🇳🇱 </option>
                            </select> -->
                        </div>
                        <div class="dropdown-item" id="Home">Home</div>
                        <div class="dropdown-item" id="Settings">Settings</div>
                        <div class="dropdown-item" id="Friends">Friends</div>
                        <div class="dropdown-item" id="History">Match History</div>
                        <div class="dropdown-item" id="LogOut">Log Out</div>
                    </div>
                </div>
            </div>
            <div class='topBar'>
                <div class='topBarFrame'>
                    <div class='aliasName'>cool alias</div>
                    <div class="profile-picture">
                        <img src="src/component/Pictures/defaultPP.avif" alt="Profile Picture">
                    </div>
                </div>
            </div>
            
            <div class="middle">
                <!-- BODY CHANGE -->

                <p style="color: white; font-size: 20px; font-family: Arial, sans-serif;">HIstory</p>

                <!-- ^^^ -->
            </div>
    `;

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
}

window.addEventListener('popstate', renderPage);

