import { useEffect, useState } from "react";
import MetricsLinearChart from "./components/chart/MetricsLinearChart";

type metricsType = {
  cpu_usage_percent: number;
  disk_free_gb: number;
  disk_total_gb: number;
  disk_used_gb: number;
  memory_free_mb: number;
  memory_total_mb: number;
  memory_used_mb: number;
  network_bytes_recv_mb: number;
  network_bytes_sent_mb: number;
};
function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/api/v1/ws/metrics");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      setData(data);
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => ws.close();
  }, []);
  return (
    <>
      {/* <MetricsLinearChart metrics={data || []} /> */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default App;
