import { useInputValue } from './useInputValue';
import { useDateValue } from './useDateValue';
import { getHours, subDays } from 'date-fns';
import { useEffect } from 'react';

//
export const useTableFilters = (placeholder, id) => {
  const startDate = useDateValue('Start Date...', '');
  const endDate = useDateValue('End Date...', '');
  const localInput = useInputValue('', placeholder, '', '');

  const selectDate = (date) => {
    const _startDay = getStartDay(date);
    const _endDay = getEndDay(date);

    startDate.setValue(_startDay);
    endDate.setValue(_endDay);
  };

  useEffect(() => {
    const hour = getHours(new Date());

    if (id && Object.is(id) && !id.isEmpty()) {
      localInput.setValue(params[0]);
      selectDate(params[1]);
    } else {
      if (hour < 9) {
        startDate.setValue(subDays(new Date(), 1));
        endDate.setValue(subDays(new Date(), 1));
      } else {
        startDate.setValue(new Date());
        endDate.setValue(new Date());
      }
    }
  }, []);

  return {
    localInput,
    startDate,
    endDate,
    selectDate,
  };
};
