// Game types - pure TypeScript, no dependencies

export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  vx: number;
  vy: number;
}

export interface Ball {
  position: Position;
  velocity: Velocity;
  radius: number;
}

export interface Paddle {
  position: Position;
  width: number;
  height: number;
}

export interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  hits: number;
  maxHits: number;
  active: boolean;
}

export interface GameState {
  ball: Ball;
  paddle: Paddle;
  bricks: Brick[];
  score: number;
  lives: number;
  level: number;
  status: 'idle' | 'playing' | 'paused' | 'life_lost' | 'level_complete' | 'game_over';
  lastTime: number;
}

export interface LevelDefinition {
  rows: number;
  cols: number;
  colors: string[];
  maxHits: number;
  speedMultiplier: number;
}
