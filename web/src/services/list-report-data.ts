import { env } from "@/env";
import { ListAllReportDataResponseDTO } from "@/dtos/requests/list-report-data";

export interface ReportDataFilters {
  startDate: string,
  status: string
}
export async function listReportData(reportId: string, filters?: ReportDataFilters): Promise<ListAllReportDataResponseDTO> {
  const params = new URLSearchParams(filters as any);
  
  const request = await fetch(`${env.apiUrl}/reports/${reportId}?${params}`);

  let response = null;

  try {
    response = await request.json();
  } catch (error) {
    response = null;
  }

  return {
    status: request.status,
    response: request.status == 200 ? response as ListAllReportDataResponseDTO["response"] : null
  }
}