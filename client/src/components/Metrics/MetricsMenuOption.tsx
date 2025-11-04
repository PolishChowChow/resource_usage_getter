import type { Metrics } from "../../types/Metrics";

type MetricsMenuOptionProps = {
    metrics: Metrics
    onSelect: (metric: Metrics) => void;
};

export default function MetricsMenuOption({ metrics, onSelect }: MetricsMenuOptionProps) {
    const utilization_percent = ((metrics.current_consumption[metrics.current_consumption.length - 1] / metrics.max_consumption) * 100).toFixed(1)
    return (
        <div onClick={() => onSelect(metrics)}>
            {metrics.name}
            <p>
                {utilization_percent}%
            </p>
        </div>
    );
}