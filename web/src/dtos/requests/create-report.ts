import { Report } from "../report";
import { RequestError } from "./request-error";

export interface CreateReportResponseDTO {
  status: number;
  response: Report & RequestError | null
}