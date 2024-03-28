export interface Report {
  id: string,
  name: string,
  createdAt: string
}

export interface ListAllReportsResponseDTO {
  status: number;
  response: {
    reports: Report[]
  } | null
}