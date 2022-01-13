import { useState, useEffect } from 'react';

import {
  DashboardPeriodCounts,
  useDashboardPeriodsLazyQuery,
  useDashboardPeriodCountsLazyQuery,
} from 'src/data/services/graphql';

export const DATE_OPTION_NAME = {
  today: 'today',
  yesterday: 'yesterday',
  thisMonth: 'thisMonth',
  lastMonth: 'lastMonth',
  custom: 'custom',
};

const DATES_OPTIONS = [
  { id: DATE_OPTION_NAME.today, name: 'Today', selected: true },
  { id: DATE_OPTION_NAME.yesterday, name: 'Yesterday', selected: false },
  { id: DATE_OPTION_NAME.thisMonth, name: 'Month', selected: false },
  { id: DATE_OPTION_NAME.lastMonth, name: 'Last Month', selected: false },
  { id: DATE_OPTION_NAME.custom, name: 'Custom', selected: false },
];

const isToday = (id) => id === DATE_OPTION_NAME.today;
const isYesterday = (id) => id === DATE_OPTION_NAME.yesterday;
const isThisMonth = (id) => id === DATE_OPTION_NAME.thisMonth;
const isLastMonth = (id) => id === DATE_OPTION_NAME.lastMonth;
const isCustom = (id) => id === DATE_OPTION_NAME.custom;

export const useDashboardService = (orgSid: string) => {

  const [dateId, setDateId] = useState(DATE_OPTION_NAME.today);
  const [datesOptions, setDateOptions] = useState(DATES_OPTIONS);
  const [dataCounters, setDataCounters] = useState<DashboardPeriodCounts | null | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [apiDashboardPeriodsQuery, { data, loading, error }] = useDashboardPeriodsLazyQuery();
  const [customPeriodQuery, { data: period }] =
    useDashboardPeriodCountsLazyQuery();

  useEffect(() => {
    if (orgSid) {
      apiDashboardPeriodsQuery({
        variables: {
          orgSid: orgSid,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgSid]);

  useEffect(() => {
    if (error) {
      // authLogout();
      // history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // * Set Data Counters.
  const getData = () => {
    if (!datesOptions || !(isCustom(dateId) ? period?.dashboardPeriodCounts : data?.dashboardPeriods)) return null;

    if (isCustom(dateId)) {
      return period?.dashboardPeriodCounts;
    }

    const { dailyCounts, yesterdayCounts, monthlyCounts, lastMonthlyCounts } = data?.dashboardPeriods || {};

    if (isToday(dateId)) {
      return dailyCounts;
    }

    if (isYesterday(dateId)) return yesterdayCounts;

    if (isThisMonth(dateId)) return monthlyCounts;

    if (isLastMonth(dateId)) return lastMonthlyCounts;

    return dailyCounts;
  };

  // * Get options by ID
  const getOption = (id) => {
    return datesOptions.find((option) => option.id === id) ?? DATES_OPTIONS[0];
  };

  // * Component Did Mount
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // * Loading Data
  // useEffect(() => {
  //   setIsLoadingData(loading);
  // }, [loading]);

  // * When Data changes then fill the Data Object to Show.
  useEffect(() => {
    if (data) setIsLoadingData(false);

    setDataCounters(getData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (period) setIsLoadingData(false);

    setDataCounters(getData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const getPeriodCounts = ({ startDate, endDate }) => {
    if (startDate && endDate) {
      customPeriodQuery({
        variables: {
          orgSid: orgSid,
          dateRange: {
            rangeStart: startDate,
            rangeEnd: endDate,
          },
        },
      });
    }
  };

  //* When Change Date Id, then update Work-Data-Counters Object.
  useEffect(() => {
    setIsLoadingData(true);
    // Get Change Selected Options.
    setDateOptions(
      DATES_OPTIONS.map((option) => {
        return { ...option, selected: option.id === dateId };
      })
    );

    if (dateId !== DATE_OPTION_NAME.custom) {
      setDataCounters(getData()); // Set Work Data Counters Object.
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateId]);

  return {
    isLoading,
    isLoadingData,
    loading,
    error,
    datesOptions,
    dataCounters,
    getOption,
    setDateId,
    dateId,
    getPeriodCounts,
    setIsLoadingData,
  };
};
