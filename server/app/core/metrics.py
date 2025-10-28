import asyncio
import psutil # type: ignore
from app.core.config import settings

class MetricsItem:
    def __init__(self, name: str, max_consumption: float):
        self._name = name
        self._max_consumption = max_consumption
        self._current_consumption_list = [0.0] * 10

    def update_metrics(self, new_value: float):
        if len(self._current_consumption_list) >=10:
            self._current_consumption_list.pop(0)
        self._current_consumption_list.append(new_value)

    def metrics_object_notation(self):
        return {
            "name": self._name,
            "max_consumption": self._max_consumption,
            "current_consumption": self._current_consumption_list
        }

class Metrics:
    def __init__(self):
        cpu_usage = psutil.cpu_freq(percpu=False)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage(settings.DISK_PATH)
        self._cpu = MetricsItem(
            name="CPU",
            max_consumption=cpu_usage.max
        )
        self._ram = MetricsItem(
            name="RAM",
            max_consumption=memory.total / (1024 * 1024)
        )
        self._disk = MetricsItem(
            name="Storage",
            max_consumption=disk.total / (1024 * 1024 * 1024)
        )
        self._newtwork_recieved = MetricsItem(
            name="Network Received",
            max_consumption=1e12
        )
        self._newtork_sent = MetricsItem(
            name="Network Sent",
            max_consumption=1e12
        )

    def get_metrics(self):
        return {
            "cpu_usage_percent": self._cpu.metrics_object_notation(),
            "ram_usage_percent": self._ram.metrics_object_notation(),
            "disk_usage_percent": self._disk.metrics_object_notation(),
            "network_sent": self._newtork_sent.metrics_object_notation(),
            "network_received": self._newtwork_recieved.metrics_object_notation(),
        }
    
    def collect_system_metrics(self):
        cpu_usage = psutil.cpu_freq(percpu=False)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage(settings.DISK_PATH)
        network = psutil.net_io_counters()

        self._cpu.update_metrics(cpu_usage.current)
        self._ram.update_metrics(memory.used / settings.METRICS_SCALE)
        self._disk.update_metrics(disk.used / settings.METRICS_SCALE)
        self._newtork_sent.update_metrics(network.bytes_sent / settings.METRICS_SCALE)
        self._newtwork_recieved.update_metrics(network.bytes_recv / settings.METRICS_SCALE)
        return self.get_metrics()
    

metrics = Metrics()

async def update_metrics_periodically():
    while True:
        metrics.collect_system_metrics()
        await asyncio.sleep(settings.UPDATE_INTERVAL)
