'use client';

import React from 'react';

interface GameHUDProps {
  score: number;
  lives: number;
  level: number;
  maxLives?: number;
}

export function GameHUD({ score, lives, level, maxLives = 3 }: GameHUDProps) {
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-black/40 border-b border-primary/20">
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] text-text-secondary uppercase tracking-wider">Level</span>
        <span className="font-mono text-xl font-semibold text-text-primary">{level}</span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] text-text-secondary uppercase tracking-wider">Score</span>
        <span className="font-mono text-xl font-semibold text-primary">{score.toLocaleString()}</span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] text-text-secondary uppercase tracking-wider">Lives</span>
        <div className="flex gap-1">
          {Array.from({ length: maxLives }).map((_, i) => (
            <Heart key={i} filled={i < lives} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      className={filled ? 'text-error' : 'text-error/30'}
    >
      <path
        fill="currentColor"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  );
}
