import type { Metrics } from "../../types/Metrics";
import useWebSocket from "../../utils/useWebSocket";
import { useEffect, useState } from "react";
import MetricsList from "../Metrics/MetricsMenu";
import MetricsChart from "../Metrics/chart/MetricsChart";
import Page from "../ui/Page";
import { Card } from "../ui/Card";

export default function Dashboard() {
  const { data } = useWebSocket<Metrics[]>();
  const [actualDisplayedData, setActualDisplayedData] =
    useState<Metrics | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setActualDisplayedData((prev) => {
        if (!prev) return data[0]; 
        const updated = data.find((m) => m.name === prev.name);
        return updated ? { ...updated } : data[0];
      });
    }
  }, [data]);
  return (
    <Page title="Resource Usage Dashboard">
      <div className="grid grid-cols-[1fr_2fr] gap-8">
        <Card title="System Usage">
          {actualDisplayedData && data && (
            <MetricsList
              metricsList={data}
              onSelect={setActualDisplayedData}
              actualMetrics={actualDisplayedData}
            />
          )}
        </Card>
        <Card title="Traffic Chart">
          {actualDisplayedData && (
            <MetricsChart metrics={actualDisplayedData} />
          )}
        </Card>
      </div>
    </Page>
  );
}
