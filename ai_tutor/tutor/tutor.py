from typing import Optional
import pydantic
from assistant_modes import Mode


class AITutor(pydantic.BaseModel):
    name: str
    instructions: str
    model: str="gpt-3.5-turbo-0125"
    tools: Optional[list] = []
    mode: Mode