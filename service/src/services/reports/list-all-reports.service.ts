import { Inject, Injectable } from '@nestjs/common';
import { ReportsRepository } from '@/infra/database/postgres/repositories/reports.repository';
import { Report } from '@/domain/entities/report.entity';

@Injectable()
export class ListAllReportsService {
  public constructor(
    @Inject('ReportsRepository')
    private _reportsRepository: ReportsRepository,
  ) {}

  public async listAll(): Promise<Report[]> {
    const reports = await this._reportsRepository.findAll();

    return reports;
  }
}
