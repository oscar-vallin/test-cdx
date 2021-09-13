import { getHours, subDays, format, addDays } from 'date-fns';
import { useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDateValue } from './useDateValue';
import { useInputValue } from './useInputValue';
import { useQueryParams } from './useQueryParams';

//
export const useTableFilters = (placeholder) => {
  const QueryParams = useQueryParams();
  const data = useStoreState(({ QueryParamStore }) => QueryParamStore.data);

  const history = useHistory();
  const location = useLocation();

  const hour = getHours(new Date());
  const startDate = useDateValue('Start Date...', hour < 9 ? subDays(new Date(), 1) : new Date());
  const endDate = useDateValue('End Date...', hour < 9 ? new Date() : addDays(new Date(), 1));
  const localInput = useInputValue('', placeholder, '', '');

  const [urlParams] = useState(QueryParams.parse(location.search));

  const setDates = () => {
    if (urlParams.filter) {
      localInput.setValue(urlParams.filter);
    }

    if (urlParams.startDate) {
      startDate.setValue(new Date(urlParams.startDate));
    }

    if (urlParams.endDate) {
      endDate.setValue(new Date(urlParams.endDate));
    }

    return () => null;
  };

  if (urlParams?.filter) {
    localInput.setValue(urlParams.filter);
  }

  const addParamIfExists = (key, value) => (key ? { [key]: value } : {});

  const pushQueryString = () => {
    const params = {
      ...addParamIfExists('filter', localInput.value),
      ...addParamIfExists('startDate', format(startDate.value, 'yyyy-MM-dd')),
      ...addParamIfExists('endDate', format(endDate.value, 'yyyy-MM-dd')),
    };

    location.search = QueryParams.stringify(params);

    history.replace(QueryParams.merge(location, params));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(setDates, []);

  useEffect(() => {
    pushQueryString();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localInput.value, startDate.value, endDate.value, data.orgSid]);

  return {
    localInput,
    startDate,
    endDate,
  };
};
