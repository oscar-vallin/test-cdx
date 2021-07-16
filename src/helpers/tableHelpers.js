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
