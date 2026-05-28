'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

interface StartScreenProps {
  highScore: number | null;
  onStart: () => void;
}

export function StartScreen({ highScore, onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8 min-h-[400px]">
      <div className="text-center">
        <h1 className="font-orbitron text-5xl font-black text-primary drop-shadow-glow tracking-wider mb-2">
          BREAKOUT
        </h1>
        <h2 className="font-orbitron text-2xl font-bold text-text-secondary tracking-[0.3em]">
          ARCADE
        </h2>
      </div>

      <Button onClick={onStart} size="lg" className="min-w-[200px]">
        ▶ START GAME
      </Button>

      <div className="text-center">
        <p className="text-text-secondary text-sm mb-2">HIGH SCORE</p>
        <p className="font-mono text-2xl font-bold text-secondary">
          {highScore !== null ? highScore.toLocaleString() : '---'}
        </p>
      </div>

      <div className="text-center text-text-secondary text-xs leading-relaxed">
        <p>← → or Mouse to move paddle</p>
        <p>SPACE to launch ball</p>
      </div>
    </div>
  );
}
