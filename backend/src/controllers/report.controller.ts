import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { reportUploadConfig } from 'src/infra/config/report-upload.config';
import { CreateReportService } from 'src/services/reports/create-report.service';

@Controller('reports')
export class ReportUploadController {
  public constructor(private _reportService: CreateReportService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', reportUploadConfig))
  public async upload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    const { path } = file;

    await this._reportService.process({ path });
  }
}
