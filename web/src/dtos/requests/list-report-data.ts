import { ReportData } from "../report-data";
import { RequestError } from "./request-error";

export interface ListAllReportDataResponseDTO {
  status: number;
  response: {
    reportData: ReportData[]
  } & RequestError | null
}
