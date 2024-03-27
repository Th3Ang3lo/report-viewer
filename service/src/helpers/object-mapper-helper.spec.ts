import { reportFields } from '../shared/constants/report.constant';

import { ObjectMapperHelper } from './object-mapper-helper';

describe('Test Object Mapper', () => {
  it('Should map old object to new format', () => {
    const newObjectValues = {
      numberOfCharges: '1',
      chargedEveryXDays: '365',
      startDate: '2/1/22 7:52',
      status: 'Ativa',
      statusDate: '2/13/22 6:33',
      cancellationDate: '',
      amount: '4750,35',
      nextCycle: '14/02/2023',
      subscriberId: 'user_10',
    };

    const oldObject = {
      'quantidade cobranças': newObjectValues.numberOfCharges,
      'cobrada a cada X dias': newObjectValues.chargedEveryXDays,
      'data início': newObjectValues.startDate,
      status: newObjectValues.status,
      'data status': newObjectValues.statusDate,
      'data cancelamento': newObjectValues.cancellationDate,
      valor: newObjectValues.amount,
      'próximo ciclo': newObjectValues.nextCycle,
      'ID assinante': newObjectValues.subscriberId,
    };

    const newObject = ObjectMapperHelper.transform(oldObject, reportFields);

    expect(newObject).toMatchObject(newObjectValues);
  });
});
