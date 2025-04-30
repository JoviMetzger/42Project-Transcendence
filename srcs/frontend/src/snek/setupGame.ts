import { Application, Text, TextStyle } from 'pixi.js';
import { Snake } from './snake';
import { createMouse, randomPosition } from './mouse';
import { GAME_WIDTH, GAME_HEIGHT, gameEndData } from './main';

export function setupGame(app: Application, player1Alias: string, player2Alias: string) : gameEndData {
  const snake1 = new Snake(0xff0000, 100, 300, 'WASD', 'right');
  const snake2 = new Snake(0x00ff00, 700, 300, 'Arrow',  'left');
  
  let gameData : gameEndData = {
    winner: null,
    score: 0
  };
  
  function spawnMouse() {
    const [newX, newY] = randomPosition(GAME_WIDTH, GAME_HEIGHT);
    const mouse = createMouse(newX, newY);
    app.stage.addChild(mouse); // This is fine inside the function
    return mouse;
  }
  
  function finishGame(tie: boolean, winner: string, score:number){
    gameOver = true;
    
    const style = new TextStyle({
      fill: '#ffffff',
      fontSize: 48,
      fontWeight: 'bold',
      align: 'center'
    });
    const message = new Text({text: tie ? 'Both Snakes Lose' : `${winner} wins!`, style: style});
    message.x = GAME_WIDTH / 2 - message.width / 2;
    message.y = GAME_HEIGHT / 2 - message.height / 2;
    app.stage.addChild(message);
    gameData.winner = tie ? null : winner;
    gameData.score = score;
  }

  let gameOver = false;
  app.stage.addChild(snake1.container, snake2.container);
  let mouse = spawnMouse();
  
  // game loop
  app.ticker.add(() => {
    if (gameOver) 
      return;
      
    snake1.update();
    snake2.update();
    
    let snake1Collision = false;
    let snake2Collision = false;
    // ourobouros
    // Check for collisions
    if (snake1.checkWallCollision(GAME_WIDTH, GAME_HEIGHT) || snake1.checkSnakeCollision(snake2)) {
      snake1Collision = true;
    }
    if (snake2.checkWallCollision(GAME_WIDTH, GAME_HEIGHT) || snake2.checkSnakeCollision(snake1)) {
      snake2Collision = true;
    }
    if (snake1Collision || snake2Collision) {
      if (snake1Collision && snake2Collision) {
        return finishGame(true, 'none', 0);
      } else if (snake1Collision) {
        return finishGame(false, player2Alias, snake2.getScore());
      } else {
        return finishGame(false, player1Alias, snake1.getScore());
      }
    }
    const head1 = snake1.body[0];
    const head2 = snake2.body[0];
    const distance = (a: any, b: any) => Math.abs(a.x - b.x) < 20 && Math.abs(a.y - b.y) < 20;
    if (distance(head1, mouse)) {
      snake1.grow();
      app.stage.removeChild(mouse);
      mouse = spawnMouse();
    }
    if (distance(head2, mouse)) {
      snake2.grow();
      app.stage.removeChild(mouse);
      mouse = spawnMouse();
    }
  });

  window.addEventListener('keydown', (e) => {
    snake1.handleInput(e);
    snake2.handleInput(e);
  });
  
  return gameData;
}