'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getLeaderboard, getPlayerBest, type LeaderboardEntry, type PlayerBest } from '@/lib/api';
import { getPlayerId } from '@/lib/player';

export default function LeaderboardPage() {
  const router = useRouter();
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [playerBest, setPlayerBest] = useState<PlayerBest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);

      try {
        const [leaderboardData, playerBestData] = await Promise.all([
          getLeaderboard(100),
          getPlayerBest(getPlayerId()),
        ]);

        if (leaderboardData) {
          setScores(leaderboardData.scores);
        }
        if (playerBestData) {
          setPlayerBest(playerBestData);
        }

        if (!leaderboardData) {
          setError(true);
        }
      } catch {
        setError(true);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <main className="min-h-screen p-4 max-w-lg mx-auto">
      <header className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push('/')}
          className="text-text-secondary hover:text-primary transition-colors text-sm"
        >
          ← Back
        </button>
        <h1 className="font-orbitron text-lg font-bold text-primary tracking-wider">
          LEADERBOARD
        </h1>
        <button
          onClick={() => router.push('/game')}
          className="text-primary hover:text-primary/80 text-sm font-semibold"
        >
          Play →
        </button>
      </header>

      {playerBest && (
        <Card className="p-4 mb-6 text-center border-primary/30 bg-primary/5">
          <p className="text-text-secondary text-xs mb-1">YOUR BEST</p>
          <p className="font-mono text-3xl font-bold text-primary">
            {playerBest.bestScore.toLocaleString()}
          </p>
          <p className="text-text-secondary text-sm mt-1">
            Rank #{playerBest.globalRank} of {playerBest.totalGames.toLocaleString()}
          </p>
        </Card>
      )}

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-error mb-4">Failed to load leaderboard</p>
          <Button onClick={handleRetry} variant="secondary">
            Retry
          </Button>
        </div>
      )}

      {!loading && !error && scores.length === 0 && (
        <div className="text-center py-12 text-text-secondary">
          <p className="text-4xl mb-4">🏆</p>
          <p>No scores yet — be the first!</p>
          <Button onClick={() => router.push('/game')} className="mt-4">
            Play Now
          </Button>
        </div>
      )}

      {!loading && !error && scores.length > 0 && (
        <div className="space-y-2">
          {scores.map((entry) => (
            <div
              key={`${entry.playerId}-${entry.rank}`}
              className={`flex items-center gap-3 p-3 rounded-lg bg-surface border ${
                entry.playerId === getPlayerId()
                  ? 'border-primary/50 bg-primary/10'
                  : 'border-white/5'
              }`}
            >
              <span
                className={`font-mono font-bold w-10 ${
                  entry.rank === 1
                    ? 'text-yellow-400'
                    : entry.rank === 2
                    ? 'text-gray-300'
                    : entry.rank === 3
                    ? 'text-amber-600'
                    : 'text-text-secondary'
                }`}
              >
                #{entry.rank}
              </span>

              <div className="flex-1">
                <p className="font-mono font-semibold text-lg">
                  {entry.score.toLocaleString()}
                </p>
                <p className="text-text-secondary text-xs">
                  Level {entry.level}
                </p>
              </div>

              {entry.playerId === getPlayerId() && (
                <span className="text-xs text-primary bg-primary/20 px-2 py-1 rounded">
                  YOU
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
