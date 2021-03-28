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
} from './ScheduleDay.styles';

export const ScheduleDay = ({ id, currentDate, selectedDate }) => {
  const currentSelectedDate = selectedDate ?? currentDate;

  let days = [];
  let formattedDate = '';

  console.log('Schedule Week: ', currentDate);

  return <WeekRow></WeekRow>;
};

ScheduleDay.propTypes = {};

export default ScheduleDay;
