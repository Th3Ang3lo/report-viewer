import { env } from "@/env";
import { ListAllReportsResponseDTO } from "./dtos/list-all-reports.dto";

export interface ReportDataFilters {
  startDate: Date,
  status: string
}
export async function listReportData(reportId: string, filters?: ReportDataFilters): Promise<ListAllReportsResponseDTO> {
  const params = new URLSearchParams(filters as any);
  
  const response = await fetch(`${env.apiUrl}/reports/${reportId}?${params}`);

  return {
    status: response.status,
    response: response.status == 200 ? response.json() as unknown as ListAllReportsResponseDTO["response"] : null
  }
}