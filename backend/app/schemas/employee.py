from pydantic import BaseModel, EmailStr, Field
from typing import Optional

# pydantic models for our employee data
# hope this covers everything the user wants

class EmployeeSchema(BaseModel):
    employee_id: str = Field(..., description="Unique employee ID")
    full_name: str = Field(..., min_length=1)
    email: EmailStr
    department: str = Field(..., min_length=1)

    class Config:
        # this helps with mongo's _id if we ever need it
        # but for now we'll stick to a simple dict
        json_schema_extra = {
            "example": {
                "employee_id": "EMP01",
                "full_name": "John Doe",
                "email": "john@example.com",
                "department": "IT"
            }
        }

class EmployeeUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    department: Optional[str] = None
