// src/hooks/useDashboard.ts
import { useQuery } from "@tanstack/react-query"
import { dashboard } from "../services/dashboard.service"
import { DashboardData } from "../types/dashboard"

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: dashboard,
  })
}