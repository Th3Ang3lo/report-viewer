import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { reportUploadConfig } from '@/infra/config/report-upload.config';
import { CreateReportService } from '@/services/reports/create-report.service';
import { CreateReportRequestDTO } from './dtos/report.controller.dto';

@Controller('reports')
export class ReportUploadController {
  public constructor(
    @Inject('CreateReportService')
    private _reportService: CreateReportService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', reportUploadConfig))
  public async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateReportRequestDTO,
  ): Promise<void> {
    const { path } = file;
    const { name } = body;

    await this._reportService.process({
      name,
      path,
    });
  }
}
