# Game Over Screen

**Route**: (overlay on /game)
**Purpose**: Show final score, submit to leaderboard, offer replay

## Layout (Desktop)

```
+------------------------------------------------+
|                                                |
|              G A M E   O V E R                |
|                                                |
|              ════════════════                  |
|                                                |
|              SCORE: 12,500                     |
|              LEVEL: 5                          |
|                                                |
|         ★★★ NEW HIGH SCORE! ★★★               |
|         (only if applicable)                   |
|                                                |
|         [ SUBMIT TO LEADERBOARD ]              |
|                                                |
|              [ PLAY AGAIN ]                    |
|                                                |
|              [ LEADERBOARD ]                   |
|                                                |
+------------------------------------------------+
```

## Layout (Mobile, 375px)

```
+------------------------+
|                        |
|     GAME OVER          |
|     ─────────          |
|                        |
|     SCORE: 12,500      |
|     LEVEL: 5           |
|                        |
|  ★ NEW HIGH SCORE! ★  |
|                        |
|  [ SUBMIT SCORE ]     |
|  (full width button)  |
|                        |
|  [ PLAY AGAIN ]       |
|  [ LEADERBOARD ]      |
+------------------------+
```

## Elements

| Element | Description | Behavior |
|---------|-------------|----------|
| GAME OVER title | Large Orbitron text, red glow | Static |
| Final score | Large number display | Static |
| Level reached | Number display | Static |
| NEW HIGH SCORE badge | Animated, shown only if new record | Conditional |
| SUBMIT SCORE button | Primary action | Click → POST to API |
| PLAY AGAIN button | Secondary action | Click → restart game |
| LEADERBOARD button | Tertiary action | Click → /leaderboard |

## States

- **Default**: Score displayed, buttons enabled
- **Submitting**: "SUBMITTING..." with spinner, buttons disabled
- **Submitted successfully**: Rank shown ("Rank #42 of 5,420"), submit button becomes "SUBMITTED ✓"
- **Submit error**: Error message, retry button
- **New high score**: Special badge animation plays

## Key Interactions

- **Click SUBMIT**: POSTs score to API, shows result
- **Click PLAY AGAIN**: Resets game state, starts new game
- **Click LEADERBOARD**: Navigates to /leaderboard
