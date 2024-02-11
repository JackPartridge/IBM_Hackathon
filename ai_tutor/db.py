import asyncio
from typing import Any

import motor.motor_asyncio
import dotenv

from assistant_modes import Mode

async def insert_document(db: Any, document: dict):
    result = await db.get_collection("user_agents").insert_one(document)
    print(result)

async def retrieve_assistant_document(db: Any, user_id: str, mode: Mode) -> Any:
    try:
        result = await db.get_collection("user_agents").find_one(
            {"user_id": user_id, "mode": mode}
        )
        if result:
            return True
    except Exception as e:
        return None

db_url = dotenv.get_key(".env", "BUDDY_MONGO_DB")

db_client = motor.motor_asyncio.AsyncIOMotorClient(db_url)

db = db_client["Cluster0"]



################
# Not part of the main program
################
async def main():
    result = await db.get_collection("user_agents").find_one({
        "user_id": "1234"
    })

    print(result)

    result_two = await retrieve_assistant_document(db=db, user_id="1234", mode=Mode.STUDY)

    print(f"Result Two: {result_two}")

    print(type(db))
if __name__ == "__main__":
    asyncio.run(main())