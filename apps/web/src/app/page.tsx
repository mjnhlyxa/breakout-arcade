'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getHighScore } from '@/lib/player';
import { StartScreen } from '@/components/game/StartScreen';

export default function HomePage() {
  const router = useRouter();
  const [highScore, setHighScore] = useState<number | null>(null);

  useEffect(() => {
    setHighScore(getHighScore());
  }, []);

  const handleStart = () => {
    router.push('/game');
  };

  const handleLeaderboard = () => {
    router.push('/leaderboard');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <StartScreen highScore={highScore} onStart={handleStart} />

      <button
        onClick={handleLeaderboard}
        className="mt-4 text-text-secondary hover:text-primary transition-colors text-sm"
      >
        View Leaderboard →
      </button>
    </main>
  );
}
