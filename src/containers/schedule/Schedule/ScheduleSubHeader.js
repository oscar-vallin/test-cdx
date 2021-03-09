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
} from './ScheduleSubHeader.styles';
import { isCurrentViewDay, isCurrentViewWeek } from './helpers';

export const ScheduleSubHeader = ({ id, currentView, currentDate, selectedDate }) => {
  let _currentDate = startOfWeek(currentDate);
  // let _currentDay = currentDate;

  React.useEffect(() => {
    _currentDate = startOfWeek(selectedDate);
    console.log('New Current Date: selectedDate: ', selectedDate);
    console.log('New Current Date: _currentDate: ', _currentDate);
  }, [selectedDate]);

  const _renderSubHeader = () => {
    const dateFormat = 'EEEE';
    const days = [];
    let _currentDay = selectedDate ?? currentDate;

    console.log('_renderSubHeader, currentDate: ', currentDate);
    console.log('_renderSubHeader, selectedDate: ', selectedDate);

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

    for (let i = 0; i < 7; i++) {
      if (isCurrentViewWeek(currentView)) {
        const isCurrentDate = !!isSameDay(_currentDate, currentDate);
        const isCurrentMonth = !!isSameMonth(_currentDate, currentDate);
        const isStartMonth = !!isSameDay(_currentDate, startOfMonth(_currentDate));
        const isEndMonth = !!isSameDay(_currentDate, endOfMonth(_currentDate));

        days.push(
          <WeekViewContainer key={i} isSameDay={isCurrentDate} isSameMonth={isCurrentMonth}>
            <WeekViewNumber>
              {isCurrentDate || isStartMonth || isEndMonth ? format(_currentDate, 'MMM d') : format(_currentDate, 'd')}
            </WeekViewNumber>
            <WeekViewDayName isSameMonth={isCurrentMonth}>{format(_currentDate, 'EEE')}</WeekViewDayName>
          </WeekViewContainer>
        );
      } else {
        console.log('_currentDate, i:', i, _currentDate);
        days.push(<DayOfWeek key={i}>{format(_currentDate, dateFormat)}</DayOfWeek>);
      }

      _currentDate = addDays(_currentDate, 1);
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
