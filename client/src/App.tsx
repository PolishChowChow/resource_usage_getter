import type { Metrics } from "./types/Metrics";
import useWebSocket from "./utils/useWebSocket";
import MetricsLinearChart from "./components/Metrics/chart/MetricsLinearChart";

function App() {

  
  const [data] = useWebSocket<Metrics[]>();
  return (
    <>
      <MetricsLinearChart metrics={data || []} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default App;
