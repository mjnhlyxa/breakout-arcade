# Breakout Arcade — State Management Design

> **C4 Level**: 3 — State Management Components

## 1. State Categories

### 1.1 Game State (Local/Browser)
- Ball position, velocity, angle
- Paddle position
- Brick grid state (intact/broken)
- Current score, lives, level
- Game phase (idle, playing, paused, game_over)

### 1.2 Player State (localStorage)
- playerId: UUID v4
- highScore: number

### 1.3 Leaderboard State (API)
- Top scores list
- Loading/error states

## 2. Game State Machine

```
┌─────────┐   start    ┌─────────┐
│  IDLE   │ ────────► │ PLAYING │
│         │            │         │
└─────────┘            └────┬────┘
     ▲                       │
     │                       │ ball falls
     │                       ▼
     │                  ┌─────────┐
     │                  │ GAME_OVER│
     │                  └─────────┘
     │                       │
     │                       │ restart
     │                       ▼
     │                  ┌─────────┐
     └──────────────────│  IDLE   │
                        └─────────┘
```

## 3. React State Structure

```typescript
// In GamePage component
const [gameState, setGameState] = useState<'idle' | 'playing' | 'game_over'>('idle');
const [score, setScore] = useState(0);
const [lives, setLives] = useState(3);
const [level, setLevel] = useState(1);
const [highScore, setHighScore] = useState<number | null>(null);

// Passed to GameCanvas
const handleScoreUpdate = (newScore: number) => setScore(newScore);
const handleLivesUpdate = (newLives: number) => setLives(newLives);
const handleLevelUpdate = (newLevel: number) => setLevel(newLevel);
const handleGameOver = (finalScore: number, finalLevel: number) => {
  setScore(finalScore);
  setLevel(finalLevel);
  setGameState('game_over');
  // Check for high score...
};
```

## 4. Player Identity Management

```typescript
// apps/web/src/lib/player.ts
import { v4 as uuidv4 } from 'uuid';

const PLAYER_ID_KEY = 'breakout_player_id';
const HIGH_SCORE_KEY = 'breakout_high_score';

export function getPlayerId(): string {
  if (typeof window === 'undefined') return '';

  let playerId = localStorage.getItem(PLAYER_ID_KEY);
  if (!playerId) {
    playerId = uuidv4();
    localStorage.setItem(PLAYER_ID_KEY, playerId);
  }
  return playerId;
}

export function getHighScore(): number | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(HIGH_SCORE_KEY);
  return stored ? parseInt(stored, 10) : null;
}

export function setHighScore(score: number): void {
  if (typeof window === 'undefined') return;
  const current = getHighScore();
  if (!current || score > current) {
    localStorage.setItem(HIGH_SCORE_KEY, score.toString());
  }
}
```

## 5. API State Management

Simple fetch with loading states (no React Query needed for MVP):

```typescript
// apps/web/src/lib/api.ts
interface ScoreSubmission {
  playerId: string;
  score: number;
  level: number;
}

interface SubmitResponse {
  success: boolean;
  rank?: number;
  globalRank?: number;
}

export async function submitScore(data: ScoreSubmission): Promise<SubmitResponse> {
  const response = await fetch('/api/scores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getLeaderboard(limit = 100): Promise<LeaderboardResponse> {
  const response = await fetch(`/api/scores?limit=${limit}`);
  return response.json();
}
```
