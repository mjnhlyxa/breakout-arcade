'use client';

import React from 'react';

interface LevelCompleteOverlayProps {
  level: number;
  onContinue: () => void;
}

export function LevelCompleteOverlay({ level, onContinue }: LevelCompleteOverlayProps) {
  React.useEffect(() => {
    const timer = setTimeout(onContinue, 2000);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
      <h2 className="font-orbitron text-2xl font-bold text-success tracking-wider mb-2">
        LEVEL {level} COMPLETE!
      </h2>
      <p className="text-text-secondary text-sm">Get ready for the next level...</p>
    </div>
  );
}
