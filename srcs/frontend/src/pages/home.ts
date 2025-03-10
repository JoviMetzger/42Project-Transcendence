import { renderPage } from './index';
import { setupFriends } from './friends';
import { setupSetting } from './setting';
import { setupStartGame } from './startGame';
import { setupMatchHistory } from './history';
// import { setupError404 } from './error404';
import { getLanguage } from '../script/language';

document.addEventListener('DOMContentLoaded', () => {
    setupUserHome();

    // DropDown
    document.addEventListener('click', (event) => {
        const dropdown = document.querySelector('.dropdown-content');
        const dropdownBtn = document.querySelector('.dropdown-btn');
        
        if (dropdown && dropdownBtn) {
            if (dropdownBtn.contains(event.target)) {
                // Toggle dropdown visibility when clicking the button
                dropdown.classList.toggle('show');
            } else if (!dropdown.contains(event.target)) {
                // Hide dropdown if clicking outside of it
                dropdown.classList.remove('show');
            }
        }
    });
});


export function setupUserHome () {
    const root = document.getElementById('app');
    if (root) {
        if (window.location.pathname === '/friends') {
        	setupFriends();
        } else if (window.location.pathname === '/setting') {
            setupSetting();
        } else if (window.location.pathname === '/index') {
            renderPage();
        } else if (window.location.pathname === '/startGame') {
            setupStartGame();
        } else if (window.location.pathname === '/history') {
            setupMatchHistory();
        } else {
            root.innerHTML = `
            <link rel="stylesheet" href="src/styles/userMain.css"> <!-- Link to the CSS file -->
            <link rel="stylesheet" href="src/styles/home.css"> <!-- Link to the CSS file -->
            <div class="overlay"></div>
            <div class='leftBar'>
                <div class="dropdown">
                    <button class="dropdown-btn">
                        <img class='settingIcon' src='src/component/Pictures/setting-btn.png'/></img>
                    </button>
                    <div class="dropdown-content">
                        <div class="dropdown-item">Language
                            <select onchange="switchLanguage(this.value)">
                                <option value="en">🇬🇧 </option>
                                <option value="de">🇩🇪 </option>
                                <option value="nl">🇳🇱 </option>
                            </select>
                        </div>
                        <div class="dropdown-item" id="Home" data-i18n="Home"></div>
                        <div class="dropdown-item" id="Settings" data-i18n="Settings"></div>
                        <div class="dropdown-item" id="Friends" data-i18n="Friends"></div>
                        <div class="dropdown-item" id="History" data-i18n="History"></div>
                        <div class="dropdown-item" id="LogOut" data-i18n="LogOut"></div>
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
                    <button class="btn" id="StartGame">Play Game</button>
                </div>

                <!-- ^^^ -->
            </div>
    `;

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

            document.getElementById('StartGame')?.addEventListener('click', () => {
                window.history.pushState({}, '', '/startGame');
                setupStartGame();
            });

            document.getElementById('Home')?.addEventListener('click', () => {
                window.history.pushState({}, '', '/home');
                setupUserHome();
            });

            document.getElementById('History')?.addEventListener('click', () => {
                window.history.pushState({}, '', '/history');
                setupMatchHistory();
            });
        }
    }
}

window.addEventListener('popstate', renderPage);
