import { resolve } from 'node:path';
import { cwd } from 'process';
import { Test } from '@nestjs/testing';

import { ReportUploadController } from './report-upload.controller';
import { ReportsRepositoryMock } from '@/__tests__/mocks/repositories/reports.repository.mock';
import { ReportDataRepositoryMock } from '@/__tests__/mocks/repositories/report-data.repository.mock';
import { CSVReaderImplementationProvider } from '@/providers/implementations/csv-reader-impl.provider';
import { CreateReportServiceMock } from '@/__tests__/mocks/services/create-report.service.mock';

const name = ReportUploadController.name;
describe(`${name} Tests`, () => {
  let sut: ReportUploadController;
  let service: CreateReportServiceMock;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          useClass: CreateReportServiceMock,
          provide: 'CreateReportService',
        },
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
      controllers: [ReportUploadController],
    }).compile();

    service = moduleRef.get('CreateReportService');
    sut = moduleRef.get<ReportUploadController>(ReportUploadController);
  });

  afterEach(() => {
    service = null;
    sut = null;
  });

  it('Should process report with success.', async () => {
    const body = {
      name: 'test-report',
    };

    const file = {
      path: resolve(cwd(), 'src', '__tests__', 'files', 'test-small.csv'),
    } as Express.Multer.File;

    await sut.upload(file, body);

    expect(service.process).toHaveBeenCalledWith({
      name: body.name,
      path: file.path,
    });
  });
});
