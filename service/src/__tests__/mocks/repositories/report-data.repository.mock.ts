import { ReportDataRepository } from 'src/infra/database/postgres/repositories/report-data.repository';

export class ReportDataRepositoryMock implements ReportDataRepository {
  public createMany = jest.fn();
  public findByReportIdFiltered = jest.fn();
}
