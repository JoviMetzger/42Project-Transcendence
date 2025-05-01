import { Application } from 'pixi.js';
import { setupGame } from './setupGame.ts';

export type gameEndData = {
  winner: string | null,
  p1score: number;
  p2score: number;
}

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;
export const GRID_SIZE = 20;
export const BCKGRND_COLOR = '#1099bb'
export const SNAKE1_COLOR = 0x00ff00;
export const SNAKE2_COLOR = 0xff0000;


export async function startSnek(snekContainer: HTMLElement) {  
  const app = new Application();
  await app.init({
    width: 800,
    height: 600,
    background: BCKGRND_COLOR,
  });
  // const border = new Graphics();
  // border.
  // app.stage.addChild(border);

  snekContainer.appendChild(app.canvas);

  const winner = await setupGame(app, "player1", "player2");
  console.log("winner data:", winner);
}

export function invertColor(color: number): number {
    return 0xFFFFFF - color;
}