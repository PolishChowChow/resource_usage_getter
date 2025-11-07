import type { Metrics } from "../../types/Metrics";
import { Card } from "../ui/Card";
import MetricsMenuOption from "./MetricsMenuOption";

type MetricsListProps = {
  metricsList: Metrics[];
  onSelect: (metric: Metrics) => void;
  actualMetrics: Metrics | null;
};

export default function MetricsList({
  metricsList,
  onSelect,
  actualMetrics,
}: MetricsListProps) {
  
  return (
    <Card title="Metrics">
      <div className="grid grid-cols-1 gap-3 text-gray-700 text-base">
        {metricsList.map((metrics) => (
          <MetricsMenuOption
            key={metrics.name}
            metrics={metrics}
            onSelect={onSelect}
            actualMetrics={actualMetrics}
          />
        ))}
      </div>
    </Card>
  );
}
