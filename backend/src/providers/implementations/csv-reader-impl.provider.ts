import { Injectable } from '@nestjs/common';

import { csvConcurrentReader } from 'csv-concurrent-reader';
import { CSVReaderProvider } from '../csv-reader.provider';

@Injectable()
export class CSVReaderImplementationProvider implements CSVReaderProvider {
  public async csvConcurrentReader(path: string, callback: any): Promise<void> {
    return csvConcurrentReader(path, callback, 100, 1000, {
      separator: ',',
    });
  }
}
