import {
  isToday,
  isYesterday,
  getHours,
  startOfDay,
  endOfDay,
  startOfYesterday,
  startOfMonth,
  endOfMonth,
  endOfYesterday,
  subMonths,
  subDays,
  addDays,
  isTomorrow,
  isWithinInterval,
} from 'date-fns';

//
export const formatField = (value, columnId, text, sublabel, child) => {
  return {
    id: columnId,
    value,
    columnId,
    text,
    sublabel,
    child,
  };
};

export const isTodayInRange = (firstDate, secondDate) => {
  const _today = new Date();
  const _startDate = startOfDay(new Date(firstDate));
  const _endDate = endOfDay(new Date(secondDate));

  if (firstDate && secondDate) {
    return isWithinInterval(_today, { start: new Date(_startDate), end: new Date(_endDate) });
  } else {
    return false;
  }
};

export const isCDXToday = (firstDate, secondDate) => {
  const _startDate = startOfDay(new Date(firstDate));
  const _endDate = endOfDay(new Date(secondDate));
  const hour = getHours(new Date());

  if (hour < 9) {
    if (isYesterday(new Date(_startDate)) && isToday(new Date(_endDate))) {
      return true;
    }
  }

  if (isToday(new Date(_startDate)) && isTomorrow(new Date(_endDate))) {
    return true;
  }

  return false;
};

export const getStartDay = (date) => {
  const _newDate = new Date();
  const hour = getHours(_newDate);

  return date === 'today'
    ? hour < 9
      ? subDays(_newDate, 1)
      : startOfDay(_newDate)
    : date === 'yesterday'
    ? startOfYesterday(_newDate)
    : date === 'thisMonth'
    ? startOfMonth(_newDate)
    : date === 'lastMonth'
    ? startOfMonth(subMonths(_newDate, 1))
    : startOfDay(_newDate);
};

export const getEndDay = (date) => {
  const _newDate = new Date();
  const hour = getHours(_newDate);

  return date === 'today'
    ? hour < 9
      ? endOfDay(_newDate)
      : addDays(_newDate, 1)
    : date === 'yesterday'
    ? endOfYesterday(_newDate)
    : date === 'thisMonth'
    ? endOfMonth(_newDate)
    : date === 'lastMonth'
    ? endOfMonth(subMonths(_newDate, 1))
    : endOfDay(_newDate);
};

export const getDates = (date) => {
  const _newDate = new Date();
  let startDate = '';
  let endDate = '';

  switch (date) {
    case 'today':
      startDate = startOfDay(_newDate);
      endDate = startOfDay(_newDate);
      break;
    case 'yesterday':
      startDate = startOfYesterday(_newDate);
      endDate = endOfYesterday(_newDate);
      break;
    case 'thisMonth':
      startDate = startOfMonth(_newDate);
      endDate = endOfMonth(_newDate);
      break;
    case 'lastMonth':
      startDate = startOfMonth(subMonths(_newDate, 1));
      endDate = endOfMonth(subMonths(_newDate, 1));
      break;
  }

  return {
    startDate,
    endDate,
  };
};
