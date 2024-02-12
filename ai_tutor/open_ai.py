from typing import Any, TypeAlias

from openai import OpenAI
from openai.types.beta.assistant import Assistant
from openai.types.beta.threads import ThreadMessage
from openai.types.file_object import FileObject
import dotenv
from tutor.tutor import AITutor

key = dotenv.get_key(".env", "OPENAI")

client = OpenAI(
    api_key=dotenv.get_key("./.env", "OPENAI")
)

assistant_client = client.beta.assistants

file_assistant = client.files

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

def upload_file(assistant_client: Any, assistant: Assistant, file: Any, purpose="assistants"):
    fileObj = file.create(
        file=file,
        purpose=purpose
    )

    assistant.update(
        assistant_id=assistant.id,
        file_ids= [fileObj.id] + assistant.file_ids
    )



def build_query():
    pass

if __name__ == "__main__":

    study_buddy = AITutor(
        name="Study Buddy",
        # instructions="You are a study guide and tutor",
        instructions="""You are a tutor who is help out a student with their academic course work.
        You are to going to give suggestions on ways to imporve and focus areas to the student based on the data they submit. You will analyse their
        current grades per subject from the submitted files to give the suggestions""",
    )
    # assistant = client.beta.assistants.create(
    #     name=study_buddy.name,
    #     instructions=study_buddy.instructions,
    #     tools=study_buddy.tools,
    #     model=study_buddy.model
    # )

    # assistant = retrieve_assistant("asst_xr4rGmkNahhHAsYblaXS8iGY")

    # assistant_list = assistant_client.list()
    # print(assistant_list)

    # for assistant in assistant_list:
    #     assistant_client.delete(assistant_id=assistant.id)
    thread_id = "thread_T9qiiVZF5xhGNEsiBpOktXBJ"
    run_id = "run_a5r837a7B7A0t4vS0ZGZhIL4"
    run = thread_client.runs.retrieve(run_id=run_id, thread_id=thread_id)

    display_messages = []
    if run.status == "completed":
        # get the message list
        message_list = thread_client.messages.list(thread_id=thread_id, order="desc")
        print("Message List", message_list)
        for message in message_list:
            if message.role == "user": # last message sent by the user
                break
            display_messages.append(message)
    print("\n------------------------------")
    print(display_messages)
    # runs = thread_client.runs.list(thread_id="thread_T9qiiVZF5xhGNEsiBpOktXBJ")

    # thread = thread_client.delete(thread_id="thread_1n0t9r6w1pdgXwuJWvag2Uno")
    # thread2 = thread_client.delete(thread_id="thread_d0gURsTRkxuvDMHZKEOIoxZD")
    # thread3 = thread_client.delete(thread_id="thread_N9OIlqeFIZRD5sQN3b2WsYMg")

    # print("Thread 1: ", thread)
    # print("Thread 2: ", thread2)
    # print("Thread 3: ", thread3)


    # print(type(assistant))
    # print(assistant_list)

    print(run)
    import pdb; pdb.set_trace()

    # # Delete assistants
    # for assistant in assistant_list:
    #     assistant_client.delete(assistant_id=assistant.id)

    # print("Assistant list after deletion: ", assistant_client.list())