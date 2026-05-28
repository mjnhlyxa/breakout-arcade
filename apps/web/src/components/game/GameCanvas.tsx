'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { GameState } from '@/game/types';
import { drawGame } from '@/game/renderer';

interface GameCanvasProps {
  gameState: GameState;
  onPaddleMove: (x: number) => void;
  onKeyDown: (key: string) => void;
  onKeyUp: (key: string) => void;
}

export function GameCanvas({
  gameState,
  onPaddleMove,
  onKeyDown,
  onKeyUp,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysRef = useRef<Set<string>>(new Set());

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const x = (e.clientX - rect.left) * scaleX;
      onPaddleMove(x);
    },
    [onPaddleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const x = (e.touches[0].clientX - rect.left) * scaleX;
      onPaddleMove(x);
    },
    [onPaddleMove]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw game state
    drawGame(ctx, gameState);
  }, [gameState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'Space', 'Escape'].includes(e.code)) {
        e.preventDefault();
      }
      if (!keysRef.current.has(e.code)) {
        keysRef.current.add(e.code);
        onKeyDown(e.code);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.code);
      onKeyUp(e.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={600}
      className="w-full max-w-[400px] aspect-[2/3] bg-canvas-bg rounded border border-primary/30"
    />
  );
}
