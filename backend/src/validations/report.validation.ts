import { DateHelper } from '@/helpers/date-helper';
import { reportColumns } from '@/shared/constants/report.constant';
import { ReportDataMappedCSVDTO } from '@/shared/dtos/report-data.dto';
import { number, object, string, ValidationError } from 'yup';

export class ReportValidation {
  public static getInvalidColumn(columns: string[]): string {
    for (const key of reportColumns) {
      if (!columns.includes(key)) {
        return key;
      }
    }

    return null;
  }

  public static async getReportDataError(
    data: ReportDataMappedCSVDTO,
  ): Promise<string> {
    const reportSchema = object({
      numberOfCharges: number()
        .required()
        .typeError('Quantidade de cobrança inválida.'),
      chargedEveryXDays: number()
        .required()
        .typeError('Intervalo de cobrança inválido.'),
      startDate: string()
        .required()
        .test({
          test: this.isValidDate,
          message: (value: ValidationError) =>
            `O valor da "data início" (${value.value}) deve estar no formato "mm/dd/YYYY HH:mm"`,
        }),
      status: string().required(),
      statusDate: string()
        .required()
        .test({
          test: this.isValidDate,
          message: (value: ValidationError) =>
            `O valor de "data status" (${value.value}) deve estar no formato "mm/dd/YY HH:mm"`,
        }),
      cancellationDate: string()
        .optional()
        .nullable()
        .test({
          test: (value) => {
            if (!value) return true;

            return this.isValidDate(value);
          },
          message: (value: ValidationError) =>
            `O valor de "data cancelamento" (${value.value}) deve estar no formato "mm/dd/YY HH:mm"`,
        }),
      amount: string().required(),
      nextCycle: string()
        .required()
        .test({
          test: this.isValidDate,
          message: (value: ValidationError) =>
            `O valor de "próximo ciclo" (${value.value}) deve estar no formato "mm/dd/YYYY"`,
        }),
      subscriberId: string().required(),
    });

    try {
      await reportSchema.validate(data);

      return null;
    } catch (error) {
      return error.errors[0];
    }
  }

  private static isValidDate(value: string): boolean {
    try {
      DateHelper.parseReportDate(value);

      return true;
    } catch (error) {
      return false;
    }
  }
}
