import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ReportUploadController } from './controllers/report.controller';
import { CreateReportService } from './services/reports/create-report.service';
import { CSVReaderImplementationProvider } from './providers/implementations/csv-reader-impl.provider';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [CreateReportService, CSVReaderImplementationProvider],
  controllers: [ReportUploadController],
})
export class AppModule {}
