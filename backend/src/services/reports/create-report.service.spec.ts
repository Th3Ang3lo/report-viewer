import { resolve } from 'node:path';
import { cwd } from 'process';
import { Test } from '@nestjs/testing';

import { CreateReportService } from './create-report.service';
import { ReportsRepositoryMock } from '@/__tests__/mocks/repositories/reports.repository.mock';
import { ReportDataRepositoryMock } from '@/__tests__/mocks/repositories/report-data.repository.mock';
import { CSVReaderImplementationProvider } from '@/providers/implementations/csv-reader-impl.provider';
import { Report } from '@/domain/entities/report.entity';
import { HttpException } from '@nestjs/common';

const name = CreateReportService.name;
describe(`${name} Tests`, () => {
  let sut: CreateReportService;
  let reportsRepositoryMock: ReportsRepositoryMock;
  let reportDataRepositoryMock: ReportDataRepositoryMock;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateReportService,
        {
          useClass: CSVReaderImplementationProvider,
          provide: 'CSVReader',
        },
        {
          useClass: ReportsRepositoryMock,
          provide: 'ReportsRepository',
        },
        {
          useClass: ReportDataRepositoryMock,
          provide: 'ReportDataRepository',
        },
      ],
    }).compile();

    reportsRepositoryMock = moduleRef.get('ReportsRepository');
    reportDataRepositoryMock = moduleRef.get('ReportDataRepository');

    sut = moduleRef.get<CreateReportService>(CreateReportService);
  });

  afterEach(() => {
    sut = null;
    reportsRepositoryMock = null;
    reportDataRepositoryMock = null;
  });

  it('Should process report with success.', async () => {
    const params = {
      name: 'test-report',
      path: resolve(cwd(), 'src', '__tests__', 'files', 'test-small.csv'),
    };

    await sut.process(params);

    expect(reportsRepositoryMock.create).toHaveBeenCalled();
    expect(reportDataRepositoryMock.createMany).toHaveBeenCalledTimes(2);
  });

  it('Should throw error processing invalid CSV file.', async () => {
    const params = {
      name: 'test-report',
      path: resolve(
        cwd(),
        'src',
        '__tests__',
        'files',
        'test-small-incorrect-value.csv',
      ),
    };

    const report = new Report({
      name: 'test-report',
    });

    reportsRepositoryMock.create.mockResolvedValue(report);

    const tryProcess = async () => sut.process(params);

    expect(tryProcess).rejects.toThrow(
      new HttpException(
        `Erro na linha 11 do CSV. O valor de "data cancelamento" (invalid_cancellation_date) deve estar no formato "mm/dd/YY HH:mm"`,
        400,
      ),
    );
  });
});
