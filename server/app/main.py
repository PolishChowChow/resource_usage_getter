from fastapi import FastAPI
from app.api.routes.routes_metrics import metrics_router
from app.core.metrics import update_metrics_periodically
from asyncio import create_task
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://frontend:80",
    "http://frontend:8080",
    "http://localhost:5173",
    "http://localhost:8080",
    "http://localhost:80",
    "http://127.0.0.1:5173"
]
app = FastAPI(title="System Resource Usage API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(metrics_router, prefix="/api/v1")

@app.on_event("startup")
async def startup_event():
    create_task(update_metrics_periodically())

@app.get("/health")
async def health():
    return {"status": "ok"}
