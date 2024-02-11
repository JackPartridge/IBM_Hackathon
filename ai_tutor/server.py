from typing import Annotated
import asyncio

from fastapi import FastAPI, Form, status
from pydantic import BaseModel

from assistant_modes import Mode

from open_ai import assistant_client, thread_client, retrieve_assistant, create_assistant
from openai.types.beta.assistant import Assistant

from tutor.tutor import AITutor

from db import db, insert_document, retrieve_assistant_document

class Query(BaseModel):
    mode: Mode
    query: str


server = FastAPI()

@server.get("/health")
def health_check():
    return "HEALTHY!!!"

@server.get("/query/{query}")
async def query(query: str):
    return query

@server.post("/sign-up/user/{id}")
async def user_sign_up(id):
    return ("Write user id to DB")


@server.post("/create-tutor/{mode}/{user_id}")
async def create_buudy(mode: Mode, user_id: str):
    document = {
        "user_id": user_id,
        "mode": mode,
    }

    if await retrieve_assistant_document(db=db, user_id=user_id, mode=mode):
        return status.HTTP_208_ALREADY_REPORTED
    
    if mode == Mode.STUDY:
        tutor = AITutor(
            name="Study Buddy",
            instructions="You are a study guide an tutor",
            mode=Mode.STUDY
        )

    assistant = create_assistant(
        tutor=tutor
    )

    document["assistant_id"] = assistant.id

    await insert_document(db=db, document=document)



@server.get("/query/{user_id}")
async def query(user_id: str, query: Query):
    assistant: Assistant = None
    user_agent_document = await retrieve_assistant_document(db=db, user_id=user_id, mode=query.mode)
    if user_agent_document:
        if user_agent_document["assistant_id"]:
            assistant = retrieve_assistant(assistant_id=user_agent_document["assistant_id"])
        else:
            return f"{status.HTTP_404_NOT_FOUND}: {query.mode} buddy agent does not exist for this user"
    else:
        return f"{status.HTTP_404_NOT_FOUND}: {query.mode} agent does not exist for this user"
    
    assistant

    # assistant_id = assistant_json.key()[0]

    # buddy = client.beta.assistant.retrieve(assistant_id)

    # buddy.an

        
