# Landing Page

**Route**: `/`
**Purpose**: Entry point — let users start playing immediately

## Layout (Desktop)

```
+------------------------------------------------+
| [Header: BREAKOUT ARCADE logo — centered]       |
+------------------------------------------------+
|                                                |
|                                                |
|              BREAKOUT ARCADE                    |
|              ═══════════════                    |
|                                                |
|           [ ▶ START GAME ]                     |
|                                                |
|           HIGH SCORE: 25,000                   |
|           (from localStorage)                  |
|                                                |
|        ← → or Mouse to move paddle             |
|        SPACE to launch ball                    |
|                                                |
|           [ LEADERBOARD ]                       |
|                                                |
+------------------------------------------------+
```

## Layout (Mobile, 375px)

```
+------------------------+
| BREAKOUT ARCADE        |
| (smaller title)        |
+------------------------+
|                        |
|    START GAME (full   |
|    width button)       |
|                        |
|   HIGH SCORE: 25,000   |
|                        |
|  ← → or touch swipe   |
|  to move paddle        |
|                        |
|  [ LEADERBOARD ]       |
+------------------------+
```

## Elements

| Element | Description | Behavior |
|---------|-------------|----------|
| Game Title | "BREAKOUT ARCADE" in Orbitron font, subtle glow | Static |
| START GAME button | Large primary button, centered | Click → navigates to /game |
| High Score display | Shows personal best from localStorage | Static |
| Controls hint | Brief instruction text | Static |
| LEADERBOARD button | Secondary ghost button | Click → /leaderboard |

## States

- **Default**: Normal display with high score from localStorage
- **No high score**: Shows "---" instead of number
- **Loading**: Brief skeleton while checking localStorage (unlikely to be visible)

## Key Interactions

- **Click START GAME**: Immediately navigates to /game route, game starts in idle state
- **Click LEADERBOARD**: Navigates to /leaderboard route
