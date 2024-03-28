import { randomUUID } from 'crypto';

export class Report {
  public id?: string;
  public name: string;

  public createdAt: Date;

  public constructor(params: Params) {
    this.id = params.id ?? randomUUID();
    this.name = params.name;
    this.createdAt = params.createdAt ?? new Date();
  }
}

export interface Params {
  id?: string;
  name: string;
  createdAt?: Date;
}
