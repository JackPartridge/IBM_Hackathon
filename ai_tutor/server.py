import time
from typing import Annotated, Optional
import asyncio

from fastapi import FastAPI, Form, UploadFile, status, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from assistant_modes import Mode

from open_ai import assistant_client, thread_client, retrieve_assistant, create_assistant, upload_file, create_thread, file_assistant
from openai.types.beta.assistant import Assistant

from tutor.tutor import AITutor

from db import db, insert_document, retrieve_assistant_document, update_document

class Query(BaseModel):
    query: str

origins = [
    "*"
]

server = FastAPI()

server.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@server.get("/health")
def health_check():
    return "HEALTHY!!!"

@server.get("/query-check/{query}")
async def query(query: str):
    return query

@server.post("/sign-up/user/{id}")
async def user_sign_up(id):
    if await retrieve_assistant_document(db=db, user_id=id):
        return {
            status.HTTP_409_CONFLICT: "User already exists"
        }
    await insert_document(db=db, document={"user_id": id})
    return ("User added!!!")


@server.post("/create-tutor/{user_id}")
async def create_buudy(user_id: str):
    document = {
        "user_id": user_id,
    }

    print(document)

    result = await retrieve_assistant_document(db=db, user_id=user_id)
    if result.get("assistant_id"):
        if result.get("thread_id"):
            return status.HTTP_208_ALREADY_REPORTED
        else:
            thread = create_thread(thread_client=thread_client)
            new_document = {"thread_id": thread.id}
            await update_document(db=db, document=document, new_update=new_document)
            return {status.HTTP_200_OK, "Thread Created. Assistant already available for user"}

    print(f"result HERE!!!! --->> {result}")
    
    tutor = AITutor(
        name=f"{user_id} AI Tutor",
    )

    assistant = create_assistant(
        tutor=tutor
    )

    thread = create_thread(thread_client=thread_client)

    new_document = dict()

    new_document["assistant_id"] = assistant.id
    new_document["thread_id"] = thread.id

    print("New document -->", document)

    await update_document(db=db, document=document, new_update=new_document)



@server.post("/query/{user_id}")
async def query(user_id: str, query: Query):
    assistant: Assistant = None
    user_agent_document = await retrieve_assistant_document(db=db, user_id=user_id)
    if user_agent_document:
        if user_agent_document["assistant_id"]:
            assistant = retrieve_assistant(assistant_id=user_agent_document["assistant_id"])
            thread_id = user_agent_document["thread_id"]
        else:
            return f"{status.HTTP_404_NOT_FOUND}: {query.mode} buddy agent does not exist for this user"
    else:
        return f"{status.HTTP_404_NOT_FOUND}: {query.mode} agent does not exist for this user"
    
    # TODO: Cancel all runs here

    message_obj = thread_client.messages.create(thread_id=thread_id, content=query.query, role="user")
    print("Message obj: ", message_obj)

    run = thread_client.runs.create(
        thread_id=thread_id,
        assistant_id=assistant.id,
    )

    time.sleep(10)

    # while run.status != "completed":
    #     run = thread_client.runs.create(
    #         thread_id=thread_id,
    #         assistant_id=assistant.id,
    #     )
    #     time.sleep(2)

    run_value = thread_client.runs.retrieve(
        thread_id=thread_id,
        run_id=run.id
    )
    message_obj_list = []
    if run_value.status == "completed":
        message_list = thread_client.messages.list(thread_id=thread_id, order="desc")
        for message in message_list:
            if message.role == "user":
                break
            message_obj_list.append(message)

    display_messages = []
    for msg_obj in message_obj_list:
        display_messages.append(msg_obj.content[0].text.value)

    # if run.status == "completed":
    #     # get the message list
    #     message_list = thread_client.messages.list(thread_id=thread_id, order="desc")
    #     print("Message List", message_list)
    #     for index, message in enumerate(message_list):
    #         if message.role == "user": # last message sent by the user
    #             display_messages = message_list[:index]
    #             break

    display_message = "\n".join(display_messages)

    print("We got to the end")

    return {"reply": display_message}


        
@server.post("/file-upload/{user_id}")
async def file_upload(
    user_id: str,
    file: Annotated[bytes, File()],
    # fileb: Optional[Annotated[UploadFile, File()]],
):
    user = await retrieve_assistant_document(db=db, user_id=user_id)
    if user:
        if user.get("assistant_id"):
            assistant = retrieve_assistant(assistant_id=user.get("assistant_id"))
    else:
        f"{status.HTTP_404_NOT_FOUND}: User not found"

    upload_file(assistant_client=assistant_client, assistant=assistant, file=file, file_client=file_assistant)
            

    
