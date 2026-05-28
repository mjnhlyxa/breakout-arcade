# Breakout Arcade — User Flow

## Screen Flow

```
[Landing Page]
       │
       │ click START GAME
       ▼
[Game — Idle] ◄──────────────────────────────────┐
       │                                              │
       │ press SPACE or click LAUNCH                   │
       ▼                                              │
[Game — Playing]                                      │
       │                                              │ press RESTART
       │ ball falls below paddle                      │
       ▼                                              │
[Game — Life Lost] ── lives > 0 ──► [Game — Idle]   │
       │                                              │
       │ lives = 0                                    │
       ▼                                              │
[Game Over Screen]                                    │
       │                                              │
       ├── click SUBMIT SCORE ──► [Score Submitted]   │
       │                          (shows rank)         │
       │                                              │
       ├── click PLAY AGAIN ───────────────────────────┘
       │
       └── click LEADERBOARD ──► [Leaderboard Page]
                                     │
                                     │ click BACK ──► [Landing Page]
```

## Screen Details

### [Landing Page]
**What user sees:**
- Game title "BREAKOUT ARCADE" with neon glow effect
- High score display (from localStorage)
- START GAME button (prominent, centered)
- Brief controls hint: "← → or Mouse to move | SPACE to launch"

**Actions available:**
- START GAME → Game Idle screen
- Leaderboard link → Leaderboard page

---

### [Game — Idle]
**What user sees:**
- Canvas with paddle at bottom center
- Ball resting on paddle
- Brick formation at top
- Score: 0, Lives: 3, Level: 1

**Actions available:**
- Press SPACE or click LAUNCH → Ball launches, Game Playing
- Click PAUSE → Game Paused (overlay)

---

### [Game — Playing]
**What user sees:**
- Ball bouncing
- Paddle following input
- Bricks disappearing when hit
- Score incrementing
- Lives counter
- Level indicator

**Actions available:**
- ← → Arrow keys or Mouse move → Paddle moves
- Escape or click PAUSE → Game Paused
- Ball falls below → Life Lost

---

### [Game — Life Lost]
**What user sees:**
- Brief flash effect
- Life counter decreases
- Ball resets to paddle

**Transitions automatically:**
- If lives > 0 → Game Idle (ball on paddle)
- If lives = 0 → Game Over

---

### [Game Over Screen]
**What user sees:**
- "GAME OVER" title
- Final score display
- Level reached
- "NEW HIGH SCORE!" badge if applicable
- SUBMIT SCORE button
- PLAY AGAIN button
- LEADERBOARD button

**Actions available:**
- SUBMIT SCORE → Score submitted, rank shown
- PLAY AGAIN → Game Idle (resets everything)
- LEADERBOARD → Leaderboard page

---

### [Leaderboard Page]
**What user sees:**
- Top 100 scores list
- Rank, score, level for each entry
- Current player's rank highlighted
- BACK button
- PLAY button

**Actions available:**
- BACK → Landing Page
- PLAY → Game Idle
