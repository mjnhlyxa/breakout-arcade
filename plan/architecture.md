# Breakout Arcade — Container Architecture

> **C4 Level**: 2 — Container/Application Architecture

## 1. Application Structure

### 1.1 High-Level Container Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                       BROWSER CLIENT                           │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              Next.js Application (apps/web)              │ │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────────────┐   │ │
│  │  │  Landing   │ │  Game      │ │  Leaderboard       │   │ │
│  │  │  Page      │ │  Canvas    │ │  Display            │   │ │
│  │  └────────────┘ └────────────┘ └────────────────────┘   │ │
│  │                                                          │ │
│  │  ┌────────────────────────────────────────────────┐     │ │
│  │  │           Game Engine (Pure TypeScript)        │     │ │
│  │  │  - physics.ts: ball/paddle collision          │     │ │
│  │  │  - game.ts: game loop & state machine         │     │ │
│  │  │  - levels.ts: brick formations                │     │ │
│  │  │  - renderer.ts: canvas drawing                │     │ │
│  │  └────────────────────────────────────────────────┘     │ │
│  │                                                          │ │
│  │  ┌────────────────────────────────────────────────┐     │ │
│  │  │           Player Identity Manager              │     │ │
│  │  │  - UUID generation (v4)                        │     │ │
│  │  │  - localStorage persistence                    │     │ │
│  │  └────────────────────────────────────────────────┘     │ │
│  └──────────────────────────────────────────────────────────┘ │
│                              │                                  │
│                              │ HTTP/REST (fetch)               │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              FastAPI Backend (apps/api)                   │ │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────────────┐   │ │
│  │  │ /scores    │ │ /scores    │ │ /health            │   │ │
│  │  │ POST       │ │ GET        │ │ GET                │   │ │
│  │  └────────────┘ └────────────┘ └────────────────────┘   │ │
│  └──────────────────────────────────────────────────────────┘ │
│                              │                                  │
│                              │ MongoDB Protocol (Motor)        │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │               MongoDB Atlas (10.60.184.61:27017)          │ │
│  │  ┌──────────────────────────────────────────────────┐   │ │
│  │  │  scores collection                                │   │ │
│  │  │  { playerId, score, level, timestamp }            │   │ │
│  │  └──────────────────────────────────────────────────┘   │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

## 2. Frontend Architecture (apps/web)

### 2.1 Pages/Routes
| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Landing page with play button and how-to |
| `/game` | Client | Main game canvas with full game UI |
| `/api/scores` | API Route | Proxy to FastAPI backend |

### 2.2 Component Hierarchy

```
apps/web/src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx               # Landing page
│   ├── game/
│   │   └── page.tsx          # Game page (client component)
│   ├── globals.css
│   └── api/scores/
│       └── route.ts           # Proxy to FastAPI
├── components/
│   ├── ui/                    # Generic UI primitives
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Card.tsx
│   │   └── ScoreDisplay.tsx
│   └── game/                  # Game-specific components
│       ├── GameCanvas.tsx     # Main canvas component
│       ├── GameUI.tsx         # Score, lives, level overlay
│       ├── StartScreen.tsx   # Pre-game start screen
│       └── GameOverScreen.tsx # Post-game score submission
├── game/                      # Pure game engine (no React)
│   ├── types.ts              # Game types & interfaces
│   ├── constants.ts          # Game constants
│   ├── physics.ts            # Ball physics & collision
│   ├── levels.ts             # Brick level definitions
│   ├── game.ts               # Game state machine
│   ├── renderer.ts           # Canvas rendering
│   └── index.ts              # Main entry point
├── lib/
│   ├── player.ts             # Anonymous ID management
│   └── api.ts                # API client helpers
└── types/
    └── index.ts              # Shared types
```

### 2.3 Game Engine Architecture

The game engine is completely decoupled from React:

```
game/
├── types.ts       # Ball, Paddle, Brick, GameState interfaces
├── constants.ts   # CANVAS_WIDTH, CANVAS_HEIGHT, BALL_SPEED, etc.
├── physics.ts     # Ball movement, collision detection & response
├── levels.ts      # Level definitions (brick grid layouts)
├── game.ts        # GameState, game loop, scoring, lives
└── renderer.ts   # Canvas drawing functions
```

### 2.4 State Management Approach
- **Game State**: Pure TypeScript state machine in game.ts (no React)
- **React State**: useState for UI overlays (score, lives, game status)
- **Player Identity**: localStorage with UUID v4
- **API State**: Simple fetch with loading/error states

## 3. Backend Architecture (apps/api)

### 3.1 API Design

#### Score Submission
```
POST /api/scores
  Request: { playerId: string, score: number, level: number }
  Response: { success: boolean, rank?: number, globalRank?: number }
  Errors: 400 (invalid data), 500 (db error)
```

#### Leaderboard Retrieval
```
GET /api/scores?limit=100
  Response: {
    scores: [{ playerId, score, level, timestamp }],
    total: number
  }
```

#### Health Check
```
GET /api/health
  Response: { status: "ok", timestamp: string }
```

### 3.2 Data Model

#### Scores Collection
```javascript
{
  _id: ObjectId,
  playerId: string,        // Anonymous UUID
  score: number,           // Final score
  level: number,           // Highest level reached
  timestamp: Date,         // When score was achieved
}
```

### 3.3 FastAPI Structure
```
apps/api/
├── main.py              # FastAPI app, CORS, routes
├── db.py                # MongoDB connection (Motor)
├── models.py            # Pydantic request/response models
├── routers/
│   ├── scores.py       # /api/scores endpoints
│   └── health.py       # /api/health endpoint
├── requirements.txt     # Python dependencies
└── package.json        # Workspace reference
```

## 4. Real-time Strategy

This game does NOT require real-time communication:
- All game logic runs locally in the browser
- Leaderboard is updated after game ends (submission is async)
- No SSE or polling needed for core gameplay
- Leaderboard page can refresh on mount (simple GET)

## 5. Deployment Architecture

```
┌──────────────────────────────────────┐
│           GitHub Repository          │
│  mjnhlyxa / ghp_WUeEJAHQrZIPxLv...  │
└────────────────┬─────────────────────┘
                 │ push
                 ▼
┌──────────────────────────────────────┐
│         Vercel (Production)          │
│  ┌────────────────────────────────┐ │
│  │  apps/web - Next.js           │ │
│  │  - / route (static)           │ │
│  │  - /game route (SSR/CSR)      │ │
│  └────────────────────────────────┘ │
│  ┌────────────────────────────────┐ │
│  │  apps/api - FastAPI           │ │
│  │  - /api/scores (POST/GET)      │ │
│  │  - /api/health                 │ │
│  └────────────────────────────────┘ │
└────────────────┬─────────────────────┘
                 │
        ┌────────┴────────┐
        ▼                ▼
┌──────────────┐  ┌──────────────┐
│   MongoDB    │  │   Vercel    │
│ 10.60.184.61 │  │   Edge      │
│  :27017      │  │   Cache     │
└──────────────┘  └──────────────┘
```

## 6. API Route Proxy (apps/web)

Since Vercel serverless functions can't make outbound connections to internal IPs easily, we proxy through the web app:

```
Browser → apps/web/api/scores → apps/api FastAPI → MongoDB
```

This is configured in `apps/web/src/app/api/scores/route.ts`.
