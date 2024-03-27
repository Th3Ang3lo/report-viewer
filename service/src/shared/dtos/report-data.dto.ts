export interface ReportDataCSVDTO {
  'quantidade cobranças': string;
  'cobrada a cada X dias': string;
  'data início': string;
  status: string;
  'data status': string;
  'data cancelamento'?: string;
  valor: string;
  'próximo ciclo': string;
  'ID assinante': string;
}

export interface ReportDataMappedCSVDTO {
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

export interface ReportDataDTO {
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
