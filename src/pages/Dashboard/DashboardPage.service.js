import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

import { useDashboardPeriodsQuery } from '../../data/services/graphql';

export const DATE_OPTION_NAME = {
  today: 'today',
  yesterday: 'yesterday',
  thisMonth: 'thisMonth',
  lastMonth: 'lastMonth',
};

const DATES_OPTIONS = [
  { id: DATE_OPTION_NAME.today, name: 'Today', selected: true },
  { id: DATE_OPTION_NAME.yesterday, name: 'Yesterday', selected: false },
  { id: DATE_OPTION_NAME.thisMonth, name: 'Month', selected: false },
  { id: DATE_OPTION_NAME.lastMonth, name: 'Last Month', selected: false },
];

const isToday = (id) => id === DATE_OPTION_NAME.today;
const isYesterday = (id) => id === DATE_OPTION_NAME.yesterday;
const isThisMonth = (id) => id === DATE_OPTION_NAME.thisMonth;
const isLastMonth = (id) => id === DATE_OPTION_NAME.lastMonth;

export const useDashboardService = (initOrgSid) => {
  const [orgSid, setOrgSid] = useState(initOrgSid);
  const [dateId, setDateId] = useState(DATE_OPTION_NAME.today);
  const [datesOptions, setDateOptions] = useState(DATES_OPTIONS);
  const [dataCounters, setDataCounters] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const { data, loading, error } = useDashboardPeriodsQuery({
    variables: {
      orgSid,
    },
  });

  const { authLogout } = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    if (error) {
      console.log('ORROR: ', error.message);

      authLogout(error.message);
      history.push('/');
    }
  }, [error]);

  // * Set Data Counters.
  const getData = () => {
    if (!datesOptions || !data?.dashboardPeriods) return;

    const { dailyCounts, yesterdayCounts, monthlyCounts, lastMonthlyCounts } = data.dashboardPeriods;

    return isToday(dateId)
      ? dailyCounts
      : isYesterday(dateId)
      ? yesterdayCounts
      : isThisMonth(dateId)
      ? monthlyCounts
      : isLastMonth(dateId)
      ? lastMonthlyCounts
      : dailyCounts;
  };

  // * Get options by ID
  const getOption = (id) => {
    return datesOptions.find((option) => option.id === id) ?? DATES_OPTIONS[0];
  };

  console.log('data blabla', datesOptions);

  // * Component Did Mount
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // * Loading Data
  useEffect(() => {
    setIsLoadingData(loading);
  }, [loading]);

  // * When Data changes then fill the Data Object to Show.
  useEffect(() => {
    if (data) setIsLoadingData(false);

    setDataCounters(getData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  //* When Change Date Id, then update Work-Data-Counters Object.
  useEffect(() => {
    setIsLoadingData(true);
    // Get Change Selected Options.
    setDateOptions(
      DATES_OPTIONS.map((option) => {
        return { ...option, selected: option.id === dateId };
      })
    );

    setDataCounters(getData()); // Set Work Data Counters Object.
    setIsLoadingData(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateId]);

  return {
    isLoading,
    isLoadingData,
    orgSid,
    loading,
    error,
    datesOptions,
    dataCounters,
    getOption,
    setOrgSid,
    setDateId,
    dateId,
  };
};
