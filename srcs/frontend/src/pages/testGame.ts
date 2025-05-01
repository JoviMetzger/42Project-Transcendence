import { startSnek } from '../snek/main';
import '../styles/snek.css';

export function setupTestGame() {
    console.log("testgame page");
    const root = document.getElementById('app');
    if (root) {
        root.innerHTML = "";
        root.insertAdjacentHTML("beforeend", /*html*/ `
        <div class="flex flex-col items-center">
            <div id="testContainer" class="mb-4"></div>
            <div class="flex flex-row gap-4">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Blue Button</button>
                <button class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" id="restartGame">Rematch!</button>
            </div>
        </div>
        `);
    }
    const testContainer = document.getElementById('testContainer');
    if (testContainer) {
        startSnek(testContainer);
    } else {
        console.error("Test container not found!");
    }
}