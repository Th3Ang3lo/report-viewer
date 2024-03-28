import { ReportData } from '@/domain/entities/report-data.entity';

export interface ListReportDataByReportIdServiceParamsDTO {
  reportId: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

export type ListReportDataByReportIdServiceOutputDTO = ReportData[];
