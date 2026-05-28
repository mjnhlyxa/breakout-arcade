# Game Screen

**Route**: `/game`
**Purpose**: The main gameplay experience

## Layout (Desktop)

```
+------------------------------------------------+
|  LEVEL 1        SCORE: 0          ♥ ♥ ♥       |
|  [top HUD bar — lives, score, level]           |
+------------------------------------------------+
|                                                |
|  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  |
|  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  |
|  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  |
|                                                |
|                    (ball)                      |
|                                                |
|                                                |
|              ═══════════                       |
|                  (paddle)                      |
+------------------------------------------------+
|  [PAUSE]                        [QUIT]         |
+------------------------------------------------+
```

## Layout (Mobile, 375px)

```
+------------------------+
| LVL 1  SCORE: 0  ♥♥♥  |
+------------------------+
| ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  |
| ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  |
| ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  |
|                        |
|         ●              |
|                        |
|                        |
|      ════════          |
+------------------------+
| [PAUSE]    [QUIT]     |
+------------------------+
```

## Elements

| Element | Description | Behavior |
|---------|-------------|----------|
| HUD bar | Top strip showing level, score, lives | Updates in real-time during play |
| Canvas | 400x600 game area, centered | Renders paddle, ball, bricks |
| Paddle | Cyan rectangle at bottom | Moves with mouse/touch/keyboard |
| Ball | White circle with glow | Bounces, physics handled by engine |
| Bricks | Colored rectangles in grid | Break when hit, drop power-ups (future) |
| PAUSE button | Bottom left | Pauses game, shows pause overlay |
| QUIT button | Bottom right | Returns to landing page |

## Game States

### Idle State
- Ball rests on paddle center
- "PRESS SPACE TO LAUNCH" text overlay
- Paddle still movable

### Playing State
- Ball in motion
- All controls active
- Score/lives/level update in real-time

### Paused State
- Semi-transparent overlay
- "PAUSED" text
- "RESUME" and "QUIT" buttons

### Life Lost State
- Brief screen flash (red tint)
- Life decreases
- Ball resets to paddle (idle state)

### Level Complete State
- Brief celebration effect
- "LEVEL X COMPLETE" text
- Auto-advance to next level

### Game Over State
- Transition to Game Over screen
- Score displayed
- Submit/high score options

## States

- **Default/Idle**: Ball on paddle, waiting for launch
- **Loading**: Canvas loading (rare, only on slow devices)
- **Playing**: Active game in progress
- **Paused**: Game frozen, overlay shown
- **Game Over**: All lives lost, transition to result

## Key Interactions

- **Arrow keys (← →)**: Move paddle left/right
- **Mouse move**: Paddle follows cursor X position
- **Touch/drag**: Paddle follows touch X position
- **SPACE**: Launch ball (when idle) / pause (when playing)
- **ESC**: Pause game
- **Click PAUSE**: Same as ESC
- **Click QUIT**: Confirm dialog → return to landing

## Responsive Behavior

- Canvas scales to fit viewport width (max 500px)
- Maintains 2:3 aspect ratio
- Touch targets minimum 44x44px for buttons
- HUD text scales appropriately
