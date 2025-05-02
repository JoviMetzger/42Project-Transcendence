import { startSnek, preGameScreen, restartSnek, gameEndData } from '../snek/main';
import { Application } from 'pixi.js'

// Track authentication state
interface AuthState {
    isAuthenticated: boolean;
    isGuestLocked: boolean;
    guestAlias: string;
    username: string;
}

const authState: AuthState = {
    isAuthenticated: false,
    isGuestLocked: false,
    guestAlias: "",
    username: ""
};

export function setupTestGame() {
    const player1Alias = "julius"
    console.log("testgame page");
    const root = document.getElementById('app');
    if (root) {
        root.innerHTML = "";
        root.insertAdjacentHTML("beforeend", /*html*/ `
        <div class="flex flex-col gap-4 items-center bg-black bg-opacity-75 py-20 px-8 rounded">
            <div class="flex flex-row w-full gap-20 bg-pink-500 text-white py-2 px-4 rounded justify-center">
                <div class="flex flex-col flex-1 gap-4 bg-red-500 py-2 px-4 rounded justify-items-center">
                    <p>Player1 info (WASD)</span>
                    <p class="text-center">${player1Alias}</span>
                </div>
                <div class="flex flex-col flex-1 gap-4 bg-green-500 py-2 px-4 rounded justify-items-center">
                    <p>Player2 info (ARROW)</span>
                    <div class="flex items-center gap-4">
                        <label class="flex items-center cursor-pointer">
                            <span class="mr-2">Guest</span>
                            <div class="relative inline-block w-16 h-8">
                                <input type="checkbox" id="authToggle" class="absolute w-0 h-0 opacity-0">
                                <div class="absolute inset-0 bg-gray-300 rounded-full transition-colors duration-300" id="toggleBackground"></div>
                                <div class="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300" id="toggleCircle"></div>
                            </div>
                            <span class="ml-2">Login</span>
                        </label>
                    </div>

                    <!-- Guest Form -->
                    <form id="GuestAliasform" class="flex flex-col gap-2 text-black">
                        <input type="text" id="guestAliasInput" class="p-2 rounded" placeholder="Guest alias" required minlength="3" maxlength="117" />
                        <div class="flex gap-2">
                            <button id="lockInGuest" type="button" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Lock In</button>
                            <button id="changeGuestAlias" type="button" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded hidden">Change</button>
                        </div>
                    </form>

                    <!-- Login Form -->
                    <form id="LoginForm" class="flex-col gap-2 text-black hidden">
                        <input type="text" id="loginUsername" class="p-2 rounded" placeholder="Username" />
                        <input type="password" id="loginPassword" class="p-2 rounded" placeholder="Password" />
                        <div class="flex gap-2">
                            <button type="button" id="loginButton" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Login</button>
                            <button type="button" id="logoutButton" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded hidden">Logout</button>
                        </div>
                        <p id="loginStatus" class="text-white text-center mt-2 hidden"></p>
                    </form>
                    <p class="text-center player2-info"></span>
                </div>
            </div>
            <button class="btn bg-gray-500 cursor-not-allowed opacity-50" id="startGame" disabled>Start Game</button>
            <div id="gameContainer" class="mb-4"></div>
            <div class="hidden flex-row gap-4" id="replayButtons">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="newGame">New Players</button>
                <button class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" id="restartGame">Rematch!</button>
            </div>
        </div>
        `);
    }
    const container = document.getElementById('gameContainer') as HTMLElement;
    if (container) {
        preGameScreen(container).then((app: Application) => {
            startGameListeners(app);
        }).catch((error) => {
            console.error("Error setting up the game:", error);
        });
    } else {
        console.error("Game container not found");
        return;
    }
    setupGuestAliasLocking();
    setupAuthToggle();
    setupLoginValidation();
    newPlayersButton();
    updateStartGameButton();
}

function updateStartGameButton() {
    const startGameButton = document.getElementById('startGame') as HTMLButtonElement;
    const player2InfoElements = document.querySelectorAll('.player2-info');
    
    if (!startGameButton) {
        console.error("Start game button not found");
        return;
    }
    
    if (authState.isAuthenticated || authState.isGuestLocked) {
        startGameButton.disabled = false;
        startGameButton.classList.remove('bg-gray-500', 'cursor-not-allowed', 'opacity-50');
        startGameButton.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white');
        
        // Update player2 display name
        const displayName = authState.isAuthenticated ? authState.username : authState.guestAlias;
        player2InfoElements.forEach(element => {
            element.textContent = displayName;
        });
    } else {
        startGameButton.disabled = true;
        startGameButton.classList.add('bg-gray-500', 'cursor-not-allowed', 'opacity-50');
        startGameButton.classList.remove('bg-blue-500', 'hover:bg-blue-700', 'text-white');
        
        // Clear player2 display name
        player2InfoElements.forEach(element => {
            element.textContent = "";
        });
    }
}

