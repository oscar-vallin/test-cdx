import { useState, useEffect, ReactElement } from 'react';
import { addDays, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek } from 'date-fns';

import { Text } from 'src/components/typography';
import {
  Row,
  DayOfWeek,
  WeekViewContainer,
  WeekViewNumber,
  WeekViewDayName,
  RowWeek,
  DayViewContainer,
  WeekHourSpace,
} from './ScheduleSubHeader.styles';
import { isCurrentViewDay, isCurrentViewWeek } from './helpers';

export const ScheduleSubHeader = ({ id, currentView, currentDate, selectedDate }) => {
  const _currentDate = startOfWeek(currentDate);
  const [dates, setDates] = useState({
    currentMonth: currentDate,
    selectedDate: currentDate,
    monthStart: startOfMonth(currentDate),
    monthEnd: endOfMonth(currentDate),
    startDate: startOfWeek(startOfMonth(currentDate)),
    endDate: endOfWeek(endOfMonth(currentDate)),
  });

  useEffect(() => {
    if (!!selectedDate && selectedDate !== dates.selectedDate) {
      const _monthStart = startOfWeek(selectedDate);
      const _monthEnd = endOfWeek(selectedDate);
      const _newDate = {
        currentMonth: selectedDate,
        selectedDate,
        monthStart: _monthStart,
        monthEnd: _monthEnd,
        startDate: startOfWeek(_monthStart),
        endDate: endOfWeek(_monthEnd),
      };

      setDates(_newDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const _renderSubHeader = () => {
    const dateFormat = 'EEEE';
    const days: ReactElement[] = [];
    let day = dates.startDate;
    const _currentDay = selectedDate ?? currentDate;

    if (isCurrentViewDay(currentView)) {
      const isCurrentDate = isSameDay(_currentDay, currentDate);
      const isCurrentMonth = isSameMonth(_currentDay, currentDate);
      const isStartMonth = isSameDay(_currentDay, startOfMonth(_currentDay));
      const isEndMonth = isSameDay(_currentDay, endOfMonth(_currentDay));

      return (
        <RowWeek id={id} key={id}>
          <DayViewContainer key={_currentDay} isSameDay={isCurrentDate} isSameMonth={isCurrentMonth}>
            <WeekViewNumber>
              {isCurrentDate || isStartMonth || isEndMonth ? format(_currentDay, 'MMM d') : format(_currentDay, 'd')}
            </WeekViewNumber>
            <WeekViewDayName isSameMonth={isCurrentMonth}>{format(_currentDay, 'EEE')}</WeekViewDayName>
          </DayViewContainer>
        </RowWeek>
      );
    }

    if (isCurrentViewWeek(currentView)) {
      days.push(<WeekHourSpace />);
    }

    for (let i = 0; i < 7; i++) {
      if (isCurrentViewWeek(currentView)) {
        const isCurrentDate = isSameDay(day, currentDate);
        // isSameMonth(day, dates.monthStart);
        const isCurrentMonth = isSameMonth(day, currentDate);
        const isStartMonth = isSameDay(day, startOfMonth(_currentDate));
        const isEndMonth = isSameDay(day, endOfMonth(dates.selectedDate));

        days.push(
          <WeekViewContainer key={`day_${i}`} isSameDay={isCurrentDate} isSameMonth={isCurrentMonth}>
            <WeekViewNumber>
              {isCurrentDate || isStartMonth || isEndMonth ? format(day, 'MMM d') : format(day, 'd')}
            </WeekViewNumber>
            <WeekViewDayName isSameMonth={isCurrentMonth}>{format(day, 'EEE')}</WeekViewDayName>
          </WeekViewContainer>
        );
      } else {
        days.push(
          <DayOfWeek key={`day_${i}`}>
            <Text size="small">{format(day, dateFormat)}</Text>
          </DayOfWeek>
        );
      }

      day = addDays(day, 1);
    }

    if (isCurrentViewWeek(currentView)) {
      return <RowWeek>{days}</RowWeek>;
    }
    return <Row>{days}</Row>;
  };

  return <>{_renderSubHeader()}</>;
};

export default ScheduleSubHeader;
