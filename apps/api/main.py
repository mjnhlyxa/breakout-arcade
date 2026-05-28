from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from db import connect_to_mongo, close_mongo_connection
from routers import scores, health

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(
    title="Breakout Arcade API",
    description="Backend API for Breakout Arcade leaderboard",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scores.router, prefix="/api/scores", tags=["scores"])
app.include_router(health.router, prefix="/api", tags=["health"])

@app.get("/")
def root():
    return {"message": "Breakout Arcade API", "status": "ok"}
