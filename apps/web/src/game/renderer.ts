// Canvas renderer

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  COLORS,
} from './constants';

import type { Ball, Paddle, Brick, GameState } from './types';

export function clearCanvas(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

export function drawPaddle(ctx: CanvasRenderingContext2D, paddle: Paddle): void {
  ctx.fillStyle = COLORS.paddle;
  ctx.shadowColor = COLORS.paddle;
  ctx.shadowBlur = 15;
  ctx.beginPath();
  ctx.roundRect(paddle.position.x, paddle.position.y, paddle.width, paddle.height, 4);
  ctx.fill();
  ctx.shadowBlur = 0;
}

export function drawBall(ctx: CanvasRenderingContext2D, ball: Ball): void {
  ctx.fillStyle = COLORS.ball;
  ctx.shadowColor = COLORS.ball;
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

export function drawBrick(ctx: CanvasRenderingContext2D, brick: Brick): void {
  if (!brick.active) return;

  ctx.fillStyle = brick.color;
  ctx.shadowColor = brick.color;
  ctx.shadowBlur = 5;

  // Draw brick with slight transparency based on remaining hits
  const alpha = 0.4 + (brick.hits / brick.maxHits) * 0.6;
  ctx.globalAlpha = alpha;

  ctx.beginPath();
  ctx.roundRect(brick.x, brick.y, brick.width, brick.height, 2);
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}

export function drawBricks(ctx: CanvasRenderingContext2D, bricks: Brick[]): void {
  bricks.forEach((brick) => drawBrick(ctx, brick));
}

export function drawGame(
  ctx: CanvasRenderingContext2D,
  state: GameState
): void {
  clearCanvas(ctx);
  drawBricks(ctx, state.bricks);
  drawPaddle(ctx, state.paddle);
  drawBall(ctx, state.ball);
}
