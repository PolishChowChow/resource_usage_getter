import { ResponsiveLine, type LineSeries } from "@nivo/line";
import type { Metrics } from "../../../types/Metrics";
import { dataParser } from "../../../utils/metricsDataParser";


type MetricsLinearChartProps = {
  metrics: Metrics[];
};

function MetricsLinearChart({ metrics }: MetricsLinearChartProps) {
  const data = metrics || [];

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const parsedData = dataParser(data);
  const charts = parsedData.map((chart: LineSeries) => (
    <div key={chart.id} style={{ height: 400, backgroundColor: "#" }}>
      <ResponsiveLine
        data={[chart]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
        }}
      />
    </div>
  ));
  return <div>{charts}</div>;
}
        

export default MetricsLinearChart;
