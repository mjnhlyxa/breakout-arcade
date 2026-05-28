const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ScoreSubmission {
  playerId: string;
  score: number;
  level: number;
}

export interface SubmitResponse {
  success: boolean;
  scoreId?: string;
  rank?: number;
  globalRank?: number;
  error?: string;
  message?: string;
}

export interface LeaderboardEntry {
  playerId: string;
  score: number;
  level: number;
  timestamp: string;
  rank: number;
}

export interface LeaderboardResponse {
  scores: LeaderboardEntry[];
  total: number;
  limit: number;
  offset: number;
}

export interface PlayerBest {
  playerId: string;
  bestScore: number;
  bestLevel: number;
  totalGames: number;
  globalRank: number;
  bestTimestamp: string;
}

export async function submitScore(data: ScoreSubmission): Promise<SubmitResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/scores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: 'Network error. Please try again.',
    };
  }
}

export async function getLeaderboard(limit = 100, offset = 0): Promise<LeaderboardResponse | null> {
  try {
    const response = await fetch(`${API_BASE}/api/scores?limit=${limit}&offset=${offset}`);
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export async function getPlayerBest(playerId: string): Promise<PlayerBest | null> {
  try {
    const response = await fetch(`${API_BASE}/api/scores/player/${playerId}`);
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
}
