from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.models import Employee
from app.schemas.employee import EmployeeSchema
from typing import List

router = APIRouter(prefix="/employees", tags=["employees"])

# hope this sql version is easy to read
# switched from mongo to sqlalchemy

@router.post("/", response_model=EmployeeSchema)
def add_employee(employee: EmployeeSchema, db: Session = Depends(get_db)):
    # check if employee id exists
    db_emp = db.query(Employee).filter(Employee.employee_id == employee.employee_id).first()
    if db_emp:
        raise HTTPException(status_code=400, detail="Employee ID already exists")
    
    # check email
    db_email = db.query(Employee).filter(Employee.email == employee.email).first()
    if db_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    # save to postgres
    new_employee = Employee(
        employee_id=employee.employee_id,
        full_name=employee.full_name,
        email=employee.email,
        department=employee.department
    )
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return employee

@router.get("/", response_model=List[EmployeeSchema])
def list_employees(db: Session = Depends(get_db)):
    # get everyone
    employees = db.query(Employee).all()
    return employees

@router.delete("/{employee_id}")
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    # find the guy
    db_emp = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if not db_emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    db.delete(db_emp)
    db.commit()
    return {"message": "Employee deleted successfully"}
