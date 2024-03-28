import { env } from "@/env";
import { ListAllReportsResponseDTO } from "./dtos/list-all-reports.dto";

export async function listAllReports(): Promise<ListAllReportsResponseDTO> {
  const response = await fetch(`${env.apiUrl}/reports`);

  return {
    status: response.status,
    response: response.status == 200 ? await response.json() as unknown as ListAllReportsResponseDTO["response"] : null
  }
}