export interface ListAllReportsResponseDTO {
  status: number;
  response: {
    reportData: Array<{
      id: string,
      startDate: string,
      status: string,
      amount: number
    }>
  } | null
}