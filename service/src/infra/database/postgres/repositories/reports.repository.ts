import { Report } from '@/domain/entities/report.entity';

export interface ReportsRepository {
  create(report: Report): Promise<Report>;
  findAll(): Promise<Report[]>;
}
