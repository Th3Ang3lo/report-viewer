import { ReportData } from '@/domain/entities/report-data.entity';
import { ReportDataRepository } from '../report-data.repository';
import { ReportDataDBMapper } from '@/domain/mappers/database/report-data.database.mapper';
import { postgresClient } from '../../connection';

export class ReportDataRepositoryImplementation
  implements ReportDataRepository
{
  public async createMany(reportData: ReportData[]): Promise<void> {
    const reportDataToInsert = reportData.map((reportData) =>
      ReportDataDBMapper.fromEntity(reportData).toDatabase(),
    );

    await postgresClient()
      .table('report_data')
      .insert(reportDataToInsert)
      .returning('*');
  }
}
