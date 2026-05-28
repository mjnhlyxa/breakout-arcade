# Leaderboard Page

**Route**: `/leaderboard`
**Purpose**: Show top scores globally, let players see their rank

## Layout (Desktop)

```
+------------------------------------------------+
|  [← BACK]          LEADERBOARD         [PLAY] |
+------------------------------------------------+
|                                                |
|  +--------------------------------------------+|
|  | #1    ████  Score: 99,999   Lv. 15       ||
|  | #2    ████  Score: 85,420   Lv. 12       ||
|  | #3    ████  Score: 72,100   Lv. 10       ||
|  | ...                                     ||
|  | #42   ████  Score: 12,500   Lv. 5  ←YOU ||
|  | ...                                     ||
|  +--------------------------------------------+|
|                                                |
|  YOUR BEST: 12,500  (Rank #42 of 5,420)       |
|                                                |
+------------------------------------------------+
```

## Layout (Mobile, 375px)

```
+------------------------+
| ← BACK    LEADERBOARD  |
+------------------------+
| YOUR BEST: 12,500     |
| Rank #42 of 5,420     |
+------------------------+
| #1   99,999   Lv.15  |
| #2   85,420   Lv.12  |
| #3   72,100   Lv.10  |
| ...                   |
| #42  12,500   Lv.5←YOU|
| ...                   |
+------------------------+
|      [ PLAY ]          |
+------------------------+
```

## Elements

| Element | Description | Behavior |
|---------|-------------|----------|
| BACK button | Returns to landing page | Click → / |
| PLAY button | Starts new game | Click → /game |
| Score list | Ranked list of top scores | Scrollable if > viewport |
| Your rank | Shows current player's best | Highlighted row |
| Total players | Count of all scores | Static |

## States

- **Default/Loaded**: Score list displayed
- **Loading**: Skeleton rows while fetching
- **Empty**: "No scores yet — be the first!" message
- **Error**: "Failed to load leaderboard" with retry button

## Key Interactions

- **Scroll**: View more scores beyond viewport
- **Click BACK**: Return to landing
- **Click PLAY**: Start new game
