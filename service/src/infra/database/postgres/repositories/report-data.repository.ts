import { ReportData } from '@/domain/entities/report-data.entity';

export interface FindByReportIdFilters {
  startDate?: Date;
  endDate?: Date;
  status: string;
}

export interface ReportDataRepository {
  createMany(reportData: ReportData[]): Promise<void>;
  findByReportIdFiltered(
    reportId: string,
    filters?: FindByReportIdFilters,
  ): Promise<ReportData[]>;
}
