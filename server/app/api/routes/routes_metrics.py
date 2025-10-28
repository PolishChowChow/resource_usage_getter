from fastapi import APIRouter, WebSocket # type: ignore
from app.core.metrics import metrics
from starlette.websockets import WebSocketDisconnect # type: ignore
import asyncio

metrics_router = APIRouter()

@metrics_router.websocket("/ws/metrics")
async def websocket_metrics(ws: WebSocket):
    await ws.accept()
    await asyncio.sleep(0.1)
    try:
        while True:
            # if not metrics.actual_metrics:
            #     await asyncio.sleep(1)
            #     continue
            try:
                await ws.send_json(metrics.get_metrics())
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