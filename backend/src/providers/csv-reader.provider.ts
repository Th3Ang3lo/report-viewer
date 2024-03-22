export interface CSVReaderProvider {
  csvConcurrentReader(path: string, callback: any): Promise<void>;
}
