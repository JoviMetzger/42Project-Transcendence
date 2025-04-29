import { Application, Graphics } from 'pixi.js';
import { Snake } from './snake.ts';

export function setupGame(app: Application) {
  const snake1 = new Snake(0xff0000, 100, 100, 'Arrow');
  const snake2 = new Snake(0x00ff00, 700, 500, 'WASD');

  app.stage.addChild(snake1.container, snake2.container);

  app.ticker.add(() => {
    snake1.update();
    snake2.update();
  });

  window.addEventListener('keydown', (e) => {
    snake1.handleInput(e);
    snake2.handleInput(e);
  });
}
