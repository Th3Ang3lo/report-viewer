import { ReportData } from '@/domain/entities/report-data.entity';

export interface ListReportDataByReportIdRequestDTO {
  params: {
    reportId: string;
  };
  query: {
    startDate: string;
    endDate: string;
    status: string;
  };
}

export interface ListReportDataByReportIdResponseDTO {
  reportData: ReportData[];
}
