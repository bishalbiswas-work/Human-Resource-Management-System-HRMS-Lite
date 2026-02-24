from pydantic import BaseModel, Field
from enum import Enum
import datetime

class AttendanceStatus(str, Enum):
    PRESENT = "Present"
    ABSENT = "Absent"

# schema for marking attendance
class AttendanceSchema(BaseModel):
    employee_id: str = Field(..., description="Unique employee ID")
    date: datetime.date = Field(default_factory=datetime.date.today)
    status: AttendanceStatus

    class Config:
        json_schema_extra = {
            "example": {
                "employee_id": "EMP01",
                "date": "2024-02-24",
                "status": "Present"
            }
        }
