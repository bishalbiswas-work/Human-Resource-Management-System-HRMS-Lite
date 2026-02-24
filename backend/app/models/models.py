from sqlalchemy import Column, String, Date, ForeignKey, Integer
from sqlalchemy.orm import relationship
from app.db.database import Base

# employee table
class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    department = Column(String, nullable=False)

    # relation to attendance
    attendance = relationship("Attendance", back_populates="employee", cascade="all, delete-orphan")

# attendance table
class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, ForeignKey("employees.employee_id"), nullable=False)
    date = Column(Date, nullable=False)
    status = Column(String, nullable=False)

    # back relation
    employee = relationship("Employee", back_populates="attendance")
