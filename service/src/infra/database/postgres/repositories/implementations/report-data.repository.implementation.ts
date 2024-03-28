import { ReportData } from '@/domain/entities/report-data.entity';
import {
  FindByReportIdFilters,
  ReportDataRepository,
} from '../report-data.repository';
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

  public async findByReportIdFiltered(
    reportId: string,
    filters?: FindByReportIdFilters,
  ): Promise<ReportData[]> {
    // TODO: fix this
    const query = postgresClient()
      .table('report_data')
      .select(
        postgresClient().raw(
          'DATE(start_date) as start_date, sum(amount) as amount, status',
        ),
      )
      .where('report_id', '=', reportId)
      .andWhere('status', filters.status)
      .groupBy('start_date')
      .groupBy('status')
      .modify((builder) => {
        if (filters.startDate) {
          builder.andWhere('start_date', '>=', filters.startDate);
        }
      });

    const result = await query;

    return result.map((reportData) =>
      ReportDataDBMapper.fromDatabase(reportData).toEntity(),
    );
  }
}
