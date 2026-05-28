# Breakout Arcade — Deployment Plan

> **C4 Level**: 2+3 — Deployment & Infrastructure

## 1. Deployment Architecture

```
┌──────────────────────────────────────┐
│           GitHub Repository           │
│  mjnhlyxa / ghp_WUeEJAHQrZIPxLv...  │
│           (Private Repo)              │
└────────────────┬─────────────────────┘
                 │ push to main
                 ▼
┌──────────────────────────────────────┐
│         Vercel (Auto-Deploy)          │
│  ┌────────────────────────────────┐ │
│  │  apps/web - Next.js           │ │
│  │  Framework: Next.js 14+       │ │
│  │  Output Directory: .next      │ │
│  └────────────────────────────────┘ │
│  ┌────────────────────────────────┐ │
│  │  apps/api - FastAPI           │ │
│  │  Build: pip install -r reqs   │ │
│  │  Start: uvicorn main:app      │ │
│  └────────────────────────────────┘ │
└────────────────┬─────────────────────┘
                 │
        ┌────────┴────────┐
        ▼                ▼
┌──────────────┐  ┌──────────────┐
│   MongoDB    │
│ 10.60.184.61 │
│  :27017      │
└──────────────┘
```

## 2. Vercel Configuration

### 2.1 vercel.json (Root)
```json
{
  "workspaces": [
    { "gitRepository": "mjnhlyxa/breakout-arcade" }
  ]
}
```

### 2.2 apps/web/vercel.json
```json
{
  "framework": "nextjs",
  "buildCommand": "cd ../ && bun install && bun run build:web"
}
```

### 2.3 apps/api/vercel.json
```json
{
  "framework": "python",
  "buildCommand": "pip install -r requirements.txt",
  "devCommand": "uvicorn main:app --reload",
  "installCommand": "pip install -r requirements.txt"
}
```

## 3. Environment Variables

### apps/web (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### apps/api (.env)
```
MONGODB_URL=mongodb://10.60.184.61:27017/breakout_arcade
ALLOWED_ORIGINS=https://breakout-arcade.vercel.app
```

## 4. GitHub Repository Setup

```
Repository: https://github.com/mjnhlyxa/breakout-arcade
Branch: main
Auto-deploy: enabled
```

## 5. MongoDB Network Access

MongoDB Atlas requires IP whitelist:
- Add Vercel CIDR ranges to whitelist (0.0.0.0/0 for MVP)
- Or use VPC peering for production

## 6. Deployment Checklist

- [ ] Push code to GitHub main branch
- [ ] Connect repo to Vercel
- [ ] Configure build commands for both apps
- [ ] Set environment variables
- [ ] Configure MongoDB network access
- [ ] Verify /api/health endpoint
- [ ] Test full game flow in production
