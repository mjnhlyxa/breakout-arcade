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

export function clearHighScore(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HIGH_SCORE_KEY);
}
