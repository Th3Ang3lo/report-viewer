import { Controller, Get, Inject } from '@nestjs/common';

import { ListAllReportsService } from '@/services/reports/list-all-reports.service';
import { ListAllReportsResponseDTO } from './dtos/list-all-reports.controller.dto';

@Controller('reports')
export class ListAllReportsController {
  public constructor(
    @Inject('ListAllReportsService')
    private _listAllReportsService: ListAllReportsService,
  ) {}

  @Get('/')
  public async listAll(): Promise<ListAllReportsResponseDTO> {
    const reports = await this._listAllReportsService.listAll();

    return {
      reports,
    };
  }
}
