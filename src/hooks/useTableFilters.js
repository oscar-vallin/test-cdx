import { useInputValue } from './useInputValue';
import { useDateValue } from './useDateValue';
import { getHours, subDays, format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

//
export const useTableFilters = (placeholder, id) => {
  const startDate = useDateValue('Start Date...', '');
  const endDate = useDateValue('End Date...', '');
  const localInput = useInputValue('', placeholder, '', '');
  const history = useHistory();
  const location = useLocation();
  const [urlParams, setUrlParams] = useState(queryString.parse(location.search));

  const selectDate = (date) => {
    const _startDay = getStartDay(date);
    const _endDay = getEndDay(date);

    startDate.setValue(_startDay);
    endDate.setValue(_endDay);
  };

  const pushQueryString = () => {
    let finalURL = '';
    const formatDatesURL = 'yyyy-MM-dd';

    console.log('pushQueryString, localInput.value = ', localInput.value);
    console.log('pushQueryString, startDate.value = ', startDate.value);

    if (localInput.value || startDate.value || endDate.value) {
      finalURL += '?';
    } else return;

    if (localInput.value) finalURL += `${localInput.value ? 'filter=' + localInput.value : ''}`;

    if (startDate.value || endDate.value) {
      const startFormatted = format(startDate.value, formatDatesURL);
      const endFormatted = format(endDate.value, formatDatesURL);

      if (localInput.value) finalURL += '&';

      if (startDate.value) finalURL += `${startFormatted ? 'startDate=' + startFormatted : ''}`;

      if (endDate.value) {
        if (startDate.value) finalURL += '&';
        else {
          finalURL += `${startFormatted ? 'startDate=' + startFormatted : ''}`;
        }

        finalURL += `${endFormatted ? 'endDate=' + endFormatted : ''}`;
      }
    }

    console.log('FinalURL?', finalURL);
    history.push(finalURL);
  };

  useEffect(() => {
    const hour = getHours(new Date());

    console.log('urlParams.filter? ', urlParams.filter);
    if (urlParams?.filter) {
      localInput.setValue(urlParams.filter);
    }

    if (id && Object.is(id) && !id.isEmpty()) {
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

    return () => {
      return null;
    };
  }, []);

  useEffect(() => {
    if (location.search) {
      queryString.parse(location.search);
    }
  }, [location]);

  useEffect(() => {
    pushQueryString();
  }, [localInput.value, startDate.value]);

  return {
    localInput,
    startDate,
    endDate,
    selectDate,
  };
};
