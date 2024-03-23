import { DateHelper } from './date-helper';

const name = DateHelper.name;
describe(`${name} Tests`, () => {
  it('should parse dates with success', () => {
    const dateString1 = '2/1/22 7:52';
    const dateString2 = '2/13/22 6:33';
    const dateString3 = '14/02/2023';

    const parsedDate1 = DateHelper.parseReportDate(dateString1);
    const parsedDate2 = DateHelper.parseReportDate(dateString2);
    const parsedDate3 = DateHelper.parseReportDate(dateString3);

    expect(parsedDate1).toBeInstanceOf(Date);
    expect(parsedDate2).toBeInstanceOf(Date);
    expect(parsedDate3).toBeInstanceOf(Date);
  });

  it('should throw error parsing invalid date', () => {
    const incorrectDates = [
      '536542/322321/654522 765464:565465642',
      '2783261312/1/22.. 7:52',
      '2/1433/22    6:33',
      '2/13dsda/22    6:33',
      '2/13/22aaa 6:33',
      '6/332328/2022....',
      'ahdgsajhga',
      'dsad adsa sadasd',
      '02/01/2022 07:52',
      '02/01/2022 07:52:00',
      '2-1-22 7:52',
    ];

    let index = 0;

    for (const incorrectDate of incorrectDates) {
      const tryParseDate = () => DateHelper.parseReportDate(incorrectDate);

      index++;

      expect(tryParseDate).toThrow(
        `Error when parse the value "${incorrectDate}" to date`,
      );
    }

    expect(index).toBe(incorrectDates.length);
  });
});
