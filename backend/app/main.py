from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.database import engine
from app.models import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {
        "message": "Welcome to HRMS Lite API (PostgreSQL)",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "ok", "app": "HRMS Lite", "db": "PostgreSQL"}
