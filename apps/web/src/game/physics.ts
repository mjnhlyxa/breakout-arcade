// Physics engine for ball movement and collision

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PADDLE_WIDTH,
  BALL_RADIUS,
  BALL_SPEED_INITIAL,
  BALL_SPEED_INCREMENT,
  BALL_SPEED_MAX,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BRICK_PADDING,
  BRICK_OFFSET_TOP,
  BRICK_OFFSET_LEFT,
  SCORE_PER_BRICK,
  LEVELS_CONFIG,
} from './constants';

import type { Ball, Paddle, Brick, GameState, LevelDefinition } from './types';

export function createBall(): Ball {
  return {
    position: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 60 },
    velocity: { vx: 0, vy: 0 },
    radius: BALL_RADIUS,
  };
}

export function createPaddle(): Paddle {
  return {
    position: { x: (CANVAS_WIDTH - PADDLE_WIDTH) / 2, y: CANVAS_HEIGHT - 40 },
    width: PADDLE_WIDTH,
    height: 12,
  };
}

export function createBricks(level: number): Brick[] {
  const config: LevelDefinition = LEVELS_CONFIG[Math.min(level - 1, LEVELS_CONFIG.length - 1)];
  const bricks: Brick[] = [];

  for (let row = 0; row < config.rows; row++) {
    for (let col = 0; col < config.cols; col++) {
      const color = config.colors[row % config.colors.length];
      bricks.push({
        x: BRICK_OFFSET_LEFT + col * (BRICK_WIDTH + BRICK_PADDING),
        y: BRICK_OFFSET_TOP + row * (BRICK_HEIGHT + BRICK_PADDING),
        width: BRICK_WIDTH,
        height: BRICK_HEIGHT,
        color,
        hits: config.maxHits,
        maxHits: config.maxHits,
        active: true,
      });
    }
  }

  return bricks;
}

export function launchBall(ball: Ball, level: number): Ball {
  const config = LEVELS_CONFIG[Math.min(level - 1, LEVELS_CONFIG.length - 1)];
  const speed = Math.min(BALL_SPEED_INITIAL * config.speedMultiplier, BALL_SPEED_MAX);
  const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5;

  return {
    ...ball,
    velocity: {
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    },
  };
}

export function updateBall(ball: Ball, level: number): Ball {
  const config = LEVELS_CONFIG[Math.min(level - 1, LEVELS_CONFIG.length - 1)];
  const maxSpeed = Math.min(BALL_SPEED_MAX * config.speedMultiplier, BALL_SPEED_MAX);

  let vx = ball.velocity.vx;
  let vy = ball.velocity.vy;

  // Normalize speed if it exceeds max
  const currentSpeed = Math.sqrt(vx * vx + vy * vy);
  if (currentSpeed > maxSpeed) {
    vx = (vx / currentSpeed) * maxSpeed;
    vy = (vy / currentSpeed) * maxSpeed;
  }

  return {
    ...ball,
    position: {
      x: ball.position.x + vx,
      y: ball.position.y + vy,
    },
    velocity: { vx, vy },
  };
}

export function checkWallCollision(ball: Ball): Ball {
  let vx = ball.velocity.vx;
  let vy = ball.velocity.vy;
  let x = ball.position.x;
  let y = ball.position.y;

  // Left wall
  if (x - ball.radius <= 0) {
    x = ball.radius;
    vx = Math.abs(vx);
  }

  // Right wall
  if (x + ball.radius >= CANVAS_WIDTH) {
    x = CANVAS_WIDTH - ball.radius;
    vx = -Math.abs(vx);
  }

  // Top wall
  if (y - ball.radius <= 0) {
    y = ball.radius;
    vy = Math.abs(vy);
  }

  return {
    ...ball,
    position: { x, y },
    velocity: { vx, vy },
  };
}

export function checkPaddleCollision(ball: Ball, paddle: Paddle): Ball {
  const ballBottom = ball.position.y + ball.radius;
  const ballTop = ball.position.y - ball.radius;
  const paddleTop = paddle.position.y;
  const paddleBottom = paddle.position.y + paddle.height;
  const paddleLeft = paddle.position.x;
  const paddleRight = paddle.position.x + paddle.width;

  // Check if ball is in paddle region
  if (
    ballBottom >= paddleTop &&
    ballTop <= paddleBottom &&
    ball.position.x >= paddleLeft &&
    ball.position.x <= paddleRight &&
    ball.velocity.vy > 0
  ) {
    // Calculate hit position relative to paddle center (-1 to 1)
    const hitPos = (ball.position.x - (paddle.position.x + paddle.width / 2)) / (paddle.width / 2);

    // Reflect with angle based on hit position
    const baseSpeed = Math.sqrt(ball.velocity.vx ** 2 + ball.velocity.vy ** 2);
    const angle = -Math.PI / 2 + hitPos * (Math.PI / 3); // -90° ± 60°

    return {
      ...ball,
      position: { ...ball.position, y: paddleTop - ball.radius },
      velocity: {
        vx: Math.cos(angle) * baseSpeed,
        vy: Math.sin(angle) * baseSpeed,
      },
    };
  }

  return ball;
}

export function checkBrickCollision(ball: Ball, bricks: Brick[]): { ball: Ball; bricks: Brick[]; scoreIncrease: number } {
  let scoreIncrease = 0;

  const updatedBricks = bricks.map((brick) => {
    if (!brick.active) return brick;

    const ballLeft = ball.position.x - ball.radius;
    const ballRight = ball.position.x + ball.radius;
    const ballTop = ball.position.y - ball.radius;
    const ballBottom = ball.position.y + ball.radius;

    const brickLeft = brick.x;
    const brickRight = brick.x + brick.width;
    const brickTop = brick.y;
    const brickBottom = brick.y + brick.height;

    // Check collision
    if (
      ballRight >= brickLeft &&
      ballLeft <= brickRight &&
      ballBottom >= brickTop &&
      ballTop <= brickBottom
    ) {
      // Determine collision side
      const overlapLeft = ballRight - brickLeft;
      const overlapRight = brickRight - ballLeft;
      const overlapTop = ballBottom - brickTop;
      const overlapBottom = brickBottom - ballTop;

      const minOverlapX = Math.min(overlapLeft, overlapRight);
      const minOverlapY = Math.min(overlapTop, overlapBottom);

      let vx = ball.velocity.vx;
      let vy = ball.velocity.vy;

      if (minOverlapX < minOverlapY) {
        vx = -vx;
      } else {
        vy = -vy;
      }

      ball = { ...ball, velocity: { vx, vy } };

      // Damage brick
      const newHits = brick.hits - 1;
      if (newHits <= 0) {
        brick = { ...brick, active: false, hits: 0 };
        scoreIncrease += SCORE_PER_BRICK * brick.maxHits;
      } else {
        brick = { ...brick, hits: newHits };
      }
    }

    return brick;
  });

  return { ball, bricks: updatedBricks, scoreIncrease };
}

export function isBallLost(ball: Ball): boolean {
  return ball.position.y - ball.radius > CANVAS_HEIGHT;
}

export function getLevelConfig(level: number): LevelDefinition {
  return LEVELS_CONFIG[Math.min(level - 1, LEVELS_CONFIG.length - 1)];
}
