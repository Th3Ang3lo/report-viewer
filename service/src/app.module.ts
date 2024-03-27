import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ReportModule } from './modules/report.module';

@Module({
  imports: [ConfigModule.forRoot(), ReportModule],
})
export class AppModule {}
