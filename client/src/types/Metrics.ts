export interface Metrics {
  name: string;
  max_consumption: number;
  current_consumption: number[];
  additional_info?: Record<string, number>;
}
