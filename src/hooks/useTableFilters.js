import { useInputValue } from './useInputValue';
import { useDateValue } from './useDateValue';
import { getHours, subDays, format, addDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import queryString from 'query-string';

//
export const useTableFilters = (placeholder, id) => {
  const startDate = useDateValue('Start Date...', '');
  const endDate = useDateValue('End Date...', '');
  const localInput = useInputValue('', placeholder, '', '');
  const history = useHistory();
  const location = useLocation();
  const [urlParams, _setUrlParams] = useState(queryString.parse(location.search));
  const { authData } = useAuthContext();

  const selectDate = (date) => {
    const _startDay = getStartDay(date);
    const _endDay = getEndDay(date);

    startDate.setValue(_startDay);
    endDate.setValue(_endDay);
  };

  const pushQueryString = () => {
    let finalURL = '';
    const formatDatesURL = 'yyyy-MM-dd';

    // //console.log('pushQueryString, localInput.value = ', localInput.value);
    // //console.log('pushQueryString, startDate.value = ', startDate.value);
    // //console.log('pushQueryString, endDate.value = ', endDate.value);

    if (urlParams?.orgSid || authData?.orgId) {
      finalURL += `?orgSid=${urlParams.orgSid || authData?.orgId}`;
    }

    if (localInput.value || startDate.value || endDate.value) {
      finalURL += '&';
    } else return;

    if (localInput.value) finalURL += `${localInput.value ? 'filter=' + localInput.value : ''}`;

    if (urlParams.startDate && urlParams.endDate) {
      const startFormatted = urlParams.startDate;
      const endFormatted = urlParams.endDate;

      finalURL = generateFinalUrl(finalURL, startFormatted, endFormatted);
      return history.push(finalURL);
    }

    if (startDate.value || endDate.value) {
      const startFormatted = format(startDate.value, formatDatesURL);
      const endFormatted = format(endDate.value, formatDatesURL);
      finalURL = generateFinalUrl(finalURL, startFormatted, endFormatted);
    }

    history.push(finalURL);
  };

  const generateFinalUrl = (finalURL, startFormatted, endFormatted) => {
    if (localInput.value) finalURL += '&';

    if (startDate.value) finalURL += `${startFormatted ? 'startDate=' + startFormatted : ''}`;

    if (endDate.value) {
      if (startDate.value) finalURL += '&';
      else {
        finalURL += `${startFormatted ? 'startDate=' + startFormatted : ''}`;
      }

      finalURL += `${endFormatted ? 'endDate=' + endFormatted : ''}`;
    }
    return finalURL;
  };

  useEffect(() => {
    const hour = getHours(new Date());

    //console.log('urlParams.filter? ', urlParams.filter);
    if (urlParams?.filter) {
      localInput.setValue(urlParams.filter);
    }

    if (id && Object.is(id) && !id.isEmpty()) {
      selectDate(params[1]);
    } else {
      if (hour < 9) {
        startDate.setValue(subDays(new Date(), 1));
        endDate.setValue(new Date());
      } else {
        startDate.setValue(new Date());
        endDate.setValue(addDays(new Date(), 1));
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
  }, [localInput.value, startDate.value, endDate.value, urlParams.orgSid]);

  return {
    localInput,
    startDate,
    endDate,
    selectDate,
  };
};
