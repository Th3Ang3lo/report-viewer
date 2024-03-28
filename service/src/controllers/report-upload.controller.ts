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
import { CreateReportRequestDTO } from './dtos/report-upload.controller.dto';
import { Report } from '@/domain/entities/report.entity';

@Controller('reports')
export class ReportUploadController {
  public constructor(
    @Inject('CreateReportService')
    private _createReportService: CreateReportService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', reportUploadConfig))
  public async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateReportRequestDTO,
  ): Promise<Report> {
    const { path } = file;
    const { name } = body;

    return await this._createReportService.process({
      name,
      path,
    });
  }
}
