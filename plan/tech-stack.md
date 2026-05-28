# Breakout Arcade — Technology Stack

## Core Dependencies

### Frontend (apps/web)

| Package | Version | Purpose |
|---------|---------|---------|
| next | 14+ | React framework, App Router |
| react | 18+ | UI library |
| react-dom | 18+ | DOM rendering |
| typescript | 5.x | Type safety |
| tailwindcss | 3.x | Utility-first CSS |
| @types/react | 18+ | React type definitions |
| @types/node | 20+ | Node type definitions |
| uuid | 9+ | Anonymous ID generation |

### Backend (apps/api)

| Package | Version | Purpose |
|---------|---------|---------|
| fastapi | 0.100+ | Python web framework |
| uvicorn | 0.23+ | ASGI server |
| motor | 3.3+ | Async MongoDB driver |
| pydantic | 2+ | Data validation |
| python-dotenv | 1.0+ | Environment variables |

### Dev Dependencies

| Package | Purpose |
|---------|---------|
| eslint | Linting (Next.js default) |
| typescript | Type checking |
| tailwindcss | Styling |

## Technology Justifications

### Why Next.js?
- Serverless deployment to Vercel
- Good React ecosystem
- API routes for proxy

### Why FastAPI?
- Async Python framework
- Easy MongoDB integration (Motor)
- Auto-generated OpenAPI docs
- Type hints with Pydantic

### Why Bun?
- Fast package installation
- Workspaces/monorepo support
- Native TypeScript execution

### Why MongoDB?
- Flexible schema for game data
- Easy leaderboard queries (sorted by score)
- Already provided at 10.60.184.61:27017

### Why Canvas 2D?
- 60fps game rendering
- No heavy framework dependencies
- Works on all modern browsers
- Mobile canvas support

## Project Scripts

```json
// Root package.json
{
  "scripts": {
    "dev": "bun --cwd apps/web dev",
    "dev:api": "bun --cwd apps/api uvicorn main:app --reload",
    "build": "bun run build:web && bun run build:api",
    "build:web": "cd apps/web && bun --bun next build",
    "build:api": "cd apps/api && pip install -r requirements.txt",
    "test": "bun test",
    "lint": "cd apps/web && next lint"
  },
  "workspaces": [
    "apps/web",
    "apps/api"
  ]
}
```
