import { Provider } from "./provider";
import { ServiceRequest } from "./service";

export type DashboardData = {
  total_providers: number;
  total_clients: number;
  total_requests: number;
  total_volume: number | null; // Assuming volume can be null if not calculated
  new_providers: Provider[];
  recent_requests: ServiceRequest[];
}