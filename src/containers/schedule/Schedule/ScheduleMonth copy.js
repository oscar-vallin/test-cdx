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
  CalendarBodyCell,
  CalendarBodyCellBg,
  CalendarBodyRow,
} from './ScheduleMonth.styles';

export const ScheduleMonth = ({ id, currentDate, selectedDate, onChangeDate }) => {
  const [currentMonth, setCurrentMonth] = React.useState(currentDate);
  const [monthStart, setMonthStart] = React.useState(startOfMonth(currentMonth));
  const [monthEnd, setMonthEnd] = React.useState(endOfMonth(monthStart));
  const [startDate, setStartDate] = React.useState(startOfWeek(monthStart));
  const [endDate, setEndDate] = React.useState(endOfWeek(monthEnd));

  const dateFormat = 'dd';
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';
  let formattedDateNotValid = '';

  React.useEffect(() => {
    if (!!selectedDate) {
      setCurrentMonth(selectedDate);
      setStartDate(startOfWeek(monthStart));
      setEndDate(endOfWeek(monthEnd));
      day = startDate;
      days = [];
      formattedDate = '';
      formattedDateNotValid = '';
    }
  }, [selectedDate]);

  React.useEffect(() => {
    if (!!currentMonth) {
      setMonthStart(startOfMonth(currentMonth));
      setMonthEnd(endOfMonth(currentMonth));
    }
  }, [currentMonth]);

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      formattedDateNotValid = format(day, 'LLL d');
      const cloneDay = day;
      // Collpase icon.
      // Month View, Week Month, Day Month.
      // Select Day highlihgt and Change the View.
      // Just highlighted.

      days.push(
        <CalendarBodyCell
          id="CalendarBodyCell"
          isSameMonth={isSameMonth(day, monthStart)}
          isSameDay={isSameDay(day, currentDate)}
          isSelectedDate={isSameDay(day, selectedDate)}
          key={day}
          onClick={() => onChangeDate(cloneDay)}
        >
          <CalendarBodyCellNumber id="CalendarBodyCellNumber">
            {isSameMonth(day, monthStart) && !isSameDay(day, currentDate) ? formattedDate : formattedDateNotValid}
          </CalendarBodyCellNumber>
          <CalendarBodyCellBg id="CalendarBodyCellBg">{formattedDate}</CalendarBodyCellBg>
        </CalendarBodyCell>
      );

      day = addDays(day, 1);
    }
    rows.push(
      <CalendarBodyRow id="CalendarBodyRow" key={day}>
        {days}
      </CalendarBodyRow>
    );
    days = [];
  }

  return <Body id="CalendarBody">{rows}</Body>;
};

ScheduleMonth.propTypes = {};

export default ScheduleMonth;
