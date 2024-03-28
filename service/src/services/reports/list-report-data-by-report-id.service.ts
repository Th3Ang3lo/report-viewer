import { Inject, Injectable } from '@nestjs/common';
import { ReportDataRepository } from '@/infra/database/postgres/repositories/report-data.repository';
import {
  ListReportDataByReportIdServiceOutputDTO,
  ListReportDataByReportIdServiceParamsDTO,
} from '../dtos/reports/list-report-data-by-report-id.service.dto';

@Injectable()
export class ListReportDataByReportIdService {
  public constructor(
    @Inject('ReportDataRepository')
    private _reportDataRepository: ReportDataRepository,
  ) {}

  public async listReportDataByReportId(
    params: ListReportDataByReportIdServiceParamsDTO,
  ): Promise<ListReportDataByReportIdServiceOutputDTO> {
    const { reportId, startDate, endDate, status } = params;

    const reports = await this._reportDataRepository.findByReportIdFiltered(
      reportId,
      {
        startDate,
        endDate,
        status,
      },
    );

    return reports;
  }
}
