# Breakout Arcade

A modern web recreation of the classic brick-breaking arcade game built with Bun monorepo (Next.js + FastAPI).

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: FastAPI (Python async)
- **Database**: MongoDB (10.60.184.61:27017)
- **Monorepo**: Bun workspaces

## Project Structure

```
breakout-arcade/
├── apps/
│   ├── web/          # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/           # Next.js App Router pages
│   │   │   │   ├── page.tsx   # Landing page
│   │   │   │   ├── game/      # Game page
│   │   │   │   ├── leaderboard/
│   │   │   │   └── api/scores/
│   │   │   ├── components/    # React components
│   │   │   ├── game/          # Pure game engine (no React)
│   │   │   └── lib/           # Utilities
│   │   └── package.json
│   └── api/           # FastAPI backend
│       ├── main.py
│       ├── routers/
│       ├── models.py
│       ├── db.py
│       └── requirements.txt
├── package.json       # Workspace root
└── README.md
```

## Local Development

### Prerequisites

- Bun installed
- Python 3.9+ for FastAPI

### Setup

1. Install dependencies:
```bash
bun install
```

2. Start the FastAPI backend:
```bash
cd apps/api
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

3. Start the Next.js frontend (separate terminal):
```bash
cd apps/web
bun install
bun dev
```

4. Open http://localhost:3000

### Environment Variables

**apps/web/.env.local**:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**apps/api/.env**:
```
MONGODB_URL=mongodb://10.60.184.61:27017/breakout_arcade
DATABASE_NAME=breakout_arcade
```

## Features

- Smooth 60fps canvas-based gameplay
- Keyboard, mouse, and touch controls
- 10 levels with increasing difficulty
- Score submission to global leaderboard
- High score persistence (localStorage)
- Responsive design (mobile-friendly)

## Game Controls

- **Arrow keys** or **Mouse**: Move paddle
- **Space**: Launch ball / Pause game
- **Escape**: Pause game

## API Endpoints

- `POST /api/scores` - Submit a score
- `GET /api/scores` - Get leaderboard
- `GET /api/scores/player/{id}` - Get player's best
- `GET /api/health` - Health check

## Deployment

Deployed to Vercel with:
- Frontend: Next.js on Vercel
- Backend: FastAPI on Vercel Python functions
- Database: MongoDB Atlas (10.60.184.61:27017)
