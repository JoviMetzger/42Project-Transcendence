import { startSnek, preGameScreen, restartSnek } from '../snek/main';
import { Application } from 'pixi.js'

export function setupTestGame() {
    const player1Alias = "julius"
    console.log("testgame page");
    const root = document.getElementById('app');
    if (root) {
        root.innerHTML = "";
        root.insertAdjacentHTML("beforeend", /*html*/ `
        <div class="flex flex-col gap-4 items-center bg-black bg-opacity-75 py-20 px-8 rounded">
            <div class="flex flex-row w-full gap-20 bg-pink-500 text-white py-2 px-4 rounded justify-center">
                <div class="flex flex-col flex-1 gap-4 bg-red-500 py-2 px-4 rounded justify-items-center ">
                    <p>Player1 info (WASD)</span>
                    <p class="text-center">${player1Alias}</span>
                </div>
                <div class="flex flex-col flex-1 gap-4 bg-green-500 py-2 px-4 rounded justify-items-center ">
                    <p>Player2 info (ARROW)</span>
                    <div class="flex items-center gap-4">
                        <label class="flex items-center cursor-pointer">
                            <span class="mr-2">Guest</span>
                            <input type="checkbox" id="authToggle" class="sr-only peer">
                            <div class="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 relative transition-all duration-300">
                                <div class="absolute w-6 h-6 bg-white rounded-full left-1 top-0.5 peer-checked:left-7 transition-all duration-300"></div>
                            </div>
                            <span class="ml-2">Login</span>
                        </label>
                    </div>

                    <!-- Guest Form -->
                    <form id="GuestAliasform" class="flex flex-col gap-2 text-black">
                        <input type="text" id="guestAliasInput" class="p-2 rounded" placeholder="Guest name" />
                        <div class="flex gap-2">
                            <button id="lockInGuest" type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Lock In</button>
                            <button id="changeGuestAlias" type="button" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded hidden">Change</button>
                        </div>
                    </form>

                    <!-- Login Form -->
                    <form id="LoginForm" class="flex-col gap-2 text-black hidden">
                        <input type="text" id="loginUsername" class="p-2 rounded" placeholder="Username" />
                        <input type="password" id="loginPassword" class="p-2 rounded" placeholder="Password" />
                        <button type="button" id="loginButton" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Login</button>
                    </form>
                    <p class="text-center">${player1Alias}</span>
                </div>
            </div>
            <button class=btn id="startGame">Start Game</button>
            <div id="gameContainer" class="mb-4"></div>
            <div class="flex flex-row gap-4">
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
}

function setupGuestAliasLocking() {
    const guestInput = document.getElementById("guestAliasInput") as HTMLInputElement;
    const lockInButton = document.getElementById("lockInGuest") as HTMLButtonElement;
    const changeButton = document.getElementById("changeGuestAlias") as HTMLButtonElement;

    if (!guestInput || !lockInButton || !changeButton) {
        console.error("Guest alias input or buttons not found");
        return;
    }

    lockInButton.addEventListener('click', () => {
        guestInput.disabled = true;
        lockInButton.classList.add('hidden');
        changeButton.classList.remove('hidden');
    });

    changeButton.addEventListener('click', () => {
        guestInput.disabled = false;
        changeButton.classList.add('hidden');
        lockInButton.classList.remove('hidden');
    });
}

function setupAuthToggle() {
    const toggle = document.getElementById("authToggle") as HTMLInputElement;
    const guestForm = document.getElementById("GuestAliasform") as HTMLFormElement;
    const loginForm = document.getElementById("LoginForm") as HTMLFormElement;

    if (!toggle || !guestForm || !loginForm) {
        console.error("Auth toggle or forms not found");
        return;
    }

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            guestForm.classList.add('hidden');
            guestForm.classList.remove('flex');

            loginForm.classList.remove('hidden');
            loginForm.classList.add('flex');
        } else {
            loginForm.classList.add('hidden');
            loginForm.classList.remove('flex');

            guestForm.classList.remove('hidden');
            guestForm.classList.add('flex');
        }
    });
}

function startGameListeners(app: Application) {
    const startGameButton = document.getElementById('startGame');
    const restartGameButton = document.getElementById('restartGame');
    const gameContainer = document.getElementById('gameContainer');
    if (!gameContainer || !startGameButton || !restartGameButton) {
        console.error("One or more elements not found");
        return;
    }
    startGameButton.addEventListener('click', () => {
            startSnek(app, "player1", "player2");
        });
    restartGameButton.addEventListener('click', () => {
        restartSnek(app, "player1", "player2");
        console.log("Restarting game");
    });
}