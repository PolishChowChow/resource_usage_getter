from fastapi import APIRouter
from app.models.schemas import MetricsResponseModel
from app.core.metrics import metrics_cache
metrics_router = APIRouter()

@metrics_router.get("/metrics", response_model=MetricsResponseModel)
async def get_metrics():
    if not metrics_cache:
        from fastapi import HTTPException
        raise HTTPException(status_code=503, detail="Metrics not ready yet")
    return metrics_cache