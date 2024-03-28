import { env } from "@/env";

import { CreateReportResponseDTO } from "@/dtos/requests/create-report";

export async function createReport(formData: FormData): Promise<CreateReportResponseDTO> {
  const request = await fetch(`${env.apiUrl}/reports/upload`, {
    method: 'POST',
    body: formData
  });

  let response = null;

  try {
    response = await request.json();
  } catch (error) {
    response = null;
  }

  return {
    status: request.status,
    response: request.status == 200 ? response as CreateReportResponseDTO["response"] : null
  };
}