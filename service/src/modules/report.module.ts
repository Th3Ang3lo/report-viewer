import { Module } from '@nestjs/common';

import { ReportUploadController } from '@/controllers/report-upload.controller';
import { CreateReportService } from '@/services/reports/create-report.service';
import { CSVReaderImplementationProvider } from '@/providers/implementations/csv-reader-impl.provider';
import { ReportsRepositoryImplementation } from '@/infra/database/postgres/repositories/implementations/reports.repository.implementation';
import { ReportDataRepositoryImplementation } from '@/infra/database/postgres/repositories/implementations/report-data.repository.implementation';
import { ListAllReportsController } from '@/controllers/list-all-reports.controller';
import { ListAllReportsService } from '@/services/reports/list-all-reports.service';
import { ListReportDataByReportIdService } from '@/services/reports/list-report-data-by-report-id.service';
import { ListReportDataByReportId } from '@/controllers/list-report-data-by-report-id.controller';

@Module({
  imports: [],
  providers: [
    {
      provide: 'ListAllReportsService',
      useClass: ListAllReportsService,
    },
    {
      provide: 'CreateReportService',
      useClass: CreateReportService,
    },
    {
      provide: 'ListReportDataByReportIdService',
      useClass: ListReportDataByReportIdService,
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
  controllers: [
    ReportUploadController,
    ListAllReportsController,
    ListReportDataByReportId,
  ],
})
export class ReportModule {}
