import { randomUUID } from 'crypto';
import { ReportData } from '@/domain/entities/report-data.entity';

export class ReportDataDBMapper {
  private id: string;
  private number_of_charges: number;
  private charged_every_x_days: number;
  private start_date: Date;
  private status: string;
  private status_date: Date;
  private cancellation_date?: Date;
  private amount: number;
  private next_cycle: Date;
  private subscriber_id: string;
  private report_id: string;

  private constructor(columns: ReportDataColumns) {
    this.id = columns.id ?? randomUUID();
    this.number_of_charges = columns.number_of_charges;
    this.charged_every_x_days = columns.charged_every_x_days;
    this.start_date = columns.start_date;
    this.status = columns.status;
    this.status_date = columns.status_date;
    this.cancellation_date = columns.cancellation_date;
    this.amount = columns.amount;
    this.next_cycle = columns.next_cycle;
    this.subscriber_id = columns.subscriber_id;
    this.report_id = columns.report_id;
  }

  public static fromEntity(entity: ReportData): ReportDataDBMapper {
    return new ReportDataDBMapper({
      id: entity.id,
      number_of_charges: entity.numberOfCharges,
      charged_every_x_days: entity.chargedEveryXDays,
      start_date: entity.startDate,
      status: entity.status,
      status_date: entity.statusDate,
      cancellation_date: entity.cancellationDate,
      amount: entity.amount,
      next_cycle: entity.nextCycle,
      subscriber_id: entity.subscriberId,
      report_id: entity.reportId,
    });
  }

  public static fromDatabase(data: ReportDataColumns): ReportDataDBMapper {
    return new ReportDataDBMapper({
      id: data.id,
      number_of_charges: data.number_of_charges,
      charged_every_x_days: data.charged_every_x_days,
      start_date: data.start_date,
      status: data.status,
      status_date: data.status_date,
      cancellation_date: data.cancellation_date,
      amount: data.amount,
      next_cycle: data.next_cycle,
      subscriber_id: data.subscriber_id,
      report_id: data.report_id,
    });
  }

  public toEntity(): ReportData {
    return new ReportData({
      id: this.id,
      numberOfCharges: this.number_of_charges,
      chargedEveryXDays: this.charged_every_x_days,
      startDate: this.start_date,
      status: this.status,
      statusDate: this.status_date,
      cancellationDate: this.cancellation_date,
      amount: this.amount,
      nextCycle: this.next_cycle,
      subscriberId: this.subscriber_id,
      reportId: this.report_id,
    });
  }

  public toDatabase(): ReportDataColumns {
    return {
      id: this.id,
      number_of_charges: this.number_of_charges,
      charged_every_x_days: this.charged_every_x_days,
      start_date: this.start_date,
      status: this.status,
      status_date: this.status_date,
      cancellation_date: this.cancellation_date,
      amount: this.amount,
      next_cycle: this.next_cycle,
      subscriber_id: this.subscriber_id,
      report_id: this.report_id,
    };
  }
}

export interface ReportDataColumns {
  id: string;
  number_of_charges: number;
  charged_every_x_days: number;
  start_date: Date;
  status: string;
  status_date: Date;
  cancellation_date?: Date;
  amount: number;
  next_cycle: Date;
  subscriber_id: string;
  report_id: string;
}
