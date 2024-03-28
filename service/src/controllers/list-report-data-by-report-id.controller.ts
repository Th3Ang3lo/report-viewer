import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import {
  ListReportDataByReportIdRequestDTO,
  ListReportDataByReportIdResponseDTO,
} from '@/controllers/dtos/list-report-data-by-report-id.controller.dto';
import { ListReportDataByReportIdService } from '@/services/reports/list-report-data-by-report-id.service';

@Controller('reports')
export class ListReportDataByReportId {
  public constructor(
    @Inject('ListReportDataByReportIdService')
    private _listReportDataByReportIdService: ListReportDataByReportIdService,
  ) {}

  @Get('/:reportId')
  public async listReportDataByReportId(
    @Param() params: ListReportDataByReportIdRequestDTO['params'],
    @Query() query: ListReportDataByReportIdRequestDTO['query'],
  ): Promise<ListReportDataByReportIdResponseDTO> {
    const { reportId } = params;
    const { startDate, endDate, status } = query;

    const reports =
      await this._listReportDataByReportIdService.listReportDataByReportId({
        reportId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status,
      });

    return {
      reportData: reports,
    };
  }
}
