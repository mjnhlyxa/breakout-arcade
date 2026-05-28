'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import type { SubmitResponse } from '@/lib/api';

interface GameOverScreenProps {
  score: number;
  level: number;
  isNewHighScore: boolean;
  onSubmit: () => Promise<SubmitResponse>;
  onRestart: () => void;
  onLeaderboard: () => void;
}

export function GameOverScreen({
  score,
  level,
  isNewHighScore,
  onSubmit,
  onRestart,
  onLeaderboard,
}: GameOverScreenProps) {
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [submitResult, setSubmitResult] = useState<SubmitResponse | null>(null);

  const handleSubmit = async () => {
    setSubmitState('submitting');
    try {
      const result = await onSubmit();
      setSubmitResult(result);
      setSubmitState(result.success ? 'submitted' : 'error');
    } catch {
      setSubmitState('error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 min-h-[400px]">
      <h1 className="font-orbitron text-4xl font-black text-error drop-shadow-[0_0_20px_rgba(255,51,102,0.5)] tracking-wider">
        GAME OVER
      </h1>

      <div className="text-center">
        <p className="text-text-secondary text-sm mb-1">FINAL SCORE</p>
        <p className="font-mono text-5xl font-bold text-text-primary">
          {score.toLocaleString()}
        </p>
      </div>

      <p className="text-text-secondary text-sm">Level {level} reached</p>

      {isNewHighScore && (
        <div className="animate-pulse bg-success/10 border border-success/50 px-4 py-2 rounded-lg">
          <span className="text-success font-bold">★ NEW HIGH SCORE! ★</span>
        </div>
      )}

      <div className="flex flex-col gap-3 w-full max-w-[280px]">
        {submitState === 'idle' && (
          <Button onClick={handleSubmit} size="lg" className="w-full">
            SUBMIT TO LEADERBOARD
          </Button>
        )}

        {submitState === 'submitting' && (
          <Button disabled loading size="lg" className="w-full">
            SUBMITTING...
          </Button>
        )}

        {submitState === 'submitted' && submitResult && (
          <div className="text-center bg-primary/10 border border-primary/30 rounded-lg p-3">
            <p className="text-primary font-semibold">✓ SUBMITTED</p>
            {submitResult.rank && (
              <p className="text-text-secondary text-sm">
                Rank #{submitResult.rank} of {submitResult.globalRank}
              </p>
            )}
          </div>
        )}

        {submitState === 'error' && (
          <div className="text-center bg-error/10 border border-error/30 rounded-lg p-3">
            <p className="text-error font-semibold mb-2">SUBMISSION FAILED</p>
            <Button onClick={handleSubmit} size="sm" variant="secondary">
              RETRY
            </Button>
          </div>
        )}

        <Button onClick={onRestart} variant="secondary" size="lg" className="w-full">
          PLAY AGAIN
        </Button>

        <Button onClick={onLeaderboard} variant="ghost" size="lg" className="w-full">
          LEADERBOARD
        </Button>
      </div>
    </div>
  );
}