function setupGuestAliasLocking() {
    const guestInput = document.getElementById("guestAliasInput") as HTMLInputElement;
    const lockInButton = document.getElementById("lockInGuest") as HTMLButtonElement;
    const changeButton = document.getElementById("changeGuestAlias") as HTMLButtonElement;
    const authToggle = document.getElementById("authToggle") as HTMLInputElement;

    if (!guestInput || !lockInButton || !changeButton) {
        console.error("Guest alias input or buttons not found");
        return;
    }
    
    lockInButton.addEventListener('click', () => {
        if (guestInput.value.length < 3) {
            alert("Guest alias must be at least 3 characters long.");
            return;
        }
        
        guestInput.disabled = true;
        lockInButton.classList.add('hidden');
        changeButton.classList.remove('hidden');
        
        // Disable the auth toggle when guest is locked in
        if (authToggle) {
            authToggle.disabled = true;
        }
        
        // Update auth state
        authState.isGuestLocked = true;
        authState.guestAlias = guestInput.value;
        updateStartGameButton();
    });
    
    changeButton.addEventListener('click', () => {
        guestInput.disabled = false;
        changeButton.classList.add('hidden');
        lockInButton.classList.remove('hidden');
        
        // Re-enable the auth toggle when guest is unlocked
        if (authToggle) {
            authToggle.disabled = false;
        }
        
        // Update auth state
        authState.isGuestLocked = false;
        updateStartGameButton();
    });
}

function setupAuthToggle() {
    const toggle = document.getElementById("authToggle") as HTMLInputElement;
    const guestForm = document.getElementById("GuestAliasform") as HTMLFormElement;
    const loginForm = document.getElementById("LoginForm") as HTMLFormElement;
    const toggleBackground = document.getElementById("toggleBackground");
    const toggleCircle = document.getElementById("toggleCircle");

    if (!toggle || !guestForm || !loginForm || !toggleBackground || !toggleCircle) {
        console.error("Auth toggle or forms not found");
        return;
    }

    toggle.addEventListener('change', (event) => {
        // Prevent toggle if guest is locked in
        if (toggle.checked && authState.isGuestLocked) {
            event.preventDefault();
            toggle.checked = false;
            alert("Please unlock guest alias before switching to login mode.");
            return;
        }
        
        // Prevent toggle if user is authenticated
        if (!toggle.checked && authState.isAuthenticated) {
            event.preventDefault();
            toggle.checked = true;
            alert("Please logout before switching to guest mode.");
            return;
        }
        
        // Reset authentication state when switching modes
        authState.isAuthenticated = false;
        
        // Only reset guest locked state when switching to login mode
        if (toggle.checked) {
            authState.isGuestLocked = false;
        }
        
        updateStartGameButton();
        
        if (toggle.checked) {
            toggleBackground.classList.add('bg-blue-600');
            toggleBackground.classList.remove('bg-gray-300');
            toggleCircle.style.transform = 'translateX(32px)';

            guestForm.classList.add('hidden');
            guestForm.classList.remove('flex');
            loginForm.classList.remove('hidden');
            loginForm.classList.add('flex');
        } else {
            toggleBackground.classList.remove('bg-blue-600');
            toggleBackground.classList.add('bg-gray-300');
            toggleCircle.style.transform = 'translateX(0)';

            loginForm.classList.add('hidden');
            loginForm.classList.remove('flex');
            guestForm.classList.remove('hidden');
            guestForm.classList.add('flex');
            
            // Reset login form and status
            const loginStatus = document.getElementById('loginStatus');
            if (loginStatus) {
                loginStatus.classList.add('hidden');
            }
            (document.getElementById('loginUsername') as HTMLInputElement).value = '';
            (document.getElementById('loginPassword') as HTMLInputElement).value = '';
        }
    });
}

