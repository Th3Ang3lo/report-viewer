import { randomUUID } from 'crypto';
import { Report } from '@/domain/entities/report.entity';

export class ReportDBMapper {
  private id: string;
  private name: string;
  private created_at: Date;

  private constructor(columns: ReportsColumns) {
    this.id = columns.id ?? randomUUID();
    this.name = columns.name;
    this.created_at = columns.created_at ?? new Date();
  }

  public static fromEntity(entity: Report): ReportDBMapper {
    return new ReportDBMapper({
      id: entity.id,
      name: entity.name,
      created_at: entity.createdAt,
    });
  }

  public static fromDatabase(data: ReportsColumns): ReportDBMapper {
    return new ReportDBMapper({
      id: data.id,
      name: data.name,
      created_at: data.created_at,
    });
  }

  public toEntity(): Report {
    return new Report({
      id: this.id,
      name: this.name,
      createdAt: this.created_at,
    });
  }

  public toDatabase(): ReportsColumns {
    return {
      id: this.id,
      name: this.name,
      created_at: this.created_at,
    };
  }
}

export interface ReportsColumns {
  id: string;
  name: string;
  created_at: Date;
}
