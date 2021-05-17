import { useInputValue } from './useInputValue';
import { useDateValue } from './useDateValue';

//
export const useTableFilters = (placeholder) => {
  const startDate = useDateValue('Start Date...', '');
  const endDate = useDateValue('End Date...', '');
  const localInput = useInputValue('', placeholder, '', '');

  return {
    localInput,
    startDate,
    endDate,
  };
};
