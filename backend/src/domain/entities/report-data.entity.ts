import { randomUUID } from 'crypto';

export class ReportData {
  public id?: string;
  public numberOfCharges: number;
  public chargedEveryXDays: number;
  public startDate: Date;
  public status: string;
  public statusDate: Date;
  public cancellationDate?: Date;
  public amount: number;
  public nextCycle: Date;
  public subscriberId: string;
  public reportId: string;

  public constructor(params: Params) {
    this.id = randomUUID();
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
}

export interface Params {
  id?: string;
  numberOfCharges: number;
  chargedEveryXDays: number;
  startDate: Date;
  status: string;
  statusDate: Date;
  cancellationDate?: Date;
  amount: number;
  nextCycle: Date;
  subscriberId: string;
  reportId: string;
}
