import { env } from "@/env";
import { ListAllReportsResponseDTO } from "../dtos/requests/list-all-reports";

export async function listAllReports(): Promise<ListAllReportsResponseDTO> {
  const request = await fetch(`${env.apiUrl}/reports`);

  let response = null;

  try {
    response = await request.json();
  } catch (error) {
    response = null;
  }

  return {
    status: request.status,
    response: request.status == 200 ? response as ListAllReportsResponseDTO["response"] : null
  }
}