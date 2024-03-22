import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CSVReaderProvider } from 'src/providers/csv-reader.provider';
import { CSVReaderImplementationProvider } from 'src/providers/implementations/csv-reader-impl.provider';
import { ReportDTO } from 'src/shared/dto/report.dto';
import { ReportValidation } from 'src/validations/report.validation';
import { CreateReportParams } from '../dtos/reports/create-report.service.dto';

@Injectable()
export class CreateReportService {
  public constructor(
    @Inject(CSVReaderImplementationProvider)
    private _csvReaderProvider: CSVReaderProvider,
  ) {}

  public async process(params: CreateReportParams): Promise<true> {
    await this.validateReportCsvFile(params.path);

    await this.saveReport(params.path);

    return true;
  }

  public async saveReport(path: string) {
    const batch = [];

    await this._csvReaderProvider.csvConcurrentReader(
      path,
      async (data: ReportDTO) => {
        // TODO: process bulk by bulk
      },
    );
  }

  private async validateReportCsvFile(path: string) {
    let currentLine = 1;

    await new Promise(async (resolve, reject) => {
      await this._csvReaderProvider.csvConcurrentReader(
        path,
        async (data: ReportDTO) => {
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

          const bodyError = await ReportValidation.getBodyError(data);
          if (bodyError) {
            reject(
              new HttpException(
                `Erro na linha ${currentLine} do CSV. ${bodyError}`,
                400,
              ),
            );
          }
        },
      );

      resolve(null);
    });

    console.log(currentLine);

    // throw new HttpException('Houve um erro na linha X do CSV.', 400);
  }
}
