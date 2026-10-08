import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.routers import landing, auth

load_dotenv()

BASE_DIR = Path(__file__).resolve().parents[2]
FRONTEND_DIR = BASE_DIR / "frontend"

app = FastAPI(title="Hulma")
app.state.database_url = os.getenv(
    "DATABASE_URL",
    "postgresql://hulma:change_me@db:5432/hulma",
)

app.mount(
    "/static",
    StaticFiles(directory=FRONTEND_DIR / "static"),
    name="static",
)

app.include_router(landing.router)
app.include_router(auth.router)


@app.get("/health")
async def healthcheck():
    return {"status": "ok", "database": app.state.database_url}