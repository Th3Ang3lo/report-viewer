export interface CSVReaderProvider {
  csvConcurrentReader(
    path: string,
    callback: any,
    concurrency: number,
  ): Promise<void>;
}
