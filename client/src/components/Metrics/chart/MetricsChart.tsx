import { Line } from "@nivo/line";
import type { Metrics } from "../../../types/Metrics";
import { metricsDataParser } from "../../../utils/metricsDataParser";

type MetricsChartProps = {
  metrics: Metrics;
};

export default function MetricsChart({ metrics }: MetricsChartProps) {
  const parsedMetrics = metricsDataParser(metrics);
  return (
    <div className="metrics-chart">
      <div className="chart-container">
        <Line
          data={parsedMetrics}
          height={300}
          width={400}
          yScale={{
            type: "linear",
            min: 0,
            max: metrics.max_consumption,
          }}
          enableArea={true}
          enableGridX={true}
          enableGridY={true}
          enablePoints={true}
          isInteractive={true}
          margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
          colors={{ scheme: "set3" }}
          axisLeft={{
            
          }}
        />
      </div>
      {metrics.additional_info && (
        <div className="additional-info">
          {Object.entries(metrics.additional_info).map(([key, value]) => (
            <p key={key}>
              {key.replace(/_/g, " ")}: {value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
