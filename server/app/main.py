from fastapi import FastAPI
from app.api.routes.routes_metrics import metrics_router
from app.core.metrics import update_metrics_periodically
from asyncio import create_task

app = FastAPI(title="System Resource Usage API")

app.include_router(metrics_router, prefix="/api/v1")

@app.on_event("startup")
async def startup_event():
    create_task(update_metrics_periodically())

@app.get("/health")
async def health():
    return {"status": "ok"}