function setupLoginValidation() {
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const usernameInput = document.getElementById('loginUsername') as HTMLInputElement;
    const passwordInput = document.getElementById('loginPassword') as HTMLInputElement;
    const loginStatus = document.getElementById('loginStatus');
    const authToggle = document.getElementById("authToggle") as HTMLInputElement;
    
    if (!loginButton || !logoutButton || !usernameInput || !passwordInput || !loginStatus) {
        console.error("Login elements not found");
        return;
    }
    
    loginButton.addEventListener('click', async () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!username || !password) {
            showLoginStatus(loginStatus, "Please enter both username and password", false);
            return;
        }
        
        try {
            // For testing, always return success
            const success = true; // await validateLogin(username, password);
            if (success) {
                showLoginStatus(loginStatus, "Login successful!", true);
                authState.isAuthenticated = true;
                authState.username = username;
                
                // Disable form fields after successful login
                usernameInput.disabled = true;
                passwordInput.disabled = true;
                loginButton.classList.add('hidden');
                logoutButton.classList.remove('hidden');
                
                // Disable auth toggle when logged in
                if (authToggle) {
                    authToggle.disabled = true;
                }
                
                updateStartGameButton();
            } else {
                showLoginStatus(loginStatus, "Invalid username or password", false);
                authState.isAuthenticated = false;
                updateStartGameButton();
            }
        } catch (error) {
            showLoginStatus(loginStatus, "Error during login. Please try again.", false);
            console.error("Login error:", error);
            authState.isAuthenticated = false;
            updateStartGameButton();
        }
    });
    
    logoutButton.addEventListener('click', () => {
        // Reset authentication state
        authState.isAuthenticated = false;
        authState.username = "";
        
        // Reset form
        usernameInput.disabled = false;
        passwordInput.disabled = false;
        usernameInput.value = "";
        passwordInput.value = "";
        loginButton.classList.remove('hidden');
        logoutButton.classList.add('hidden');
        
        // Hide status message
        loginStatus.classList.add('hidden');
        
        // Re-enable auth toggle
        if (authToggle) {
            authToggle.disabled = false;
        }
        
        updateStartGameButton();
    });
}

function showLoginStatus(statusElement: HTMLElement, message: string, isSuccess: boolean) {
    statusElement.textContent = message;
    statusElement.classList.remove('hidden', 'text-green-500', 'text-red-500');
    statusElement.classList.add(isSuccess ? 'text-green-500' : 'text-red-500');
}

// Skeleton for login validation function
async function validateLogin(username: string, password: string): Promise<boolean> {
    // This is a placeholder function for login validation
    // In a real application, you would make an API call to validate the credentials
    
    console.log(`Attempting to login with username: ${username}`);
    
    // Simulate API request with a delay
    return new Promise((resolve) => {
        setTimeout(() => {
            // For testing: consider "test" / "password" as valid credentials
            const isValid = (username === "test" && password === "password");
            console.log(`Login ${isValid ? 'successful' : 'failed'}`);
            resolve(isValid);
        }, 1000); // Simulate network delay
    });
}

async function startGameListeners(app: Application): Promise<void> {
    const startGameButton = document.getElementById('startGame');
    const restartGameButton = document.getElementById('restartGame');
    const gameContainer = document.getElementById('gameContainer');
    const replayButtons = document.getElementById('replayButtons');
    
    if (!gameContainer || !startGameButton || !restartGameButton || !replayButtons) {
        console.error("One or more elements not found");
        return;
    }
    
    startGameButton.addEventListener('click', async () => {
        // Get the player2 name based on authentication state
        const player2Name = authState.isAuthenticated ? authState.username : authState.guestAlias;
        
        // Start the game with the appropriate player names
        const gameData: gameEndData = await startSnek(app, "player1", player2Name);
        console.log("gameData", gameData);
        
        replayButtons.classList.remove('hidden');
        replayButtons.classList.add('flex');
    });
    
    restartGameButton.addEventListener('click', () => {
        // Get the player2 name based on authentication state
        const player2Name = authState.isAuthenticated ? authState.username : authState.guestAlias;
        
        restartSnek(app, "player1", player2Name);
        console.log("Restarting game");
    });
}

function newPlayersButton() {
    const newGameButton = document.getElementById('newGame');
    if (!newGameButton) {
        console.error("New game button not found");
        return;
    }
    
    newGameButton.addEventListener('click', () => {
        window.history.pushState({}, '', '/home');
        
        // Reset auth state
        authState.isAuthenticated = false;
        authState.isGuestLocked = false;
        authState.guestAlias = "";
        authState.username = "";
        
        // Reset guest form
        const guestInput = document.getElementById("guestAliasInput") as HTMLInputElement;
        const lockInButton = document.getElementById("lockInGuest") as HTMLButtonElement;
        const changeButton = document.getElementById("changeGuestAlias") as HTMLButtonElement;
        
        if (guestInput && lockInButton && changeButton) {
            guestInput.value = "";
            guestInput.disabled = false;
            lockInButton.classList.remove('hidden');
            changeButton.classList.add('hidden');
        }
        
        // Reset login form
        const usernameInput = document.getElementById("loginUsername") as HTMLInputElement;
        const passwordInput = document.getElementById("loginPassword") as HTMLInputElement;
        const loginStatus = document.getElementById("loginStatus");
        
        if (usernameInput && passwordInput && loginStatus) {
            usernameInput.value = "";
            passwordInput.value = "";
            loginStatus.classList.add('hidden');
        }
        
        // Hide replay buttons
        const replayButtons = document.getElementById('replayButtons');
        if (replayButtons) {
            replayButtons.classList.add('hidden');
            replayButtons.classList.remove('flex');
        }
        
        // Update start game button state
        updateStartGameButton();
        
        console.log("New players button clicked");
    });
}