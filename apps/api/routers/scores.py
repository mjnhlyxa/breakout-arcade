from fastapi import APIRouter, HTTPException, Query
from datetime import datetime
from bson import ObjectId

from db import get_scores_collection
from models import (
    ScoreSubmit,
    SubmitResponse,
    LeaderboardResponse,
    ScoreResponse,
    PlayerBestResponse,
)

router = APIRouter()

@router.post("", response_model=SubmitResponse)
async def submit_score(data: ScoreSubmit):
    try:
        collection = get_scores_collection()

        doc = {
            "playerId": data.playerId,
            "score": data.score,
            "level": data.level,
            "timestamp": datetime.utcnow(),
        }

        result = await collection.insert_one(doc)

        # Get player's rank
        rank = await collection.count_documents({"score": {"$gt": data.score}}) + 1
        total = await collection.count_documents({})

        return SubmitResponse(
            success=True,
            scoreId=str(result.inserted_id),
            rank=rank,
            globalRank=total,
        )
    except Exception as e:
        return SubmitResponse(
            success=False,
            error="DATABASE_ERROR",
            message=str(e),
        )

@router.get("", response_model=LeaderboardResponse)
async def get_scores(
    limit: int = Query(default=100, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
):
    try:
        collection = get_scores_collection()

        # Get total count
        total = await collection.count_documents({})

        # Get top scores
        cursor = collection.find().sort("score", -1).skip(offset).limit(limit)
        scores = await cursor.to_list(length=limit)

        score_responses = []
        for i, doc in enumerate(scores):
            score_responses.append(
                ScoreResponse(
                    playerId=doc["playerId"],
                    score=doc["score"],
                    level=doc["level"],
                    timestamp=doc["timestamp"],
                    rank=offset + i + 1,
                )
            )

        return LeaderboardResponse(
            scores=score_responses,
            total=total,
            limit=limit,
            offset=offset,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/player/{player_id}", response_model=PlayerBestResponse)
async def get_player_best(player_id: str):
    try:
        collection = get_scores_collection()

        # Find player's best score
        cursor = collection.find({"playerId": player_id}).sort("score", -1).limit(1)
        docs = await cursor.to_list(length=1)

        if not docs:
            raise HTTPException(status_code=404, detail="Player not found")

        best = docs[0]
        rank = await collection.count_documents({"score": {"$gt": best["score"]}}) + 1
        total_games = await collection.count_documents({"playerId": player_id})

        return PlayerBestResponse(
            playerId=player_id,
            bestScore=best["score"],
            bestLevel=best["level"],
            totalGames=total_games,
            globalRank=rank,
            bestTimestamp=best["timestamp"],
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
