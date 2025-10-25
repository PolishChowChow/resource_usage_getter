import asyncio
import psutil
from app.core.config import settings

class Metrics:
    __empty_metrics =  {
        "cpu_usage_percent": 0.0,
        "cpu_current_mhz": 0.0,
        "cpu_min_mhz": 0.0,
        "cpu_max_mhz": 0.0,
        "memory_total_mb": 0.0,
        "memory_used_mb": 0.0,
        "memory_free_mb": 0.0,
        "memory_usage_percent": 0.0,
        "disk_total_gb": 0.0,
        "disk_used_gb": 0.0,
        "disk_free_gb": 0.0,
        "disk_usage_percent": 0.0,
        "network_bytes_sent_mb": 0.0,
        "network_bytes_recv_mb": 0.0,
    }
    actual_metrics = __empty_metrics.copy()
    metrics_list = []
    def __init__(self):
        for _ in (0, 9):
            self.metrics_list.append(self.__empty_metrics.copy())
    def collect_system_metrics(self):
        cpu_usage_percent = psutil.cpu_percent(interval=None)
        cpu_usage = psutil.cpu_freq(percpu=False)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage(settings.DISK_PATH)
        network = psutil.net_io_counters()
        metrics = {
            "cpu_usage_percent": cpu_usage_percent,
            "cpu_current_mhz": cpu_usage.current,
            "cpu_min_mhz": cpu_usage.min,
            "cpu_max_mhz": cpu_usage.max,
            "memory_total_mb": memory.total / (1024 * 1024),
            "memory_used_mb": memory.used / (1024 * 1024),
            "memory_free_mb": memory.free / (1024 * 1024),
            "memory_usage_percent": memory.percent,
            "disk_total_gb": disk.total / (1024 * 1024 * 1024),
            "disk_used_gb": disk.used / (1024 * 1024 * 1024),
            "disk_free_gb": disk.free / (1024 * 1024 * 1024),
            "disk_usage_percent": disk.percent,
            "network_bytes_sent_mb": network.bytes_sent / (1024 * 1024),
            "network_bytes_recv_mb": network.bytes_recv / (1024 * 1024),
        }
        self.actual_metrics.update(metrics)
        return metrics


    def enque_new_metrics(self, metrics):
        self.metrics_list.pop(0)
        self.metrics_list.append(metrics)

    def invoke_metrics_update(self):
        metrics = self.collect_system_metrics()
        self.enque_new_metrics(metrics)
        return metrics

metrics = Metrics()

async def update_metrics_periodically():
    print("Starting periodic metrics update task...")
    while True:
        metrics.invoke_metrics_update()
        print("Metrics updated.")
        print("Current metrics:", metrics.actual_metrics)
        await asyncio.sleep(settings.UPDATE_INTERVAL)
