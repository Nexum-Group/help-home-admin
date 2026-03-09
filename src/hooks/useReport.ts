// src/hooks/useDashboard.ts
import { useQuery } from '@tanstack/react-query';
import { getReport } from '../services/report.service';
import { Report } from '../types/report';

export function useReport(date?: string) {
  return useQuery<Report>({
    queryKey: ['reports', date],
    queryFn: () => getReport({ date }),
  });
}
