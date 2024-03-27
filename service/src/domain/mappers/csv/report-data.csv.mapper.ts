import { ReportData } from '@/domain/entities/report-data.entity';
import { DateHelper } from '@/helpers/date-helper';

export class ReportDataCSVMapper {
  public numberOfCharges: string;
  public chargedEveryXDays: string;
  public startDate: string;
  public status: string;
  public statusDate: string;
  public cancellationDate: string;
  public amount: string;
  public nextCycle: string;
  public subscriberId: string;
  public reportId: string;

  public constructor(params: Params) {
    this.numberOfCharges = params.numberOfCharges;
    this.chargedEveryXDays = params.chargedEveryXDays;
    this.startDate = params.startDate;
    this.status = params.status;
    this.statusDate = params.statusDate;
    this.cancellationDate = params.cancellationDate;
    this.amount = params.amount;
    this.nextCycle = params.nextCycle;
    this.subscriberId = params.subscriberId;
    this.reportId = params.reportId;
  }

  public static fromCSV(data: Params): ReportDataCSVMapper {
    return new ReportDataCSVMapper({
      numberOfCharges: data.numberOfCharges,
      chargedEveryXDays: data.chargedEveryXDays,
      startDate: data.startDate,
      status: data.status,
      statusDate: data.statusDate,
      cancellationDate: data.cancellationDate,
      amount: data.amount,
      nextCycle: data.nextCycle,
      subscriberId: data.subscriberId,
      reportId: data.reportId,
    });
  }

  public toEntity() {
    return new ReportData({
      numberOfCharges: Number(this.numberOfCharges),
      chargedEveryXDays: Number(this.chargedEveryXDays),
      startDate: DateHelper.parseReportDate(this.startDate),
      status: this.status,
      statusDate: DateHelper.parseReportDate(this.statusDate),
      cancellationDate: this.cancellationDate
        ? DateHelper.parseReportDate(this.cancellationDate)
        : null,
      amount: Number(this.amount.replace(',', '.')),
      nextCycle: DateHelper.parseReportDate(this.nextCycle),
      subscriberId: this.subscriberId,
      reportId: this.reportId,
    });
  }
}

export interface Params {
  numberOfCharges: string;
  chargedEveryXDays: string;
  startDate: string;
  status: string;
  statusDate: string;
  cancellationDate: string;
  amount: string;
  nextCycle: string;
  subscriberId: string;
  reportId: string;
}
