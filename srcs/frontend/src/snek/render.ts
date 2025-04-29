import { Application } from 'pixi.js';
import { setupGame } from './setupGame';

async function start() {
  const app = new Application();
  await app.init({
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
  });

  document.body.appendChild(app.canvas); // use `canvas` instead of `view`

  setupGame(app);
}

start();
