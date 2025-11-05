import asyncio
import psutil # type: ignore
from app.core.config import settings

class MetricsItem:
    def __init__(self, name: str, max_consumption: float, additional_info: dict = {}):
        self._name = name
        self._max_consumption = max_consumption
        self._current_consumption_list = [0.0] * 10
        self._additional_info = additional_info

    def update_metrics(self, new_value: float):
        if len(self._current_consumption_list) >=10:
            self._current_consumption_list.pop(0)
        self._current_consumption_list.append(round(new_value,2))

    def metrics_object_notation(self):
        return {
            "name": self._name,
            "max_consumption": round(self._max_consumption,2),
            "current_consumption": self._current_consumption_list,
            "additional_info": self._additional_info
        }

class Metrics:
    def __init__(self):
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage(settings.DISK_PATH)
        cpu = psutil.cpu_freq(percpu=False)
        if cpu is not None:
            current = round(cpu.current / 1024,2)
            max = round(cpu.max / 1024,2)
            self._cpu = MetricsItem(
                name="CPU",
                max_consumption=100.0,
                additional_info={ "current_frequency": f"{current} GHz", "max_frequency": f"{max} GHz" }
            )
        else:
            self._cpu = MetricsItem(
                name="CPU",
                max_consumption=100.0,
            )

        self._ram = MetricsItem(
            name="RAM",
            max_consumption=memory.total / settings.METRICS_SCALE,
            additional_info={ "total_memory": f"{round(memory.total / settings.METRICS_SCALE,2)} GB" }
        )
        self._disk = MetricsItem(
            name="Disk Utilization",
            max_consumption=disk.total / settings.METRICS_SCALE,
            additional_info={ "total_storage": f"{round(disk.total / settings.METRICS_SCALE,2)} GB" }
        )
        self._network_received = MetricsItem(
            name="Network Received",
            max_consumption=10.0,
        )
        self._network_sent = MetricsItem(
            name="Network Sent",
            max_consumption=10.0,
        )

    def get_metrics(self):
        return [
            self._cpu.metrics_object_notation(),
            self._ram.metrics_object_notation(),
            self._disk.metrics_object_notation(),
            self._network_sent.metrics_object_notation(),
            self._network_received.metrics_object_notation()
        ]
    
    def collect_system_metrics(self):
        cpu_usage = psutil.cpu_percent(percpu=False)
        memory = psutil.virtual_memory()
        disk = psutil.disk_io_counters()
        network = psutil.net_io_counters()

        self._cpu.update_metrics(cpu_usage)
        self._ram.update_metrics(memory.used / settings.METRICS_SCALE)
        self._disk.update_metrics(disk.write_bytes / settings.METRICS_SCALE)
        self._network_sent.update_metrics(network.bytes_sent / settings.METRICS_SCALE)
        self._network_received.update_metrics(network.bytes_recv / settings.METRICS_SCALE)
        return self.get_metrics()
    

metrics = Metrics()

async def update_metrics_periodically():
    while True:
        metrics.collect_system_metrics()
        await asyncio.sleep(settings.UPDATE_INTERVAL)
