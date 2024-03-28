import { ReportsRepository } from 'src/infra/database/postgres/repositories/reports.repository';

export class ReportsRepositoryMock implements ReportsRepository {
  public create = jest.fn();
  public findAll = jest.fn();
}
