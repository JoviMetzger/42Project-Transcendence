import { Graphics } from 'pixi.js';

export function createMouse(x: number, y: number): Graphics {
  const mouse = new Graphics();
  mouse.beginFill(0xffff00);
  mouse.drawCircle(0, 0, 10);
  mouse.endFill();
  mouse.x = x;
  mouse.y = y;
  return mouse;
}

export function randomPosition(width: number, height: number): [number, number] {
  const grid = 20;
  const x = Math.floor(Math.random() * (width / grid)) * grid;
  const y = Math.floor(Math.random() * (height / grid)) * grid;
  return [x, y];
}
