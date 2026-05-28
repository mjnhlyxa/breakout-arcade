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

class PlayerBestResponse(BaseModel):
    playerId: str
    bestScore: int
    bestLevel: int
    totalGames: int
    globalRank: int
    bestTimestamp: datetime

class HealthResponse(BaseModel):
    status: str
    database: str
    timestamp: datetime
