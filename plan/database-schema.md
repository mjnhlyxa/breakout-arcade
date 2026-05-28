# Breakout Arcade — Database Schema Design

> **C4 Level**: 3 — Component Specification (Database)

## 1. Database Overview

### 1.1 Technology
- **Database**: MongoDB 6.x
- **Driver**: Motor 3.x (async Python driver)
- **Host**: MongoDB Atlas (10.60.184.61:27017)
- **Database Name**: `breakout_arcade`

### 1.2 Collections Summary
| Collection | Purpose | Est. Doc Size | Growth Rate |
|------------|---------|---------------|-------------|
| scores | Player scores for leaderboard | ~150B | ~500/day |

### 1.3 Connection String
```
mongodb://10.60.184.61:27017/breakout_arcade
```

## 2. Schema Definitions

### 2.1 Scores Collection

```javascript
// scores collection schema
{
  _id: ObjectId,              // Auto-generated MongoDB ID
  playerId: string,            // Anonymous UUID from localStorage
  score: number,              // Player's final score (0-9999999)
  level: number,              // Highest level reached (1-99)
  timestamp: Date,            // When score was recorded
}

// Indexes
db.scores.createIndex({ score: -1 });           // For leaderboard queries
db.scores.createIndex({ playerId: 1 });         // For player lookup
db.scores.createIndex({ timestamp: -1 });       // For recent scores
db.scores.createIndex({ score: -1, playerId: 1 }); // Compound for deduplication
```

### 2.2 Sample Documents

```javascript
// Example score entry
{
  _id: ObjectId("65f1a2b3c4d5e6f7a8b9c0d1"),
  playerId: "550e8400-e29b-41d4-a716-446655440000",
  score: 12500,
  level: 5,
  timestamp: ISODate("2026-05-29T10:30:00Z")
}

// Example leaderboard query result (top 10)
db.scores.find().sort({ score: -1 }).limit(10)

// Example player best query
db.scores.find({ playerId: "550e..." }).sort({ score: -1 }).limit(1)
```

## 3. Query Patterns & Indexes

### 3.1 Common Queries
| Query | Index Used |
|-------|-----------|
| Get top 100 scores (leaderboard) | `score: -1` |
| Get player's best score | `playerId: 1` + sort by score |
| Get player's rank | `score: -1` (with limit) |
| Get scores by date range | `timestamp: -1` |

### 3.2 Aggregation Examples

```javascript
// Get player's global rank
db.scores.countDocuments({ score: { $gt: playerScore } }) + 1

// Get top scores by level
db.scores.aggregate([
  { $sort: { score: -1 } },
  { $group: { _id: "$level", best: { $first: "$$ROOT" } } },
  { $sort: { "_id": 1 } }
])

// Get total number of players
db.scores.countDocuments({})
```

## 4. Data Retention & Cleanup

| Data Type | Retention | Policy |
|-----------|-----------|--------|
| Score entries | Forever | Keep all for historical leaderboard |
| Duplicate scores | Auto-dedupe | Keep highest per player session |

Note: We do NOT auto-delete scores. Every score is kept for the global leaderboard.

## 5. MongoDB Connection (Python/Motor)

```python
# apps/api/db.py
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional

MONGO_URL = "mongodb://10.60.184.61:27017"
DATABASE_NAME = "breakout_arcade"

class Database:
    client: Optional[AsyncIOMotorClient] = None

db = Database()

async def connect_to_mongo():
    db.client = AsyncIOMotorClient(MONGO_URL)

async def close_mongo_connection():
    if db.client:
        db.client.close()

def get_database():
    return db.client[DATABASE_NAME]

def get_scores_collection():
    return get_database()["scores"]
```

## 6. Data Validation

All scores must pass validation before insertion:

```python
# playerId: UUID v4 string
# score: integer, 0 <= score <= 9999999
# level: integer, 1 <= level <= 99
# timestamp: ISO datetime string
```

Invalid entries return HTTP 400 Bad Request with descriptive error.
