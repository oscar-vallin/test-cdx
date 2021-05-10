import React from 'react';
import PropTypes from 'prop-types';
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parse,
  set,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';

import {
  Box,
  Row,
  Column,
  Container,
  RightColumn,
  Body,
  RowHeader,
  ColumnHeader,
  RowHeaderItem,
  HeaderMonth,
  HeaderYear,
  HeaderButtonView,
  CalendarColumn,
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
  let _currentDate = startOfWeek(currentDate);
  const [dates, setDates] = React.useState({
    currentMonth: currentDate,
    selectedDate: currentDate,
    monthStart: startOfMonth(currentDate),
    monthEnd: endOfMonth(currentDate),
    startDate: startOfWeek(startOfMonth(currentDate)),
    endDate: endOfWeek(endOfMonth(currentDate)),
  });

  // let _currentDay = currentDate;

  // React.useEffect(() => {
  //   _currentDate = startOfWeek(selectedDate);
  // }, [selectedDate]);

  React.useEffect(() => {
    console.log('change the SelectedDate: ', selectedDate);
    if (!!selectedDate && selectedDate !== dates.selectedDate) {
      const _monthStart = startOfWeek(selectedDate);
      const _monthEnd = endOfWeek(selectedDate);
      const _newDate = {
        currentMonth: selectedDate,
        selectedDate: selectedDate,
        monthStart: _monthStart,
        monthEnd: _monthEnd,
        startDate: startOfWeek(_monthStart),
        endDate: endOfWeek(_monthEnd),
      };

      setDates(_newDate);
    }
  }, [selectedDate]);

  const _renderSubHeader = () => {
    const dateFormat = 'EEEE';
    const days = [];
    let day = dates.startDate;
    let _currentDay = selectedDate ?? currentDate;

    if (isCurrentViewDay(currentView)) {
      const isCurrentDate = !!isSameDay(_currentDay, currentDate);
      const isCurrentMonth = !!isSameMonth(_currentDay, currentDate);
      const isStartMonth = !!isSameDay(_currentDay, startOfMonth(_currentDay));
      const isEndMonth = !!isSameDay(_currentDay, endOfMonth(_currentDay));

      return (
        <RowWeek>
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
      const cloneDay = day;

      if (isCurrentViewWeek(currentView)) {
        const isCurrentDate = !!isSameDay(day, currentDate);
        // isSameMonth(day, dates.monthStart);
        const isCurrentMonth = !!isSameMonth(day, currentDate);
        const isStartMonth = !!isSameDay(day, startOfMonth(_currentDate));
        const isEndMonth = !!isSameDay(day, endOfMonth(dates.selectedDate));

        days.push(
          <WeekViewContainer key={i} isSameDay={isCurrentDate} isSameMonth={isCurrentMonth}>
            <WeekViewNumber>
              {isCurrentDate || isStartMonth || isEndMonth ? format(day, 'MMM d') : format(day, 'd')}
            </WeekViewNumber>
            <WeekViewDayName isSameMonth={isCurrentMonth}>{format(day, 'EEE')}</WeekViewDayName>
          </WeekViewContainer>
        );
      } else {
        days.push(<DayOfWeek key={i}>{format(day, dateFormat)}</DayOfWeek>);
      }

      day = addDays(day, 1);
    }

    if (isCurrentViewWeek(currentView)) {
      return <RowWeek>{days}</RowWeek>;
    } else {
      return <Row>{days}</Row>;
    }
  };

  return <>{_renderSubHeader()}</>;
};

ScheduleSubHeader.propTypes = {};

export default ScheduleSubHeader;
