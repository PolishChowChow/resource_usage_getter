import { useEffect, useState } from "react";

export default function useWebSocket<DataType>() {
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/api/v1/ws/metrics");
    ws.onmessage = (event) => {
      setIsConnected(true);
      const data = JSON.parse(event.data);
      if (!data) {
        setError("Received empty data");
        return;
      }
      setData(data);
    };
    ws.onerror = () => {
      setError("WebSocket error occurred");
    };
    ws.onclose = () => {
      setIsConnected(false);
    };

    return () => ws.close();
  }, []);
  return { data, error, isConnected } as const;
}
