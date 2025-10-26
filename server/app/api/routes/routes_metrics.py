from fastapi import APIRouter, WebSocket
from app.models.schemas import MetricsResponseModel
from app.core.metrics import metrics
from starlette.websockets import WebSocketDisconnect
import asyncio

metrics_router = APIRouter()

@metrics_router.get("/metrics", response_model=MetricsResponseModel)
async def get_metrics():
    if not metrics:
        from fastapi import HTTPException
        raise HTTPException(status_code=503, detail="Metrics not ready yet")
    return metrics

@metrics_router.websocket("/ws/metrics")
async def websocket_metrics(ws: WebSocket):
    await ws.accept()
    await asyncio.sleep(0.1)

    try:
        while True:
            if not metrics.actual_metrics:
                await asyncio.sleep(1)
                continue
            try:
                await ws.send_json({"actual_metrics": metrics.actual_metrics, "metrics_list": metrics.metrics_list})
            except Exception as e:
                print(f"WebSocket send failed: {e}")
                break

            await asyncio.sleep(10)

    except WebSocketDisconnect:
        print("Client disconnected.")
    except Exception as e:
        print(f"Unexpected WebSocket error: {e}")
    finally:
        await ws.close()