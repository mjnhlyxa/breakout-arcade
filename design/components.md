# Breakout Arcade — Components

## GameCanvas
**Purpose**: Main canvas that renders and manages the breakout game
**Used on**: `/game`
**Props**: None (self-contained, emits events via callbacks)
**States**: idle, playing, paused, life_lost, level_complete, game_over

---

## GameUI
**Purpose**: HUD overlay showing score, lives, level during gameplay
**Used on**: `/game`
**Props**:
- `score: number`
- `lives: number`
- `level: number`
- `isPaused: boolean`

---

## StartScreen
**Purpose**: Pre-game screen with title, high score, and start prompt
**Used on**: `/game` (overlay)
**Props**:
- `highScore: number | null`
- `onStart: () => void`

---

## GameOverScreen
**Purpose**: Post-game screen with score, submission, replay options
**Used on**: `/game` (overlay)
**Props**:
- `score: number`
- `level: number`
- `isNewHighScore: boolean`
- `onSubmit: () => Promise<void>`
- `onRestart: () => void`
- `onLeaderboard: () => void`

---

## Button
**Purpose**: Reusable button component
**Used on**: All screens
**Props**:
- `variant`: "primary" | "secondary" | "ghost" | "danger"
- `size`: "sm" | "md" | "lg"
- `disabled`: boolean
- `loading`: boolean
- `children: React.ReactNode`
- `onClick`: () => void
**States**: default, hover (glow + scale), active (pressed), disabled (opacity 50%), loading (spinner)

---

## Card
**Purpose**: Container for content sections
**Used on**: Leaderboard page
**Props**:
- `children: React.ReactNode`
- `className?: string`
- `hoverable?: boolean`
**States**: default, hover (if hoverable — subtle lift)

---

## ScoreDisplay
**Purpose**: Formatted score with optional animation
**Used on**: HUD, Game Over
**Props**:
- `score: number`
- `size`: "sm" | "md" | "lg"
- `animated`: boolean (count-up effect)
**States**: default, animating (counting up)

---

## Badge
**Purpose**: Small status indicator
**Used on**: HUD (lives), leaderboard (ranks)
**Props**:
- `variant`: "success" | "warning" | "error" | "info"
- `children: React.ReactNode`
**States**: default only

---

## Modal
**Purpose**: Overlay dialog for confirmations, pause menu
**Used on**: Pause menu, quit confirmation
**Props**:
- `isOpen: boolean`
- `onClose: () => void`
- `title?: string`
- `children: React.ReactNode`
**States**: open (visible + backdrop), closed (hidden)

---

## LeaderboardList
**Purpose**: Scrollable list of scored entries
**Used on**: `/leaderboard`
**Props**:
- `scores: Score[]`
- `currentPlayerId?: string`
- `currentPlayerBest?: number`
**States**: default, loading (skeleton rows), empty ("No scores yet"), error

---

## PauseOverlay
**Purpose**: Semi-transparent overlay when game is paused
**Used on**: `/game`
**Props**:
- `onResume: () => void`
- `onQuit: () => void`
**States**: visible only

---

## LifeIndicator
**Purpose**: Visual display of remaining lives (heart icons)
**Used on**: HUD
**Props**:
- `lives: number`
- `maxLives: number` (default 3)
**States**: full (all hearts), partial (some hearts empty), critical (1 life — pulsing red)
