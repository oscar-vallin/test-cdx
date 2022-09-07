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
export const formatField = (value: any, columnId: string, text: any, sublabel: string, child: any) => ({
  id: columnId,
  value,
  columnId,
  text,
  sublabel,
  child,
});

export const isTodayInRange = (firstDate, secondDate) => {
  const _today = new Date();
  const _startDate = startOfDay(new Date(firstDate));
  const _endDate = endOfDay(new Date(secondDate));

  if (firstDate && secondDate) {
    if (firstDate <= secondDate) {
      return isWithinInterval(_today, { start: new Date(_startDate), end: new Date(_endDate) });
    }
    return false;
  }
  return false;
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

  switch (date) {
    case 'today':
      if (hour < 9) return subDays(_newDate, 1);

      return startOfDay(_newDate);

    case 'yesterday':
      return startOfYesterday();

    case 'thisMonth':
      return startOfMonth(_newDate);

    case 'lastMonth':
      return startOfMonth(subMonths(_newDate, 1));

    default:
      return startOfDay(_newDate);
  }
};

export const getEndDay = (date) => {
  const _newDate = new Date();
  const hour = getHours(_newDate);

  switch (date) {
    case 'today':
      if (hour < 9) return endOfDay(_newDate);

      return addDays(_newDate, 1);

    case 'yesterday':
      return endOfYesterday();

    case 'thisMonth':
      return endOfMonth(_newDate);

    case 'lastMonth':
      return endOfMonth(subMonths(_newDate, 1));

    default:
      return endOfDay(_newDate);
  }
};

export const getDates = (date) => {
  const _newDate = new Date();
  let startDate: any = '';
  let endDate: any = '';

  switch (date) {
    case 'today':
      startDate = startOfDay(_newDate);
      endDate = startOfDay(_newDate);
      break;
    case 'yesterday':
      startDate = startOfYesterday();
      endDate = endOfYesterday();
      break;
    case 'thisMonth':
      startDate = startOfMonth(_newDate);
      endDate = endOfMonth(_newDate);
      break;
    case 'lastMonth':
      startDate = startOfMonth(subMonths(_newDate, 1));
      endDate = endOfMonth(subMonths(_newDate, 1));
      break;

    default:
      startDate = startOfDay(_newDate);
      endDate = startOfDay(_newDate);
      break;
  }

  return {
    startDate,
    endDate,
  };
};
