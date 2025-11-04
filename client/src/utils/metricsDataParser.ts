import { type LineSeries } from "@nivo/line";
import type { Metrics } from "../types/Metrics";

export function metricsDataParser(metrics: Metrics): LineSeries[] {
  const parsedMetrics = {
    id: metrics.name,
    data: metrics.current_consumption.map((value, index) => ({
      x: index.toString(),
      y: value,
    })),
  };



  return [parsedMetrics];
}