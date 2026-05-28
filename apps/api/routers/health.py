from fastapi import APIRouter
from datetime import datetime

from db import db
from models import HealthResponse

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health_check():
    db_status = "connected"
    status = "ok"

    try:
        if db.client:
            await db.client.admin.command('ping')
            db_status = "connected"
        else:
            db_status = "disconnected"
            status = "error"
    except Exception:
        db_status = "disconnected"
        status = "error"

    return HealthResponse(
        status=status,
        database=db_status,
        timestamp=datetime.utcnow(),
    )
