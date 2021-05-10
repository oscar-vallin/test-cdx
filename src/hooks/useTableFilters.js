import { useInputValue } from './useInputValue';

//
export const useTableFilters = (placeholder) => {
  const startDate = useInputValue('', 'Start Date...', '', '');
  const endDate = useInputValue('', 'End Date...', '', '');
  const localInput = useInputValue('', placeholder, '', '');

  return {
    localInput,
    startDate,
    endDate,
  };
};
