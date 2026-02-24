from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

@app.get("/")
async def read_root():
    return {
        "message": "Welcome to HRMS Lite API (PostgreSQL)",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "ok", "app": "HRMS Lite", "db": "PostgreSQL"}
