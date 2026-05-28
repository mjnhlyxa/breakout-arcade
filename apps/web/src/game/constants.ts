// Game constants

export const CANVAS_WIDTH = 400;
export const CANVAS_HEIGHT = 600;

export const PADDLE_WIDTH = 80;
export const PADDLE_HEIGHT = 12;
export const PADDLE_SPEED = 8;
export const PADDLE_Y = CANVAS_HEIGHT - 40;

export const BALL_RADIUS = 6;
export const BALL_SPEED_INITIAL = 5;
export const BALL_SPEED_MAX = 12;
export const BALL_SPEED_INCREMENT = 0.3;

export const BRICK_ROWS = 5;
export const BRICK_COLS = 10;
export const BRICK_WIDTH = 36;
export const BRICK_HEIGHT = 16;
export const BRICK_PADDING = 4;
export const BRICK_OFFSET_TOP = 60;
export const BRICK_OFFSET_LEFT = 8;

export const INITIAL_LIVES = 3;
export const SCORE_PER_BRICK = 10;

export const COLORS = {
  background: '#0a0a1a',
  paddle: '#00d4ff',
  ball: '#ffffff',
  brickLevel1: ['#ef4444', '#f97316'],
  brickLevel2: ['#ef4444', '#f97316'],
  brickLevel3: ['#eab308', '#22c55e'],
  brickLevel4: ['#eab308', '#22c55e'],
  brickLevel5: ['#3b82f6', '#a855f7'],
  brickLevel6: ['#3b82f6', '#a855f7'],
  brickLevel7: ['#ec4899', '#06b6d4'],
  brickLevel8: ['#ec4899', '#06b6d4'],
  brickLevel9: ['#ffd700', '#ffd700'],
};

export const LEVELS_CONFIG = [
  { rows: 3, cols: 10, colors: COLORS.brickLevel1, maxHits: 1, speedMultiplier: 1.0 },
  { rows: 4, cols: 10, colors: COLORS.brickLevel2, maxHits: 1, speedMultiplier: 1.1 },
  { rows: 4, cols: 10, colors: COLORS.brickLevel3, maxHits: 1, speedMultiplier: 1.2 },
  { rows: 5, cols: 10, colors: COLORS.brickLevel3, maxHits: 2, speedMultiplier: 1.3 },
  { rows: 5, cols: 10, colors: COLORS.brickLevel4, maxHits: 2, speedMultiplier: 1.4 },
  { rows: 5, cols: 10, colors: COLORS.brickLevel5, maxHits: 2, speedMultiplier: 1.5 },
  { rows: 6, cols: 10, colors: COLORS.brickLevel6, maxHits: 2, speedMultiplier: 1.6 },
  { rows: 6, cols: 10, colors: COLORS.brickLevel7, maxHits: 3, speedMultiplier: 1.7 },
  { rows: 7, cols: 10, colors: COLORS.brickLevel8, maxHits: 3, speedMultiplier: 1.8 },
  { rows: 8, cols: 10, colors: COLORS.brickLevel9, maxHits: 3, speedMultiplier: 2.0 },
];
