import { Container, Graphics } from 'pixi.js';
import { GRID_SIZE } from './main';


const MOVE_DELAY = 5; // frames

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
  private direction: Direction;
  private nextDirection: Direction;
  private moveCounter = 0;
  private controls: 'Arrow' | 'WASD';
  private color: number;
  private borderColor: number;
  private score = 0;

  constructor(color: number, startX: number, startY: number, controls: 'Arrow' | 'WASD', startDirection: Direction) {
    this.controls = controls;
    this.color = color;
    this.borderColor = this.invertColor(color);
    
    // Create initial head at starting position (aligned to grid)
    const alignedX = Math.floor(startX / GRID_SIZE) * GRID_SIZE;
    const alignedY = Math.floor(startY / GRID_SIZE) * GRID_SIZE;
    const head = this.createSegment(alignedX, alignedY, true);

    this.direction = startDirection;
    this.nextDirection = startDirection;
    
    this.container.addChild(head);
    this.body.push(head);
    
    // Add two initial segments to make snake visible
    this.grow();
    this.grow();
  }

  private invertColor(color: number): number {
    // Simple way to create contrasting color for border
    return 0xFFFFFF - color;
  }

  private createSegment(x: number, y: number, isHead: boolean = false): Graphics {
    const segment = new Graphics();
    
    // Draw segment with border
    segment.lineStyle(2, this.borderColor);
    segment.beginFill(this.color);
    
    if (isHead) {
      // Make head slightly different (rounded rectangle)
      segment.drawRoundedRect(0, 0, GRID_SIZE, GRID_SIZE, 5);
      
      // Add eyes to head
      segment.endFill();
      segment.beginFill(this.borderColor);
      
      // Position eyes based on direction
      const eyeSize = GRID_SIZE / 5;
      segment.drawCircle(GRID_SIZE / 3, GRID_SIZE / 3, eyeSize);
      segment.drawCircle(GRID_SIZE * 2 / 3, GRID_SIZE / 3, eyeSize);
    } else {
      // Regular body segment (square)
      segment.drawRect(2, 2, GRID_SIZE - 4, GRID_SIZE - 4);
    }
    
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
    this.score += 10;
  }

  getScore(): number {
    return this.score;
  }

  update() {
    // Use a counter to slow down movement to make game more playable
    this.moveCounter++;
    if (this.moveCounter < MOVE_DELAY) {
      return;
    }
    this.moveCounter = 0;
    
    // Update direction from next direction
    this.direction = this.nextDirection;
    
    // Move body segments (from tail to head)
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }

    // Move head according to direction (grid-based movement)
    const head = this.body[0];
    switch (this.direction) {
      case 'up': head.y -= GRID_SIZE; break;
      case 'down': head.y += GRID_SIZE; break;
      case 'left': head.x -= GRID_SIZE; break;
      case 'right': head.x += GRID_SIZE; break;
    }
  }

  handleInput(e: KeyboardEvent) {
    const map = keyMap[this.controls];
    const newDir = map[e.code as keyof typeof map];
    
    if (!newDir) return;
    
    // Prevent 180-degree turns by checking if the new direction
    // would cause the snake to reverse
    const invalid = 
      (this.direction === 'up' && newDir === 'down') ||
      (this.direction === 'down' && newDir === 'up') ||
      (this.direction === 'left' && newDir === 'right') ||
      (this.direction === 'right' && newDir === 'left');
      
    if (!invalid) {
      this.nextDirection = newDir;
    }
  }

  checkWallCollision(width: number, height: number): boolean {
    const head = this.body[0];
    return head.x < 0 || head.x >= width || head.y < 0 || head.y >= height;
  }

  checkSelfCollision(): boolean {
    const head = this.body[0];
    // Check if head collides with any segment (skip first few segments)
    // Skip first 3 segments to avoid false collisions
    return this.body.slice(3).some(segment =>
      Math.abs(segment.x - head.x) < GRID_SIZE/2 && 
      Math.abs(segment.y - head.y) < GRID_SIZE/2
    );
  }

  checkSnakeCollision(other: Snake): boolean {
    const head = this.body[0];
    return other.body.some(segment =>
      Math.abs(segment.x - head.x) < GRID_SIZE/2 && 
      Math.abs(segment.y - head.y) < GRID_SIZE/2
    );
  }
}