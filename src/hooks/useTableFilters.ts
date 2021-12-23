import { getHours, subDays, format, addDays, isValid } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { DateState, useDateValue } from './useDateValue';
import { DelayedInput, useDelayedInputValue } from './useInputValue';
import { useQueryParams } from './useQueryParams';
import { useOrgSid } from './useOrgSid';
import { Maybe, PageableInput, SortDirection, SortOrderInput } from '../data/services/graphql';

export type TableFiltersType = {
  searchText: DelayedInput;
  startDate: DateState;
  endDate: DateState;
  pagingParams: PageableInput;
  setPagingParams: React.Dispatch<any>;
};

/**
 * Convert the given table filters into a query string to be
 * sent into a GET request. This was built to craft a URL to an Excel Download link
 * @param filters Table Filters
 */
export const tableFiltersToQueryParams = (filters: TableFiltersType): string => {
  const dateFormat = "yyyy-MM-dd'T'hh:mm:ss";

  const sortToString = (sort: Maybe<Array<Maybe<SortOrderInput>>>): string | null => {
    if (!sort) {
      return null;
    }
    let sortString = '';
    sort.forEach((value) => {
      if (value?.direction == SortDirection.Asc) {
        if (sortString.length > 0) {
          sortString += ',';
        }
        sortString += `asc(${value.property})`;
      } else if (value?.direction == SortDirection.Desc) {
        if (sortString.length > 0) {
          sortString += ',';
        }
        sortString += `desc(${value.property})`;
      }
    });
    return sortString;
  };

  const toUTC = (date: Date): Date => {
    const ts = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
    return new Date(ts);
  };

  // Convert to UTC. The backend assumes a UTC Date
  const rangeStart = format(toUTC(filters.startDate.value), dateFormat);
  const rangeEnd = format(toUTC(filters.endDate.value), dateFormat);
  const searchText = filters.searchText.delayedValue;
  const sort = sortToString(filters.pagingParams.sort ?? null);

  return `&searchText=${searchText}&rangeStart=${rangeStart}&rangeEnd=${rangeEnd}&sort=${sort}`;
};

//
export const useTableFilters = (searchTextPlaceholder: string, defaultSort?: SortOrderInput[]): TableFiltersType => {
  const QueryParams = useQueryParams();
  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const { orgSid } = useOrgSid();

  const hour = getHours(new Date());

  const defaultStartDate = hour < 9 ? subDays(new Date(), 1) : new Date();
  const defaultEndDate = hour < 9 ? new Date() : addDays(new Date(), 1);
  const [pagingParams, setPagingParams] = useState<PageableInput>({
    pageNumber: 0,
    pageSize: 100,
    sort: defaultSort,
  });

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

  const searchText = useDelayedInputValue('', searchTextPlaceholder, urlParams.get('filter') || '', '');

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

  return { searchText, startDate, endDate, pagingParams, setPagingParams };
};
