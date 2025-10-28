export interface Metrics {
  cpu_usage_percent: number;
  disk_free_gb: number;
  disk_total_gb: number;
  disk_used_gb: number;
  memory_free_mb: number;
  memory_total_mb: number;
  memory_used_mb: number;
  network_bytes_recv_mb: number;
  network_bytes_sent_mb: number;
}
