'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

interface PauseOverlayProps {
  onResume: () => void;
  onQuit: () => void;
}

export function PauseOverlay({ onResume, onQuit }: PauseOverlayProps) {
  return (
    <div className="absolute inset-0 bg-bg/90 backdrop-blur-sm flex flex-col items-center justify-center gap-6 z-10">
      <h2 className="font-orbitron text-3xl font-bold text-primary tracking-wider">
        PAUSED
      </h2>

      <div className="flex flex-col gap-3 w-full max-w-[200px]">
        <Button onClick={onResume} size="lg" className="w-full">
          RESUME
        </Button>
        <Button onClick={onQuit} variant="ghost" size="lg" className="w-full">
          QUIT
        </Button>
      </div>
    </div>
  );
}
