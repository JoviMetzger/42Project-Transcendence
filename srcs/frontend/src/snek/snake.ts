import { Container, Graphics } from 'pixi.js';

type Direction = 'up' | 'down' | 'left' | 'right';

const keyMap = {
  Arrow: {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
  },
  WASD: {
    KeyW: 'up',
    KeyS: 'down',
    KeyA: 'left',
    KeyD: 'right',
  },
};

export class Snake {
  public container: Container = new Container();
  public body: Graphics[] = [];
  private direction: Direction = 'right';
  private speed = 4;
  private controls: 'Arrow' | 'WASD';
  private color: number;

  constructor(color: number, x: number, y: number, controls: 'Arrow' | 'WASD') {
    this.controls = controls;
    this.color = color;
    const head = this.createSegment(x, y);
    this.container.addChild(head);
    this.body.push(head);
  }

  private createSegment(x: number, y: number): Graphics {
    const segment = new Graphics();
    segment.beginFill(this.color);
    segment.drawRect(0, 0, 20, 20);
    segment.endFill();
    segment.x = x;
    segment.y = y;
    return segment;
  }

  grow() {
    const last = this.body[this.body.length - 1];
    const newSegment = this.createSegment(last.x, last.y);
    this.container.addChild(newSegment);
    this.body.push(newSegment);
  }

  update() {
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }

    const head = this.body[0];
    switch (this.direction) {
      case 'up': head.y -= this.speed; break;
      case 'down': head.y += this.speed; break;
      case 'left': head.x -= this.speed; break;
      case 'right': head.x += this.speed; break;
    }
  }

  handleInput(e: KeyboardEvent) {
    const map = keyMap[this.controls];
    const dir = map[e.code as keyof typeof map];
    if (dir) this.direction = dir;
  }

  checkWallCollision(width: number, height: number): boolean {
    const head = this.body[0];
    return head.x < 0 || head.x >= width || head.y < 0 || head.y >= height;
  }

  checkSelfCollision(): boolean {
    const head = this.body[0];
    return this.body.slice(1).some(segment =>
      segment.x === head.x && segment.y === head.y
    );
  }

  checkSnakeCollision(other: Snake): boolean {
    const head = this.body[0];
    return other.body.some(segment =>
      segment.x === head.x && segment.y === head.y
    );
  }
}
