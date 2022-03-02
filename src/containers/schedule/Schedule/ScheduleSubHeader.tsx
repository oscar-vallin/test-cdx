import { useState, useEffect, ReactElement } from 'react';
import { addDays, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek } from 'date-fns';

import { Text } from 'src/components/typography';
import {
  DayOfWeek,
  WeekViewContainer,
  WeekViewNumber,
  WeekViewDayName,
  RowWeek,
  DayViewContainer,
  WeekHourSpace,
  SubHeaderRow,
} from './ScheduleSubHeader.styles';
import { isCurrentViewDay, isCurrentViewWeek } from './helpers';

type ScheduleSubHeaderType = {
  id: string;
  currentView: string;
  currentDate: Date;
  selectedDate: Date;
  onChangeDate: (d: Date) => void;
  onChangeView: (viewName: string) => void;
};

export const ScheduleSubHeader = ({
  id,
  currentView,
  currentDate,
  selectedDate,
  onChangeDate,
  onChangeView,
}: ScheduleSubHeaderType) => {
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

  const clickWeekHeader = (d: Date) => {
    //console.log(d);
    onChangeDate(d);
    onChangeView('day');
  };

  const _renderSubHeader = () => {
    const dateFormat = 'EEEE';
    const days: ReactElement[] = [];
    const _currentDay = selectedDate ?? currentDate;

    if (isCurrentViewDay(currentView)) {
      const isCurrentDate = isSameDay(_currentDay, selectedDate);
      const isCurrentMonth = isSameMonth(_currentDay, selectedDate);
      const isStartMonth = isSameDay(_currentDay, startOfMonth(_currentDay));
      const isEndMonth = isSameDay(_currentDay, endOfMonth(_currentDay));

      return (
        <RowWeek id={id} key={id}>
          <DayViewContainer key={_currentDay?.toDateString()} isSameDay={isCurrentDate} isSameMonth={isCurrentMonth}>
            <WeekViewNumber>
              {isCurrentDate || isStartMonth || isEndMonth ? format(_currentDay, 'MMM d') : format(_currentDay, 'd')}
            </WeekViewNumber>
            <WeekViewDayName isSameMonth={isCurrentMonth}>{format(_currentDay, 'EEE')}</WeekViewDayName>
          </DayViewContainer>
        </RowWeek>
      );
    }

    if (isCurrentViewWeek(currentView)) {
      days.push(<WeekHourSpace key="spacer" />);
    }

    for (let i = 0; i < 7; i++) {
      const day = addDays(dates.startDate, i);

      if (isCurrentViewWeek(currentView)) {
        const isCurrentDate = isSameDay(day, selectedDate);
        // isSameMonth(day, dates.monthStart);
        const isCurrentMonth = isSameMonth(day, selectedDate);
        const isStartMonth = isSameDay(day, startOfMonth(_currentDate));
        const isEndMonth = isSameDay(day, endOfMonth(dates.selectedDate));

        days.push(
          <WeekViewContainer
            key={`day_${i}`}
            isSameDay={isCurrentDate}
            isSameMonth={isCurrentMonth}
            onClick={() => clickWeekHeader(day)}
          >
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
    }

    if (isCurrentViewWeek(currentView)) {
      return <RowWeek id={id}>{days}</RowWeek>;
    }
    return <SubHeaderRow id={id}>{days}</SubHeaderRow>;
  };

  return <>{_renderSubHeader()}</>;
};

export default ScheduleSubHeader;
