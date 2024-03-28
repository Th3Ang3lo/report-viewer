import { HttpException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import { maxFileSizeMB, tempFilePath } from './config';

export const reportUploadConfig: MulterOptions = {
  dest: tempFilePath,
  limits: {
    fieldSize: maxFileSizeMB,
  },
  fileFilter: (_, file, callback) => {
    if (file.mimetype !== 'text/csv') {
      return callback(
        new HttpException('O arquivo não é um CSV válido.', 200),
        false,
      );
    }

    return callback(null, true);
  },
};
