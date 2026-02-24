from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.models import Attendance, Employee
from app.schemas.attendance import AttendanceSchema
from datetime import date
from typing import List

router = APIRouter(prefix="/attendance", tags=["attendance"])

# sql version for attendance records

@router.post("/", response_model=AttendanceSchema)
def mark_attendance(attendance: AttendanceSchema, db: Session = Depends(get_db)):
    # check employee
    db_emp = db.query(Employee).filter(Employee.employee_id == attendance.employee_id).first()
    if not db_emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    # check if marked for today
    existing = db.query(Attendance).filter(
        Attendance.employee_id == attendance.employee_id,
        Attendance.date == attendance.date
    ).first()
    
    if existing:
        # update status
        existing.status = attendance.status
        db.commit()
        db.refresh(existing)
        return attendance
    
    # insert new
    new_record = Attendance(
        employee_id=attendance.employee_id,
        date=attendance.date,
        status=attendance.status
    )
    db.add(new_record)
    db.commit()
    return attendance

@router.get("/{employee_id}", response_model=List[AttendanceSchema])
def get_employee_attendance(employee_id: str, db: Session = Depends(get_db)):
    # all records for one guy
    records = db.query(Attendance).filter(Attendance.employee_id == employee_id).all()
    return records

@router.get("/", response_model=List[AttendanceSchema])
def get_all_attendance(date: date = date.today(), db: Session = Depends(get_db)):
    # everyone for one day
    records = db.query(Attendance).filter(Attendance.date == date).all()
    return records
