import { startSnek, preGameScreen, restartSnek } from '../snek/main';
import { Application } from 'pixi.js'

export function setupTestGame() {
    const player1Alias = "julius"
    console.log("testgame page");
    const root = document.getElementById('app');
    if (root) {
        root.innerHTML = "";
        root.insertAdjacentHTML("beforeend", /*html*/ `
        <div class="flex flex-col gap-4 items-center">
            <div class="flex flex-row gap-20 bg-pink-500 text-white font-bold py-2 px-4 rounded">
                <div class="flex flex-col gap-4 bg-red-500 py-2 px-4 rounded justify-items-center ">
                    <p>Player1 info (WASD)</span>
                    <p class="text-center">${player1Alias}</span>
                </div>
                <div class="flex flex-col gap-4 bg-green-500 py-2 px-4 rounded justify-items-center ">
                    <p>Player1 info (WASD)</span>
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