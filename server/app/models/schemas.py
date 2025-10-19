from pydantic import BaseModel

class MetricsResponseModel(BaseModel):
    cpu_usage_percent: float
    memory_total_mb: float
    memory_used_mb: float
    memory_free_mb: float
    disk_total_gb: float
    disk_used_gb: float
    disk_free_gb: float
    network_bytes_sent_mb: float
    network_bytes_recv_mb: float