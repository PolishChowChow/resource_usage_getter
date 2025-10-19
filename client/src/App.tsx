import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
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
  const [count, setCount] = useState(0);
  const [data, setData] = useState<metricsType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/v1/metrics");
      const data = (await response.json()) as metricsType;

      console.log(data);
      setData(data);
      return response;
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10000); // fetch data every 10 seconds
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default App;
