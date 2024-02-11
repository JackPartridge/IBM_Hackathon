from typing import Any

from openai import OpenAI
from openai.types.beta.assistant import Assistant
from openai.types.beta.threads import ThreadMessage
import dotenv
from assistant_modes import Mode
from tutor.tutor import AITutor

key = dotenv.get_key(".env", "OPENAI")
print(key)

client = OpenAI(
    api_key=dotenv.get_key("./.env", "OPENAI")
)

assistant_client = client.beta.assistants

thread_client = client.beta.threads

def create_assistant(tutor: AITutor) -> Assistant:

    return assistant_client.create(
        name=tutor.name,
        instructions=tutor.instructions,
        tools=tutor.tools,
        model=tutor.model
    )

def retrieve_assistant(assistant_id: str) -> Assistant:
    return assistant_client.retrieve(assistant_id=assistant_id)

def create_thread(thread_client) -> Any:
    return thread_client.create()

def build_query():
    pass

if __name__ == "__main__":

    study_buddy = AITutor(
        name="Study Buddy",
        # instructions="You are a study guide and tutor",
        instructions="""You are a tutor who is help out a student with their academic course work.
        You are to going to give suggestions on ways to imporve and focus areas to the student based on the data they submit. You will analyse their
        current grades per subject from the submitted files to give the suggestions""",
        mode=Mode.STUDY,
    )
    # assistant = client.beta.assistants.create(
    #     name=study_buddy.name,
    #     instructions=study_buddy.instructions,
    #     tools=study_buddy.tools,
    #     model=study_buddy.model
    # )

    assistant = retrieve_assistant("asst_xr4rGmkNahhHAsYblaXS8iGY")

    print(type(assistant))