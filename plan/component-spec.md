# Breakout Arcade — Component Specifications

> **C4 Level**: 3 — UI Component Specifications

## 1. UI Components Overview

### 1.1 Component Hierarchy
```
├── ui/
│   ├── Button
│   ├── Modal
│   ├── Card
│   └── ScoreDisplay
└── game/
    ├── GameCanvas
    ├── GameUI
    ├── StartScreen
    └── GameOverScreen
```

## 2. Game Components

### 2.1 GameCanvas

The main canvas component that renders and manages the game.

```typescript
interface GameCanvasProps {
  onScoreUpdate: (score: number) => void;
  onLivesUpdate: (lives: number) => void;
  onLevelUpdate: (level: number) => void;
  onGameOver: (finalScore: number, level: number) => void;
}
```

**Behavior:**
- Initializes game engine on mount
- Handles keyboard input (left/right arrows, space to start)
- Handles touch/mouse input for paddle movement
- Renders at 60fps using requestAnimationFrame
- Cleans up on unmount

### 2.2 GameUI

Overlay showing score, lives, and level during gameplay.

```typescript
interface GameUIProps {
  score: number;
  lives: number;
  level: number;
  isPaused: boolean;
}
```

**Layout:**
```
┌─────────────────────────────────────────┐
│  LEVEL 3          SCORE: 12,500    ♥♥♥  │
└─────────────────────────────────────────┘
```

### 2.3 StartScreen

Initial screen shown before game starts.

```typescript
interface StartScreenProps {
  highScore: number | null;
  onStart: () => void;
}
```

**Layout:**
```
┌─────────────────────────────────────────┐
│                                         │
│           BREAKOUT ARCADE               │
│                                         │
│      [▶ START GAME]                    │
│                                         │
│      HIGH SCORE: 25,000                 │
│                                         │
│      ← → or Mouse to move paddle        │
│      SPACE to launch ball               │
└─────────────────────────────────────────┘
```

### 2.4 GameOverScreen

Shown when all lives are lost.

```typescript
interface GameOverScreenProps {
  score: number;
  level: number;
  isNewHighScore: boolean;
  isSubmitting: boolean;
  onSubmit: (playerId: string, score: number, level: number) => Promise<void>;
  onRestart: () => void;
  onLeaderboard: () => void;
}
```

**Layout:**
```
┌─────────────────────────────────────────┐
│                                         │
│            GAME OVER                    │
│                                         │
│         SCORE: 12,500                   │
│         LEVEL: 5                        │
│                                         │
│      [★ NEW HIGH SCORE! ★]             │
│                                         │
│      [SUBMIT SCORE]                    │
│      [PLAY AGAIN]                       │
│      [LEADERBOARD]                      │
└─────────────────────────────────────────┘
```

## 3. UI Primitives

### 3.1 Button

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

### 3.2 Modal

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}
```

### 3.3 Card

```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}
```

### 3.4 ScoreDisplay

```typescript
interface ScoreDisplayProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;  // count-up animation
}
```

## 4. Game Canvas Rendering

### 4.1 Canvas Layout (Mobile-first)

Default canvas size: 400x600 (portrait orientation)
Scales to fit container while maintaining aspect ratio.

```
┌─────────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  ← Brick rows (top 40%)
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│                                         │
│                                         │  ← Play area (middle 40%)
│                   ●                     │  ← Ball
│                                         │
│                                         │
│             ════════════               │  ← Paddle (bottom 20%)
└─────────────────────────────────────────┘
```

### 4.2 Color Palette for Bricks

| Level | Brick Colors | Hits Required |
|-------|-------------|---------------|
| 1-2 | Red (#EF4444), Orange (#F97316) | 1 |
| 3-4 | Yellow (#EAB308), Green (#22C55E) | 1-2 |
| 5-6 | Blue (#3B82F6), Purple (#A855F7) | 2 |
| 7-8 | Pink (#EC4899), Cyan (#06B6D4) | 2-3 |
| 9+ | Gold (#FFD700), special patterns | 3 |

## 5. Responsive Breakpoints

| Breakpoint | Canvas Size | Paddle Width | Brick Grid |
|------------|-------------|--------------|------------|
| < 480px | 320x480 | 60px | 8 cols |
| 480-768px | 400x600 | 80px | 10 cols |
| > 768px | 500x700 | 100px | 10 cols |
