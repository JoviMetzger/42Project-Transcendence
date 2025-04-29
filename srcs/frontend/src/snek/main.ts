import { Graphics } from 'pixi.js';
import { Application } from 'pixi.js';
import { setupGame } from './setupGame.ts';

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;
export const GRID_SIZE = 20;

export async function startSnek(snekContainer: HTMLElement) {  
  const app = new Application();
  await app.init({
    width: 800,
    height: 600,
    background: '#1099bb'
  });
  // const border = new Graphics();
  // border.
  // app.stage.addChild(border);

  snekContainer.appendChild(app.canvas); // use `canvas` instead of `view`

  setupGame(app);
}
