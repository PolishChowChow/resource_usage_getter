import { ResponsiveLine, type LineSeries } from "@nivo/line";
import type { Metrics } from "../../types/Metrics";

function dataParser(metrics: Metrics[]): LineSeries[] {
  return metrics.map((metric, id) => {
    return {
      id: id.toString(),
      data: Object.keys(metric).map((key) => {
        return {
          x: key,
          y: metric[key as keyof Metrics],
        };
      }),
    };
  });
}
type MetricsLinearChartProps = {
  metrics: Metrics[];
};

function MetricsLinearChart({ metrics }: MetricsLinearChartProps) {
  const parsedData = dataParser(metrics || []);
  return (
    <div style={{ height: 400, backgroundColor: "#" }}>
      <ResponsiveLine
        data={parsedData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
        }}
      />
    </div>
  );
}
export default MetricsLinearChart;
