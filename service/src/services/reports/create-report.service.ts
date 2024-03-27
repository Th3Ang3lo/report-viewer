import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CSVReaderProvider } from '@/providers/csv-reader.provider';
import { ReportDataCSVDTO } from '@/shared/dtos/report-data.dto';
import { ReportValidation } from '@/validations/report.validation';
import { CreateReportParams } from '../dtos/reports/create-report.service.dto';
import { ReportsRepository } from '@/infra/database/postgres/repositories/reports.repository';
import { ReportDataRepository } from '@/infra/database/postgres/repositories/report-data.repository';
import { Report } from '@/domain/entities/report.entity';
import { ObjectMapperHelper } from '@/helpers/object-mapper-helper';
import { reportFields } from '@/shared/constants/report.constant';

import { ReportDataMappedCSVDTO } from '@/shared/dtos/report-data.dto';
import { ReportDataCSVMapper } from '@/domain/mappers/csv/report-data.csv.mapper';
import { ReportData } from '@/domain/entities/report-data.entity';

@Injectable()
export class CreateReportService {
  public constructor(
    @Inject('CSVReader')
    private _csvReaderProvider: CSVReaderProvider,
    @Inject('ReportsRepository')
    private _reportsRepository: ReportsRepository,
    @Inject('ReportDataRepository')
    private _reportDataRepository: ReportDataRepository,
  ) {}

  public async process(params: CreateReportParams): Promise<true> {
    await this.validateReportCsvFile(params.path);

    await this.saveReport(params);

    return true;
  }

  private async saveReport(params: CreateReportParams) {
    const report = new Report({
      name: params.name,
    });

    await this._reportsRepository.create(report);

    let chunk = [];

    await this._csvReaderProvider.csvConcurrentReader(
      params.path,
      async (data: ReportDataCSVDTO) => {
        const reportData = this.getParsedCSVBody(data);

        chunk.push(reportData);

        if (chunk.length >= 100) {
          await this._reportDataRepository.createMany(chunk);

          chunk = [];
        }
      },
      1,
    );

    // Process last chunk
    if (chunk.length > 0) {
      await this._reportDataRepository.createMany(chunk);
    }
  }

  private async validateReportCsvFile(path: string) {
    let currentLine = 1;

    await new Promise(async (resolve, reject) => {
      await this._csvReaderProvider.csvConcurrentReader(
        path,
        async (data: ReportDataCSVDTO) => {
          const parsedData =
            ObjectMapperHelper.transform<ReportDataMappedCSVDTO>(
              data,
              reportFields,
            );

          currentLine++;

          const invalidColumn = ReportValidation.getInvalidColumn(
            Object.keys(data),
          );

          if (invalidColumn) {
            reject(
              new HttpException(
                `Erro na linha 1 do CSV. Está faltando a coluna: "${invalidColumn}"`,
                400,
              ),
            );
          }

          const bodyError =
            await ReportValidation.getReportDataError(parsedData);
          if (bodyError) {
            reject(
              new HttpException(
                `Erro na linha ${currentLine} do CSV. ${bodyError}`,
                400,
              ),
            );
          }
        },
        1,
      );

      resolve(null);
    });
  }

  private getParsedCSVBody(
    data: ReportDataCSVDTO,
    reportId?: string,
  ): ReportData {
    const parsedValue = ObjectMapperHelper.transform<ReportDataMappedCSVDTO>(
      data,
      reportFields,
    );

    const reportData = ReportDataCSVMapper.fromCSV(
      Object.assign(parsedValue, { reportId: reportId }),
    ).toEntity();

    return reportData;
  }
}
