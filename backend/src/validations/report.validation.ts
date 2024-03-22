import { DateHelper } from 'src/helpers/date-helper';
import { reportColumns } from 'src/shared/constants/report.constant';
import { ReportDTO } from 'src/shared/dto/report.dto';
import { number, object, string } from 'yup';

export class ReportValidation {
  public static getInvalidColumn(columns: string[]): string {
    for (const key of reportColumns) {
      if (!columns.includes(key)) {
        return key;
      }
    }

    return null;
  }

  public static async getBodyError(data: ReportDTO): Promise<string> {
    const reportSchema = object({
      'quantidade cobranças': number()
        .required()
        .typeError('Quantidade de cobrança inválida.'),
      'cobrada a cada X dias': number()
        .required()
        .typeError('Intervalo de cobrança inválido.'),
      'data início': string()
        .required()
        .test('testDate', (value) => !!DateHelper.parseReportDate(value)),
      status: string().required(),
      'data status': string().required().test('testDate', this.isValidDate),
      'data cancelamento': string()
        .optional()
        .nullable()
        .test('testDate', (value) => {
          if (!value) return true;

          return this.isValidDate(value);
        }),
      valor: string().required(),
      'próximo ciclo': string().required().test('testDate', this.isValidDate),
      'ID assinante': string().required(),
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
