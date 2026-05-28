# Breakout Arcade — Security Considerations

> **C4 Level**: 3 — Security Design Components

## 1. Anonymous Player Identity

- Anonymous player IDs use **UUID v4** (cryptographically random)
- No PII (Personal Identifiable Information) is collected or stored
- Player name is optional — defaults to "Anonymous"
- No authentication or login system

## 2. Input Validation

### 2.1 Score Submission Validation
```python
# Pydantic model ensures:
# - playerId: valid UUID v4 regex
# - score: integer, 0 <= score <= 9999999
# - level: integer, 1 <= level <= 99
```

Any malformed requests return HTTP 400 with descriptive error.

### 2.2 Query Parameter Validation
- limit: integer, 1-100, default 100
- offset: integer, >= 0, default 0

## 3. Rate Limiting

- Vercel serverless functions have built-in concurrency limits
- Default: 100 concurrent function executions
- No custom rate limiting for MVP

## 4. CORS Configuration

```python
# apps/api/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for MVP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Note: For production, restrict `allow_origins` to specific domains.

## 5. Data Exposure

- Only score, level, and timestamp are returned in API responses
- Player UUIDs are pseudonymous (no link to real identity)
- No game state or match history exposed publicly

## 6. Secure Coding Practices

- No user input is ever executed as code
- All database queries use parameterized/async drivers
- No secrets stored in code (MongoDB URL is deploy config)
- HTTPS enforced by Vercel on all routes
