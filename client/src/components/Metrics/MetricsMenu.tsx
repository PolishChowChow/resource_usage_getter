import type { Metrics } from "../../types/Metrics";
import MetricsMenuOption from "./MetricsMenuOption";

type MetricsListProps = {
  metricsList: Metrics[];
  onSelect: (metric: Metrics) => void;
};

export default function MetricsList({
  metricsList,
  onSelect,
}: MetricsListProps) {
  return (
    <div className="metrics-list">
      {metricsList.map((metrics) => (
        <MetricsMenuOption
          key={metrics.name}
          metrics={metrics}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
