# Breakout Arcade — Technical Plan

> **Status**: Draft | Created: 2026-05-29 | Last Updated: 2026-05-29
> **C4 Level**: 1 — Context Overview

## 1. Game Overview

### 1.1 Game Concept
A modern web recreation of the classic brick-breaking arcade game featuring smooth paddle-and-ball physics, colorful brick formations, power-ups, multiple lives, level progression, and a global leaderboard. Players aim to clear all bricks in each level without letting the ball fall.

### 1.2 Game Type
- **Genre**: Arcade / Casual
- **Platform**: Web browser (desktop primary, mobile responsive)
- **Session Length**: Quick 2–5 minute runs, each attempt is a "level run"
- **Multiplayer Model**: Single-player with global leaderboard (future: rooms with spectators)
- **Account Required**: No — anonymous play by default

### 1.3 Target Audience
- Casual gamers seeking quick, satisfying gameplay
- Fans of classic arcade games (Breakout, Arkanoid)
- Mobile users wanting pick-up-and-play experience
- Players who enjoy leaderboard competition

## 2. System Context (C4 L1)

### 2.1 User Interactions

```
┌─────────────────────────────────────────────────────────────┐
│                        USERS                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Desktop     │  │ Mobile      │  │ Future: Admin      │  │
│  │ Browser     │  │ Browser     │  │ Dashboard          │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘  │
└─────────┼─────────────────┼────────────────────┼─────────────┘
          │                 │                    │
          ▼                 ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                   BREAKOUT ARCADE                            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Frontend: Next.js App (Browser)                      │   │
│  │ - Static pages (landing, how-to-play)                │   │
│  │ - Dynamic game pages (client-side rendering)         │   │
│  │ - Game engine (Canvas 2D, no React dependency)      │   │
│  └──────────────────────────┬──────────────────────────┘   │
│                             │                                │
│  ┌──────────────────────────▼──────────────────────────┐   │
│  │ Backend: FastAPI (apps/api)                          │   │
│  │ - REST API for score submission                     │   │
│  │ - Leaderboard retrieval                              │   │
│  │ - Player identity validation                         │   │
│  └──────────────────────────┬──────────────────────────┘   │
│                             │                                │
│  ┌──────────────────────────▼──────────────────────────┐   │
│  │ Database: MongoDB Atlas (10.60.184.61:27017)         │   │
│  │ - scores collection (playerId, score, level, date) │   │
│  │ - settings collection (app config)                   │   │
│  └──────────────────────────┬──────────────────────────┘   │
│                             │                                │
│  ┌──────────────────────────▼──────────────────────────┐   │
│  │ CDN/Cache: Vercel Edge                              │   │
│  │ - Static asset caching                              │   │
│  │ - DDoS protection                                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 External System Integrations
| External System | Purpose | Integration Method |
|-----------------|---------|-------------------|
| MongoDB Atlas | Persistent score and player data | PyMongo / Motor (async) |
| Vercel | Hosting & Serverless | Auto-deploy on git push |
| GitHub | Source code & deployment triggers | Push to deploy |

### 2.3 Data Flow Overview
1. User opens URL → Vercel serves Next.js app (apps/web)
2. App loads in browser → generates anonymous playerId (UUID in localStorage)
3. User plays game locally (all game logic in browser)
4. Game ends → POST /api/scores to FastAPI backend
5. GET /api/scores retrieves leaderboard from MongoDB
6. Scores displayed with rank and personal best

### 2.4 Key Non-Functional Requirements
- **Performance**: First contentful paint < 1.5s, time to interactive < 2s
- **Scalability**: Support 100 concurrent players on leaderboard
- **Availability**: 99.5% uptime (Vercel SLA)
- **Data Persistence**: All scores persist across sessions
- **Mobile Support**: Full gameplay at 375px viewport, touch controls

## 3. Technology Stack Summary

| Layer | Technology | Version | Notes |
|-------|-----------|--------|-------|
| Frontend Framework | Next.js | 14+ | App Router, Client Components |
| Language | TypeScript | 5.x | Strict mode |
| Styling | Tailwind CSS | 3.x | Mobile-first responsive |
| Game Rendering | HTML5 Canvas 2D | — | 60fps, no framework |
| Backend Framework | FastAPI | 0.100+ | Python async |
| Database Driver | Motor | 3.x | Async MongoDB driver |
| Database | MongoDB | Latest | Database at 10.60.184.61:27017 |
| Hosting | Vercel | — | Serverless functions |
| Monorepo Tool | Bun | 1.x | Package management |
| Real-time | None needed | — | Turn-based leaderboard, not real-time |

## 4. Project Structure (Bun Monorepo)

```
games/breakout-arcade/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/           # Next.js App Router
│   │   │   │   ├── page.tsx   # Landing page
│   │   │   │   ├── game/      # Game page route
│   │   │   │   └── api/       # Web-only API routes (proxy)
│   │   │   ├── components/    # React components
│   │   │   ├── lib/          # Utilities
│   │   │   └── game/         # Game engine (pure TS)
│   │   └── package.json
│   └── api/                    # FastAPI backend
│       ├── main.py            # FastAPI app entry
│       ├── routers/           # API route handlers
│       ├── models/            # Pydantic models
│       ├── db.py              # MongoDB connection
│       └── package.json
├── package.json               # Workspace root
├── bun.lockb                  # Bun lockfile
└── README.md
```

## 5. Security Considerations
- Anonymous player IDs (UUID v4) — no PII stored
- No authentication required for core gameplay
- Input validation on all API endpoints (Pydantic)
- Rate limiting on API routes
- No sensitive data exposed in responses

## 6. Cost Projection (Free Tier)

| Service | Free Tier Limit | Projected Usage | Buffer |
|---------|-----------------|-----------------|--------|
| Vercel | 100GB bandwidth/mo | ~5GB | ✅ OK |
| MongoDB Atlas | 512MB storage | ~50MB | ✅ OK |

## 7. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|-----------|
| MongoDB connection failure | Low | High | Graceful fallback to local leaderboard |
| Ball physics edge cases | Medium | Medium | Extensive testing of bounce angles |
| Canvas performance on mobile | Medium | Medium | Target 60fps with requestAnimationFrame |
| Cross-browser canvas issues | Low | Low | Test on Chrome, Safari, Firefox |
