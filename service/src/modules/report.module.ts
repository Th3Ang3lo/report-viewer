import { Module } from '@nestjs/common';

import { ReportUploadController } from '@/controllers/report.controller';
import { CreateReportService } from '@/services/reports/create-report.service';
import { CSVReaderImplementationProvider } from '@/providers/implementations/csv-reader-impl.provider';
import { ReportsRepositoryImplementation } from '@/infra/database/postgres/repositories/implementations/reports.repository.implementation';
import { ReportDataRepositoryImplementation } from '@/infra/database/postgres/repositories/implementations/report-data.repository.implementation';

@Module({
  imports: [],
  providers: [
    {
      provide: 'CreateReportService',
      useClass: CreateReportService,
    },
    {
      provide: 'CSVReader',
      useClass: CSVReaderImplementationProvider,
    },
    {
      provide: 'ReportsRepository',
      useClass: ReportsRepositoryImplementation,
    },
    {
      provide: 'ReportDataRepository',
      useClass: ReportDataRepositoryImplementation,
    },
  ],
  controllers: [ReportUploadController],
})
export class ReportModule {}
