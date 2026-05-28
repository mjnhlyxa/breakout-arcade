# Breakout Arcade — API Design

> **C4 Level**: 3 — Component Specification (API)

## 1. API Overview

**Base URL (FastAPI)**: `http://localhost:8000` (local) or managed via Vercel

**Proxy URL (Next.js)**: `/api/scores`

All endpoints return JSON. No authentication required (anonymous play).

## 2. Endpoints

### 2.1 Score Endpoints

#### POST /api/scores — Submit Score

Submit a player's score after game over.

**Request:**
```json
{
  "playerId": "550e8400-e29b-41d4-a716-446655440000",
  "score": 12500,
  "level": 5
}
```

**Response (201):**
```json
{
  "success": true,
  "scoreId": "65f1a2b3c4d5e6f7a8b9c0d1",
  "rank": 42,
  "globalRank": 1287
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "INVALID_SCORE",
  "message": "Score must be between 0 and 9999999"
}
```

#### GET /api/scores — Get Leaderboard

Retrieve top scores for the leaderboard.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| limit | int | 100 | Number of scores (max 100) |
| offset | int | 0 | Pagination offset |

**Response (200):**
```json
{
  "scores": [
    {
      "playerId": "550e8400-e29b-41d4-a716-446655440000",
      "score": 99999,
      "level": 15,
      "timestamp": "2026-05-29T10:30:00Z",
      "rank": 1
    },
    {
      "playerId": "661f9301f30c52a917c0e1f2",
      "score": 85420,
      "level": 12,
      "timestamp": "2026-05-28T15:45:00Z",
      "rank": 2
    }
  ],
  "total": 5420,
  "limit": 100,
  "offset": 0
}
```

#### GET /api/scores/player/{playerId} — Get Player's Best

Get the best score for a specific player.

**Response (200):**
```json
{
  "playerId": "550e8400-e29b-41d4-a716-446655440000",
  "bestScore": 12500,
  "bestLevel": 5,
  "totalGames": 23,
  "globalRank": 1287,
  "bestTimestamp": "2026-05-29T10:30:00Z"
}
```

**Response (404):**
```json
{
  "error": "PLAYER_NOT_FOUND",
  "message": "No scores found for this player"
}
```

### 2.2 Health Endpoint

#### GET /api/health — Health Check

Check if the API is running and MongoDB is connected.

**Response (200):**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-05-29T10:30:00Z"
}
```

**Response (503):**
```json
{
  "status": "error",
  "database": "disconnected",
  "timestamp": "2026-05-29T10:30:00Z"
}
```

## 3. Error Handling

### 3.1 Error Response Format
```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human-readable description"
}
```

### 3.2 Error Codes
| HTTP Code | Error Code | Meaning |
|-----------|-----------|---------|
| 400 | INVALID_REQUEST | Malformed JSON body |
| 400 | INVALID_SCORE | Score out of valid range |
| 400 | INVALID_PLAYER_ID | Invalid UUID format |
| 400 | INVALID_LEVEL | Level out of valid range |
| 404 | PLAYER_NOT_FOUND | No scores for this player |
| 500 | DATABASE_ERROR | MongoDB connection/query failed |
| 503 | DATABASE_UNAVAILABLE | Cannot connect to MongoDB |

## 4. Request/Response Models (Pydantic)

```python
# apps/api/models.py
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ScoreSubmit(BaseModel):
    playerId: str = Field(..., pattern=r'^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')
    score: int = Field(..., ge=0, le=9999999)
    level: int = Field(..., ge=1, le=99)

class ScoreResponse(BaseModel):
    playerId: str
    score: int
    level: int
    timestamp: datetime
    rank: int

class SubmitResponse(BaseModel):
    success: bool
    scoreId: Optional[str] = None
    rank: Optional[int] = None
    globalRank: Optional[int] = None
    error: Optional[str] = None
    message: Optional[str] = None

class LeaderboardResponse(BaseModel):
    scores: list[ScoreResponse]
    total: int
    limit: int
    offset: int

class HealthResponse(BaseModel):
    status: str
    database: str
    timestamp: datetime
```

## 5. Rate Limiting

- Default Vercel limits apply (100 concurrent serverless functions)
- No custom rate limiting for MVP
- Future: limit score submissions to 1 per minute per playerId
