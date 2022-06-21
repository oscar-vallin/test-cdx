import { useState, useEffect } from 'react';
import { ScheduleOccurrence, useScheduleOccurrencesQuery } from 'src/data/services/graphql';
import { ErrorHandler } from 'src/utils/ErrorHandler';

//
export const useScheduleItems = (argOrgSid, argDateRange) => {
  const [items, setItems] = useState<ScheduleOccurrence[]>([]);
  const handleError = ErrorHandler();

  const { data, loading, error } = useScheduleOccurrencesQuery({
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
    if (!loading && data) {
      setItems(data?.scheduleOccurrences?.nodes ?? []);
    }

    return () => {
      setItems([]);
    };
  }, [data, loading]);

  return {
    items,
    error,
  };
};
