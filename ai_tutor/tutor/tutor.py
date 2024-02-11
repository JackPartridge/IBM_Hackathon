from typing import Optional
import pydantic
from assistant_modes import Mode


class AITutor(pydantic.BaseModel):
    name: str
    instructions: str = """You are a tutor who is help out a student with their academic course work.
        You are to going to give suggestions on ways to imporve and focus areas to the student based on the data they submit. You will analyse their
        current grades per subject from the submitted files to give the suggestions"""
    model: str="gpt-3.5-turbo-0125"
    tools: Optional[list] = []