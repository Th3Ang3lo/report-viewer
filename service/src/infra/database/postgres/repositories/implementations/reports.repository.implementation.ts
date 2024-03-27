import { Report } from '@/domain/entities/report.entity';
import { ReportsRepository } from '../reports.repository';
import { postgresClient } from '../../connection';
import { ReportDBMapper } from '@/domain/mappers/database/report.database.mapper';

export class ReportsRepositoryImplementation implements ReportsRepository {
  public async create(report: Report): Promise<Report> {
    const createReport = await postgresClient()
      .table('reports')
      .insert(ReportDBMapper.fromEntity(report).toDatabase())
      .returning('*');

    return ReportDBMapper.fromDatabase(createReport[0]).toEntity();
  }
}
