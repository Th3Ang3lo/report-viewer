export class DateHelper {
  public static parseReportDate(value: string): Date {
    const format1 = /^\d{1,2}\/\d{1,2}\/\d{2}\s\d{1,2}:\d{2}$/; // dd/mm/YY HH:mm
    const format2 = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // dd/mm/YYYY

    if (format1.test(value)) {
      const dateParts = value.split(/[\s\/:]/);

      const year = parseInt(dateParts[2]) + 2000;
      const month = parseInt(dateParts[1]) - 1;
      const day = parseInt(dateParts[0]);
      const hour = parseInt(dateParts[3]);
      const minute = parseInt(dateParts[4]);

      return new Date(year, month, day, hour, minute);
    } else if (format2.test(value)) {
      const dateParts = value.split(/[\s\/:]/);

      const year = parseInt(dateParts[2]);
      const month = parseInt(dateParts[1]) - 1;
      const day = parseInt(dateParts[0]);

      return new Date(year, month, day);
    } else {
      throw new Error(`Error when parse the value "${value}" to date.`);
    }
  }
}
