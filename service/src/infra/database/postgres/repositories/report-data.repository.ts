import { ReportData } from '@/domain/entities/report-data.entity';

export interface ReportDataRepository {
  createMany(reportData: ReportData[]): Promise<void>;
}
