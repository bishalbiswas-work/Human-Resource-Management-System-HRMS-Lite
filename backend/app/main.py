from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.core.config import settings
from app.db.database import engine, get_db
from app.models import models
from app.routes import employee, attendance

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee.router)
app.include_router(attendance.router)

@app.get("/")
async def read_root():
    return {
        "message": "Welcome to HRMS Lite API (PostgreSQL)",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check(db: Session = Depends(get_db)):
    try:
        # Check database connection
        db.execute(text("SELECT 1"))
        return {"status": "ok", "app": "HRMS Lite", "db": "PostgreSQL (connected)"}
    except Exception as e:
        raise HTTPException(status_code=503, detail="Database connection failed")
