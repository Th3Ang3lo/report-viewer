import { Report } from "../report";
import { RequestError } from "./request-error";

export interface ListAllReportsResponseDTO {
  status: number;
  response: {
    reportData: Report[]
  } & RequestError | null
}