import type { Metrics } from "../../types/Metrics";
import useWebSocket from "../../utils/useWebSocket";
import { useEffect, useState } from "react";
import MetricsList from "../Metrics/MetricsMenu";
import MetricsChart from "../Metrics/chart/MetricsChart";

export default function Dashboard() {
  const { data } = useWebSocket<Metrics[]>();
  const [actualDisplayedData, setActualDisplayedData] =
    useState<Metrics | null>(null);

  useEffect(() => {
    if (data && data.length > 0 && !actualDisplayedData) {
      setActualDisplayedData(data[0]);
    }
  }, []);
  return (
    <div className="dashboard">
      {data && <MetricsList metricsList={data} onSelect={setActualDisplayedData} />}
      {actualDisplayedData && <MetricsChart metrics={actualDisplayedData} />}
    </div>
  );
}
