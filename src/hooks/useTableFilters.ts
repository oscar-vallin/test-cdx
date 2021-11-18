import { getHours, subDays, format, addDays, isValid } from 'date-fns';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDateValue } from './useDateValue';
import { useDelayedInputValue } from './useInputValue';
import { useQueryParams } from './useQueryParams';
import { useOrgSid } from './useOrgSid';

//
export const useTableFilters = (searchTextPlaceholder) => {
  const QueryParams = useQueryParams();
  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const { orgSid } = useOrgSid();

  const hour = getHours(new Date());

  const defaultStartDate = hour < 9 ? subDays(new Date(), 1) : new Date();
  const defaultEndDate = hour < 9 ? new Date() : addDays(new Date(), 1);

  const deriveStartDate = (): Date => {
    const startDateParam = urlParams.get('startDate');
    const startDate = startDateParam == null ? defaultStartDate : new Date(startDateParam);
    if (isValid(startDate)) {
      return startDate;
    }
    return defaultStartDate;
  };
  const deriveEndDate = (): Date => {
    const endDateParam = urlParams.get('endDate');
    const endDate = endDateParam == null ? defaultEndDate : new Date(endDateParam);
    if (isValid(endDate)) {
      return endDate;
    }
    return defaultEndDate;
  };

  const startDate = useDateValue('Start Date...', deriveStartDate());
  const endDate = useDateValue('End Date...', deriveEndDate());

  const searchText = useDelayedInputValue('', searchTextPlaceholder, urlParams.get('filter'), '');

  const _addParamIfExists = (key, value) => (key ? { [key]: value } : {});

  const _pushQueryString = () => {
    const startDateToFormat = isValid(startDate.value) ? startDate.value : defaultStartDate;
    const endDateToFormat = isValid(endDate.value) ? endDate.value : defaultEndDate;

    const xParams = {
      ..._addParamIfExists('orgSid', orgSid),
      ..._addParamIfExists('filter', searchText.value),
      ..._addParamIfExists('startDate', format(startDateToFormat, 'yyyy-MM-dd')),
      ..._addParamIfExists('endDate', format(endDateToFormat, 'yyyy-MM-dd')),
    };

    location.search = QueryParams.stringify(xParams);

    history.replace(QueryParams.merge(location, xParams));
  };

  useEffect(() => {
    _pushQueryString();
  }, [searchText.delayedValue, startDate.value, endDate.value]);

  return { searchText, startDate, endDate };
};
