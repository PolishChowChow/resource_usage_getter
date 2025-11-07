import type { Metrics } from "../../types/Metrics";

type MetricsMenuOptionProps = {
  metrics: Metrics;
  onSelect: (metric: Metrics) => void;
  actualMetrics: Metrics | null;
};

export default function MetricsMenuOption({
  metrics,
  onSelect,
  actualMetrics,
}: MetricsMenuOptionProps) {
  const utilization_percent = (
    (metrics.current_consumption[metrics.current_consumption.length - 1] /
      metrics.max_consumption) *
    100
  ).toFixed(1);
  const isSelected = actualMetrics?.name === metrics.name;

  const classes = isSelected
    ? "text-blue-700 font-semibold underline"
    : "text-blue-600 hover:text-blue-700 hover:underline";
  return (
    <button
      onClick={() => onSelect(metrics)}
      className={`${classes} hover:text-blue-700 hover:underline text-left transition`}
    >
      {metrics.name}
      <p>{utilization_percent}%</p>
    </button>
  );
}
