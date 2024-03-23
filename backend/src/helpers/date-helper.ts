export class DateHelper {
  public static parseReportDate(value: string): Date {
    const format1 = /^\d{1,2}\/\d{1,2}\/\d{2}\s\d{1,2}:\d{2}$/; // mm/dd/YY HH:mm
    const format2 = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // mm/dd/YYYY or dd/mm/YYYY

    let date = null;

    if (format1.test(value)) {
      const dateParts = value.split(/[\s\/:]/);

      const year = parseInt(dateParts[2]) + 2000;
      const month = parseInt(dateParts[0]) - 1;
      const day = parseInt(dateParts[1]);
      const hour = parseInt(dateParts[3]);
      const minute = parseInt(dateParts[4]);

      if (DateHelper.isValidDate(year, month, day, hour, minute)) {
        date = new Date(year, month, day, hour, minute);
      }
    } else if (format2.test(value)) {
      const dateParts = value.split(/[\s\/:]/);

      let month = 0;
      let day = 0;
      const year = parseInt(dateParts[2]);

      if (parseInt(dateParts[0]) > 12) {
        day = parseInt(dateParts[0]);
        month = parseInt(dateParts[1]);
      } else {
        day = parseInt(dateParts[1]);
        month = parseInt(dateParts[0]);
      }

      month = month - 1;

      if (DateHelper.isValidDate(year, month, day)) {
        date = new Date(year, month, day);
      }
    }

    if (!date) {
      throw new Error(`Error when parse the value "${value}" to date.`);
    }

    return date;
  }

  private static isValidDate(
    year: number,
    month: number,
    day: number,
    hour = 0,
    minute = 0,
  ): boolean {
    const isValidYear = year >= 0 && year <= 9999;
    const isValidMonth = month >= 0 && month <= 11;
    const isValidDay =
      day >= 1 && day <= new Date(year, month + 1, 0).getDate();
    const isValidHour = hour >= 0 && hour <= 23;
    const isValidMinute = minute >= 0 && minute <= 59;

    return (
      isValidYear && isValidMonth && isValidDay && isValidHour && isValidMinute
    );
  }
}
