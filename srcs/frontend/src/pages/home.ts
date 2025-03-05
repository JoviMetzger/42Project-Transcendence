import { renderPage } from './index';
import { setupSignUp } from './signUp';
// import { setupUserHome } from './home';

export function setupLogIn() {
    const root = document.getElementById('app');
    if (root) {
        // if (window.location.pathname === '/home') {
        // 	setupUserHome();
        if (window.location.pathname === '/signUp') {
            setupSignUp();
        } else {
            root.innerHTML = `
            <link rel="stylesheet" href="src//styles/home.css"> <!-- Link to the CSS file -->
            <div class="overlay"></div>
            <div class='leftBar'>
                <div class="dropdown">
                    <button class="dropdown-btn" onclick="">
                        <img class='settingIcon' src='../component/Pictures/setting-btn.png'/></img>
                    </button>
                    <div class="dropdown-content">
                        <div class="dropdown-item">Langauge
                            <select onchange="switchLanguage(this.value)">
                                <option value="en">🇬🇧 </option>
                                <option value="de">🇩🇪 </option>
                                <option value="nl">🇳🇱 </option>
                            </select>
                        </div>
                        <div class="dropdown-item">Settings</div>
                        <div class="dropdown-item">Friends</div>
                        <div class="dropdown-item">Match History</div>
                        <div class="dropdown-item">Log Out</div>
                    </div>
                </div>
            </div>
            <div class='topBar'>
                <div class='topBarFrame'>
                    <div class='aliasName'>cool alias</div>
                    <div class="profile-picture">
                        <img src="../component/Pictures/defaultPP.avif" alt="Profile Picture">
                    </div>
                </div>
            </div>
            
            <div class="middle">
                <div class="Total score">
                    <div class="imgTotalScore">
                        <img src="../component/Pictures/totalScore.png" alt="Total Score">
                    </div>
                    <div class="score-text">Wins</div>
                    <div class="score-number">1200</div>
                </div>

                <div class="wins">
                    <div class="imgWins">
                        <img src="../component/Pictures/wins.png" alt="Wins">
                    </div>
                    <div class="score-text">Wins</div>
                    <div class="score-number">1200</div>
                </div>

                <div class="Losses">
                    <div class="imgLosses">
                        <img src="../component/Pictures/losses.png" alt="Losses">
                    </div>
                    <div class="score-text">Losses</div>
                    <div class="score-number">900</div>
                </div>

                <div class="leaderboard">
                    <div class="1">
                        <div class="img1">
                            <img src="../component/Pictures/1.jpg" alt="1st.">
                        </div>
                        <div class="score-text">Losses</div>
                        <div class="score-number">900</div>
                    </div>
                    <div class="2">
                        <div class="img2">
                            <img src="../component/Pictures/2.jpg" alt="2nd.">
                        </div>
                        <div class="score-text">Losses</div>
                        <div class="score-number">900</div>
                    </div>
                    <div class="3">
                        <div class="img3">
                            <img src="../component/Pictures/3.jpg" alt="3rd.">
                        </div>
                        <div class="score-text">Losses</div>
                        <div class="score-number">900</div>
                    </div>

                </div>
                <div class="buttons">
                    <button class="btn">Play Game</button>
                </div>
            </div>
      `;

            document.getElementById('SignUp')?.addEventListener('click', () => {
                window.history.pushState({}, '', '/signUp');
                renderPage();
            });

            // document.getElementById('Home')?.addEventListener('click', () => {
            // 	window.history.pushState({}, '', '/home');
            // 	renderPage();
            // });
        }
    }
}

window.addEventListener('popstate', renderPage);