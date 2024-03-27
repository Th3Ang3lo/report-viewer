import { csvConcurrentReader } from 'csv-concurrent-reader';
import { CSVReaderProvider } from '../csv-reader.provider';

export class CSVReaderImplementationProvider implements CSVReaderProvider {
  public async csvConcurrentReader(
    path: string,
    callback: any,
    concurrency: number,
  ): Promise<void> {
    return csvConcurrentReader(path, callback, concurrency, 1000, {
      separator: ',',
    });
  }
}
