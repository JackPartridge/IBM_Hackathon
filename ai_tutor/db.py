import asyncio
from typing import Any

import motor.motor_asyncio
import dotenv

db_url = dotenv.get_key(".env", "BUDDY_MONGO_DB")

db_client = motor.motor_asyncio.AsyncIOMotorClient(db_url)

db = db_client["Cluster0"].get_collection("user_agents")

async def insert_document(db: Any, document: dict):
    print(db)
    # result = await db.get_collection("user_agents").insert_one(document)
    result = await db.insert_one(document)
    print(result)

async def update_document(db: Any, document: dict, new_update):
    try:
        result = await db.update_one(document, {"$set": new_update})
        print(result)
    except Exception as e:
        print(e)
        return None

async def retrieve_assistant_document(db: Any, user_id: str) -> Any:
    try:
        # result = await db.get_collection("user_agents").find_one(
        #     {"user_id": user_id}
        # )
        result = await db.find_one(
            {"user_id": user_id}
        )
        if result:
            return result
    except Exception as e:
        return None



################
# Not part of the main program
################
async def main():
    # result = await db.get_collection("user_agents").find_one({
    #     "user_id": "1234"
    # })

    await insert_document(db=db, document={
        "user_id": "1234"
    })


    # print(result)

    result_two = await retrieve_assistant_document(db=db, user_id="1234")

    print(f"Result Two: {result_two}")

    print(type(db))
if __name__ == "__main__":
    asyncio.run(main())