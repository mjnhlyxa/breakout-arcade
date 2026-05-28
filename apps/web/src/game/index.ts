// Main game state machine and loop

import {
  CANVAS_WIDTH,
  PADDLE_WIDTH,
  PADDLE_SPEED,
  PADDLE_Y,
  INITIAL_LIVES,
  BALL_SPEED_INITIAL,
  BALL_SPEED_INCREMENT,
} from './constants';

import {
  createBall,
  createPaddle,
  createBricks,
  launchBall,
  updateBall,
  checkWallCollision,
  checkPaddleCollision,
  checkBrickCollision,
  isBallLost,
} from './physics';

import type { GameState, Ball, Paddle, Brick } from './types';

export function createInitialState(): GameState {
  const ball = createBall();
  const paddle = createPaddle();

  return {
    ball,
    paddle,
    bricks: createBricks(1),
    score: 0,
    lives: INITIAL_LIVES,
    level: 1,
    status: 'idle',
    lastTime: 0,
  };
}

export function resetBall(state: GameState): GameState {
  return {
    ...state,
    ball: {
      ...createBall(),
      position: {
        x: state.paddle.position.x + state.paddle.width / 2,
        y: PADDLE_Y - 20,
      },
    },
  };
}

export function nextLevel(state: GameState): GameState {
  const newLevel = state.level + 1;
  const ball = createBall();

  return {
    ...state,
    level: newLevel,
    bricks: createBricks(newLevel),
    ball: {
      ...ball,
      position: {
        x: state.paddle.position.x + state.paddle.width / 2,
        y: PADDLE_Y - 20,
      },
    },
    status: 'idle',
  };
}

export function restartGame(): GameState {
  const paddle = createPaddle();

  return {
    ball: {
      ...createBall(),
      position: {
        x: paddle.position.x + paddle.width / 2,
        y: PADDLE_Y - 20,
      },
    },
    paddle,
    bricks: createBricks(1),
    score: 0,
    lives: INITIAL_LIVES,
    level: 1,
    status: 'idle',
    lastTime: 0,
  };
}

export function movePaddle(state: GameState, direction: 'left' | 'right'): GameState {
  let x = state.paddle.position.x;

  if (direction === 'left') {
    x = Math.max(0, x - PADDLE_SPEED);
  } else {
    x = Math.min(CANVAS_WIDTH - PADDLE_WIDTH, x + PADDLE_SPEED);
  }

  return {
    ...state,
    paddle: {
      ...state.paddle,
      position: { ...state.paddle.position, x },
    },
  };
}

export function setPaddlePosition(state: GameState, x: number): GameState {
  const clampedX = Math.max(0, Math.min(CANVAS_WIDTH - PADDLE_WIDTH, x - PADDLE_WIDTH / 2));

  // If ball is on paddle (idle), move ball with paddle
  let ball = state.ball;
  if (state.status === 'idle') {
    ball = {
      ...ball,
      position: { ...ball.position, x: clampedX + PADDLE_WIDTH / 2 },
    };
  }

  return {
    ...state,
    paddle: {
      ...state.paddle,
      position: { ...state.paddle.position, x: clampedX },
    },
    ball,
  };
}

export function startGame(state: GameState): GameState {
  return {
    ...state,
    ball: launchBall(state.ball, state.level),
    status: 'playing',
  };
}

export function pauseGame(state: GameState): GameState {
  if (state.status !== 'playing') return state;
  return { ...state, status: 'paused' };
}

export function resumeGame(state: GameState): GameState {
  if (state.status !== 'paused') return state;
  return { ...state, status: 'playing' };
}

export function updateGame(state: GameState, deltaTime: number): GameState {
  if (state.status !== 'playing') return state;

  let ball = state.ball;
  let bricks = state.bricks;
  let score = state.score;
  let lives = state.lives;
  let status = state.status;

  // Update ball position
  ball = updateBall(ball, state.level);

  // Wall collisions
  ball = checkWallCollision(ball);

  // Paddle collision
  ball = checkPaddleCollision(ball, state.paddle);

  // Brick collision
  const brickResult = checkBrickCollision(ball, bricks);
  ball = brickResult.ball;
  bricks = brickResult.bricks;
  score += brickResult.scoreIncrease;

  // Check if ball is lost
  if (isBallLost(ball)) {
    lives -= 1;
    if (lives <= 0) {
      status = 'game_over';
    } else {
      status = 'life_lost';
      // Reset ball to paddle
      ball = {
        ...createBall(),
        position: {
          x: state.paddle.position.x + state.paddle.width / 2,
          y: PADDLE_Y - 20,
        },
      };
    }
  }

  // Check if level complete (all bricks destroyed)
  const activeBricks = bricks.filter((b) => b.active);
  if (activeBricks.length === 0) {
    status = 'level_complete';
  }

  return {
    ...state,
    ball,
    bricks,
    score,
    lives,
    status,
  };
}

export { createBall, createPaddle, createBricks, launchBall };
