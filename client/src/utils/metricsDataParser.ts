import type { LineSeries } from "@nivo/line";
import type { Metrics } from "../types/Metrics";

export function dataParser(metrics: Metrics[]): LineSeries[] {
  const parsedMetrics = metrics.map((metric) => ({
    id: metric.name,
    data: metric.current_consumption.map((value, index) => ({
      x: index.toString(),
      y: value,
    })),
  }));
  console.log("parsed:", parsedMetrics);
  
  return parsedMetrics;
}