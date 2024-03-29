import {
  getHours, format, isValid, startOfYesterday, startOfToday, endOfToday, endOfTomorrow,
} from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { yyyyMMdd } from 'src/utils/CDXUtils';
import { DateState, useDateValue, useEndDateValue } from './useDateValue';
import { DelayedInput, useDelayedInputValue, useDelayedDropdownValue } from './useInputValue';
import { useQueryParams } from './useQueryParams';
import { useOrgSid } from './useOrgSid';
import {
  Maybe, PageableInput, SortDirection, SortOrderInput,
} from '../data/services/graphql';

export type TableFiltersType = {
  searchText: DelayedInput;
  eventType?: DelayedInput;
  startDate: DateState;
  endDate: DateState;
  pagingParams: PageableInput;
  setPagingParams: React.Dispatch<any>;
  userSid?: DelayedInput;
  changedByUserSid?: DelayedInput;
  additionalFilters: any;
  setFilter: (key: string, value?: any) => void;
};

export const toUTC = (date: Date): Date => {
  const ts = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
  const newTS = new Date(ts);
  return new Date(newTS.toLocaleString('en-US', { timeZone: 'UTC' }));
};

/**
 * Convert the given table filters into a query string to be
 * sent into a GET request. This was built to craft a URL to an Excel Download link
 * @param filters Table Filters
 */
export const tableFiltersToQueryParams = (filters: TableFiltersType): string => {
  const dateFormat = "yyyy-MM-dd'T'HH:mm:ss";

  const sortToString = (sort: Maybe<Array<Maybe<SortOrderInput>>>): string | null => {
    if (!sort) {
      return null;
    }
    let sortString = '';
    sort.forEach((value) => {
      if (value?.direction === SortDirection.Asc) {
        if (sortString.length > 0) {
          sortString += ',';
        }
        sortString += `asc(${value.property})`;
      } else if (value?.direction === SortDirection.Desc) {
        if (sortString.length > 0) {
          sortString += ',';
        }
        sortString += `desc(${value.property})`;
      }
    });
    return sortString;
  };

  // Convert to UTC. The backend assumes a UTC Date
  const rangeStart = format(toUTC(filters.startDate.value), dateFormat);
  const rangeEnd = format(toUTC(filters.endDate.value), dateFormat);
  const searchText = filters.searchText.delayedValue;
  const events = filters.eventType?.delayedValue;
  const sort = sortToString(filters.pagingParams.sort ?? null);

  return `&searchText=${searchText}&rangeStart=${rangeStart}&rangeEnd=${rangeEnd}&events=${events}&sort=${sort}`;
};

//
export const useTableFilters = (
  searchTextPlaceholder: string,
  defaultSort?: SortOrderInput[],
  preFilters?: any,
): TableFiltersType => {
  const QueryParams = useQueryParams();
  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const { orgSid } = useOrgSid();

  // See Ticket #228 to see the date defaulting logic
  const now = new Date();
  const hour = getHours(now);
  const defaultStartDate = hour < 9 ? startOfYesterday() : startOfToday();
  const defaultEndDate = hour < 21 ? endOfToday() : endOfTomorrow();

  const [pagingParams, setPagingParams] = useState<PageableInput>({
    pageNumber: 0,
    pageSize: 100,
    sort: defaultSort,
  });

  const deriveStartDate = (): Date => {
    const startDateParam = urlParams.get('startDate');
    const startDate = startDateParam == null ? defaultStartDate : new Date(`${startDateParam}T00:00:00`);
    if (isValid(startDate)) {
      return startDate;
    }
    return defaultStartDate;
  };
  const deriveEndDate = (): Date => {
    const endDateParam = urlParams.get('endDate');
    const endDate = endDateParam == null ? defaultEndDate : new Date(`${endDateParam}T23:59:59`);
    if (isValid(endDate)) {
      return endDate;
    }
    return defaultEndDate;
  };

  const startDate = useDateValue('Start Date...', deriveStartDate());
  const endDate = useEndDateValue('End Date...', deriveEndDate());

  const searchText = useDelayedInputValue('', searchTextPlaceholder, urlParams.get('filter') || '', '');
  const eventType = useDelayedDropdownValue('Event', '', urlParams.get('eventType') || '', '');
  const userSid = useDelayedInputValue('', '', urlParams.get('userSid') || '', '');
  const changedByUserSid = useDelayedInputValue('', '', urlParams.get('changedByUserSid') || '', '');
  const [additionalFilters, setAdditionalFilters] = useState(preFilters ?? {});

  const cloneFilters = (filters) => {
    const clone = {};
    Object.keys(filters).forEach((k) => {
      clone[k] = filters[k];
    });
    return clone;
  };

  const setFilter = (key: string, value?: any) => {
    additionalFilters[key] = value;
    const clone = cloneFilters(additionalFilters);
    setAdditionalFilters(clone);
  };

  const _addParamIfExists = (key, value) => (value ? { [key]: value } : {});

  const _pushQueryString = () => {
    const startDateToFormat = isValid(startDate.value) ? startDate.value : defaultStartDate;
    const endDateToFormat = isValid(endDate.value) ? endDate.value : defaultEndDate;

    const xParams = {
      ..._addParamIfExists('orgSid', orgSid),
      ..._addParamIfExists('filter', searchText.value),
      ..._addParamIfExists('startDate', yyyyMMdd(startDateToFormat)),
      ..._addParamIfExists('endDate', yyyyMMdd(endDateToFormat)),
      ..._addParamIfExists('eventType', eventType.value),
      ..._addParamIfExists('userSid', userSid.value),
      ..._addParamIfExists('changedByUserSid', changedByUserSid.value),
    };

    // location.search = QueryParams.stringify(xParams);

    history.replace(QueryParams.merge(location, xParams));
  };

  useEffect(() => {
    _pushQueryString();
  }, [
    searchText.delayedValue,
    startDate.value,
    endDate.value,
    userSid.delayedValue,
    eventType.delayedValue,
    changedByUserSid.delayedValue,
  ]);

  return {
    searchText,
    startDate,
    endDate,
    pagingParams,
    setPagingParams,
    eventType,
    userSid,
    changedByUserSid,
    additionalFilters,
    setFilter,
  };
};
