'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameCanvas } from '@/components/game/GameCanvas';
import { GameHUD } from '@/components/game/GameHUD';
import { StartScreen } from '@/components/game/StartScreen';
import { GameOverScreen } from '@/components/game/GameOverScreen';
import { PauseOverlay } from '@/components/game/PauseOverlay';
import { LevelCompleteOverlay } from '@/components/game/LevelCompleteOverlay';
import {
  createInitialState,
  updateGame,
  movePaddle,
  setPaddlePosition,
  startGame,
  pauseGame,
  resumeGame,
  resetBall,
  nextLevel,
  restartGame,
} from '@/game';
import { getHighScore, setHighScore, getPlayerId } from '@/lib/player';
import { submitScore } from '@/lib/api';
import type { GameState } from '@/game/types';

export default function GamePage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>(() => createInitialState());
  const [highScore, setHighScoreState] = useState<number | null>(null);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const animationRef = useRef<number>();
  const keysRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    setHighScoreState(getHighScore());
  }, []);

  const gameLoop = useCallback(
    (timestamp: number) => {
      setGameState((prev) => {
        if (prev.status !== 'playing') return prev;

        const deltaTime = timestamp - prev.lastTime;
        const newState = updateGame(prev, deltaTime);

        // Check for level complete
        if (prev.status === 'playing' && newState.status === 'level_complete') {
          setTimeout(() => {
            setGameState((s) => nextLevel(s));
          }, 0);
          return { ...newState, status: 'level_complete' };
        }

        // Check for life lost
        if (prev.status === 'playing' && newState.status === 'life_lost') {
          setTimeout(() => {
            setGameState((s) => resetBall(s));
          }, 500);
          return newState;
        }

        // Check for game over
        if (newState.status === 'game_over') {
          const finalScore = newState.score;
          const currentHigh = getHighScore();
          if (!currentHigh || finalScore > currentHigh) {
            setHighScore(finalScore);
            setHighScoreState(finalScore);
            setIsNewHighScore(true);
          }
        }

        return { ...newState, lastTime: timestamp };
      });

      animationRef.current = requestAnimationFrame(gameLoop);
    },
    []
  );

  useEffect(() => {
    if (gameStarted && gameState.status === 'playing') {
      animationRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameStarted, gameState.status, gameLoop]);

  const handleKeyDown = useCallback((key: string) => {
    keysRef.current.add(key);

    if (key === 'Space' && gameState.status === 'idle') {
      setGameState((s) => startGame(s));
      setGameStarted(true);
    }

    if ((key === 'Escape' || key === 'Space') && gameState.status === 'playing') {
      setGameState((s) => pauseGame(s));
    } else if ((key === 'Escape' || key === 'Space') && gameState.status === 'paused') {
      setGameState((s) => resumeGame(s));
    }
  }, [gameState.status]);

  const handleKeyUp = useCallback((key: string) => {
    keysRef.current.delete(key);
  }, []);

  // Handle continuous key movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (keysRef.current.has('ArrowLeft')) {
        setGameState((s) => movePaddle(s, 'left'));
      }
      if (keysRef.current.has('ArrowRight')) {
        setGameState((s) => movePaddle(s, 'right'));
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const handlePaddleMove = useCallback((x: number) => {
    setGameState((s) => setPaddlePosition(s, x));
  }, []);

  const handleStart = () => {
    setGameState(createInitialState());
    setGameStarted(false);
    setIsNewHighScore(false);
  };

  const handleSubmitScore = async () => {
    const playerId = getPlayerId();
    return submitScore({
      playerId,
      score: gameState.score,
      level: gameState.level,
    });
  };

  const handleRestart = () => {
    setGameState(restartGame());
    setGameStarted(false);
    setIsNewHighScore(false);
  };

  const handleLeaderboard = () => {
    router.push('/leaderboard');
  };

  const handleLevelContinue = () => {
    setGameState((s) => nextLevel(s));
  };

  // Show start screen if game hasn't started
  if (!gameStarted && gameState.status === 'idle') {
    return (
      <main className="min-h-screen flex flex-col">
        <StartScreen highScore={highScore} onStart={handleStart} />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[400px] bg-surface rounded-xl overflow-hidden border border-white/5 shadow-glow">
        <GameHUD
          score={gameState.score}
          lives={gameState.lives}
          level={gameState.level}
        />

        <div className="relative">
          <GameCanvas
            gameState={gameState}
            onPaddleMove={handlePaddleMove}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
          />

          {gameState.status === 'paused' && (
            <PauseOverlay
              onResume={() => setGameState((s) => resumeGame(s))}
              onQuit={() => router.push('/')}
            />
          )}

          {gameState.status === 'level_complete' && (
            <LevelCompleteOverlay
              level={gameState.level}
              onContinue={handleLevelContinue}
            />
          )}
        </div>

        <div className="flex justify-between px-4 py-3 border-t border-white/5">
          <button
            onClick={() => {
              if (gameState.status === 'playing') {
                setGameState((s) => pauseGame(s));
              } else if (gameState.status === 'paused') {
                setGameState((s) => resumeGame(s));
              }
            }}
            className="text-text-secondary hover:text-primary text-sm transition-colors"
          >
            {gameState.status === 'playing' ? '⏸ PAUSE' : gameState.status === 'paused' ? '▶ RESUME' : ''}
          </button>
          <button
            onClick={() => router.push('/')}
            className="text-text-secondary hover:text-error text-sm transition-colors"
          >
            ✕ QUIT
          </button>
        </div>

        {gameState.status === 'game_over' && (
          <div className="absolute inset-0 bg-bg/95">
            <GameOverScreen
              score={gameState.score}
              level={gameState.level}
              isNewHighScore={isNewHighScore}
              onSubmit={handleSubmitScore}
              onRestart={handleRestart}
              onLeaderboard={handleLeaderboard}
            />
          </div>
        )}
      </div>
    </main>
  );
}
