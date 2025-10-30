import { ResponsiveLine, type LineSeries } from "@nivo/line";
import type { Metrics } from "../../../types/Metrics";
import { dataParser } from "../../../utils/metricsDataParser";
import { useEffect } from "react";

type MetricsLinearChartProps = {
  metrics: Metrics[];
};

function MetricsLinearChart({ metrics }: MetricsLinearChartProps) {
  const data = metrics || [];

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const parsedData = dataParser(data)[3];
  return (
    <div style={{ height: 400, backgroundColor: "#" }}>
      <ResponsiveLine
        data={[parsedData]}
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
