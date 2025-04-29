import { Application, Text, TextStyle } from 'pixi.js';
import { Snake } from './snake';
import { createMouse, randomPosition } from './mouse';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

export function setupGame(app: Application) {
  const snake1 = new Snake(0xff0000, 100, 100, 'Arrow');
  const snake2 = new Snake(0x00ff00, 700, 500, 'WASD');

  const [mx, my] = randomPosition(GAME_WIDTH, GAME_HEIGHT);
  let mouse = createMouse(mx, my);
  app.stage.addChild(mouse);

  app.stage.addChild(snake1.container, snake2.container);

  let gameOver = false;

  function finishGame(winner: string) {
    gameOver = true;

    const style = new TextStyle({
      fill: '#ffffff',
      fontSize: 48,
      fontWeight: 'bold',
    });

    const message = new Text(`Game Over! Winner: ${winner}`, style);
    message.x = GAME_WIDTH / 2 - message.width / 2;
    message.y = GAME_HEIGHT / 2 - message.height / 2;
    app.stage.addChild(message);
  }

  app.ticker.add(() => {
    if (gameOver) return;

    snake1.update();
    snake2.update();

    // Check for collisions
    if (snake1.checkWallCollision(GAME_WIDTH, GAME_HEIGHT) || snake1.checkSnakeCollision(snake2)) {
      finishGame('Green Snake');
    }

    if (snake2.checkWallCollision(GAME_WIDTH, GAME_HEIGHT) || snake2.checkSnakeCollision(snake1)) {
      finishGame('Red Snake');
    }

    // Check if they eat the mouse
    const head1 = snake1.body[0];
    const head2 = snake2.body[0];

    const distance = (a: any, b: any) => Math.abs(a.x - b.x) < 20 && Math.abs(a.y - b.y) < 20;

    if (distance(head1, mouse)) {
      snake1.grow();
      app.stage.removeChild(mouse);
      const [newX, newY] = randomPosition(GAME_WIDTH, GAME_HEIGHT);
      mouse = createMouse(newX, newY);
      app.stage.addChild(mouse);
    }

    if (distance(head2, mouse)) {
      snake2.grow();
      app.stage.removeChild(mouse);
      const [newX, newY] = randomPosition(GAME_WIDTH, GAME_HEIGHT);
      mouse = createMouse(newX, newY);
      app.stage.addChild(mouse);
    }
  });

  window.addEventListener('keydown', (e) => {
    snake1.handleInput(e);
    snake2.handleInput(e);
  });
}
