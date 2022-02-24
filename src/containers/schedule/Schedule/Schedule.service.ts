import { useState, useEffect } from 'react';
import { ScheduleOccurrence, useScheduleOccurrencesQuery } from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';

//
export const useScheduleItems = (argOrgSid, argDateRange) => {
  const [items, setItems] = useState<ScheduleOccurrence[]>([]);
  const handleError = ErrorHandler();

  const { data, error } = useScheduleOccurrencesQuery({
    variables: {
      orgSid: argOrgSid,
      dateRange: {
        rangeStart: argDateRange.rangeStart,
        rangeEnd: argDateRange.rangeEnd,
      },
    },
  });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    const doEffect = () => {
      const _items = data?.scheduleOccurrences?.nodes ?? [];

      setItems(_items);
    };

    if (data) {
      doEffect();
    }
  }, [data]);

  return {
    items,
    error,
  };
};

const useInput = (placeholder) => {
  const [value, setValue] = useState();
  const onChange = (e) => {
    setValue(e);
  };

  return {
    value,
    onChange,
    placeholder,
  };
};

//
export const useInputs = () => {
  const startDate = useInput('Start Date...');
  const endDate = useInput('End Date...');

  return {
    startDate,
    endDate,
  };
};
