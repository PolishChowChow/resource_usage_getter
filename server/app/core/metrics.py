import psutil, asyncio, time
from app.core.config import settings

def collect_system_metrics():

    cpu_usage = psutil.cpu_percent(interval=None)
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage(settings.DISK_PATH)
    network = psutil.net_io_counters()
    metrics = {
        "cpu_usage_percent": cpu_usage,
        "memory_total_mb": memory.total / (1024 * 1024),
        "memory_used_mb": memory.used / (1024 * 1024),
        "memory_free_mb": memory.free / (1024 * 1024),
        "disk_total_gb": disk.total / (1024 * 1024 * 1024),
        "disk_used_gb": disk.used / (1024 * 1024 * 1024),
        "disk_free_gb": disk.free / (1024 * 1024 * 1024),
        "network_bytes_sent_mb": network.bytes_sent / (1024 * 1024),
        "network_bytes_recv_mb": network.bytes_recv / (1024 * 1024),
    }
    return metrics
metrics_cache = collect_system_metrics()

async def update_metrics_periodically():
    print("Starting periodic metrics update task...")
    while True:
        metrics_cache.update(collect_system_metrics())
        await asyncio.sleep(settings.UPDATE_INTERVAL)