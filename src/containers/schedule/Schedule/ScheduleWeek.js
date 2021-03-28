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
  WeekRow,
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
  DayOfWeekContainer,
  CalendarBodyCellNumber,
} from './ScheduleWeek.styles';

export const ScheduleWeek = ({ id, currentDate, selectedDate }) => {
  const startDate = startOfWeek(selectedDate ?? currentDate);
  const endDate = endOfWeek(selectedDate ?? currentDate);
  const currentSelectedDate = selectedDate ?? currentDate;

  const dateFormat = 'd';
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  console.log('Schedule Week: ', currentDate);

  for (let i = 0; i < 7; i++) {
    days.push(
      <DayOfWeekContainer
        id="CalendarBodyCell"
        isSameDay={isSameDay(day, currentSelectedDate)}
        key={day}
        // onClick={() => onDateClick(parse(cloneDay))}
      >
        <CalendarBodyCellNumber id="CalendarBodyCellNumber">{formattedDate}</CalendarBodyCellNumber>
      </DayOfWeekContainer>
    );

    day = addDays(day, 1);
  }

  return <WeekRow>{days}</WeekRow>;
};

ScheduleWeek.propTypes = {};

export default ScheduleWeek;
