import os
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://10.60.184.61:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "breakout_arcade")

class Database:
    client: Optional[AsyncIOMotorClient] = None

db = Database()

async def connect_to_mongo():
    db.client = AsyncIOMotorClient(MONGODB_URL)
    # Test connection
    try:
        await db.client.admin.command('ping')
        print(f"Connected to MongoDB at {MONGODB_URL}")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")

async def close_mongo_connection():
    if db.client:
        db.client.close()

def get_database():
    return db.client[DATABASE_NAME]

def get_scores_collection():
    return get_database()["scores"]
