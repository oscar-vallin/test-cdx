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
  const [dates, setDates] = React.useState({
    currentMonth: currentDate,
    selectedDate: currentDate,
    monthStart: startOfMonth(currentDate),
    monthEnd: endOfMonth(currentDate),
    startDate: startOfWeek(startOfMonth(currentDate)),
    endDate: endOfWeek(endOfMonth(currentDate)),
  });

  React.useEffect(() => {
    console.log('change the SelectedDate: ', selectedDate);
    if (!!selectedDate && selectedDate !== dates.selectedDate) {
      const _monthStart = startOfMonth(selectedDate);
      const _monthEnd = endOfMonth(selectedDate);
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

  const _renderBody = () => {
    const dateFormat = 'dd';
    const rows = [];

    let day = dates.startDate;
    let days = [];
    let formattedDate = '';
    let formattedDateNotValid = '';

    while (day <= dates.endDate) {
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
            isSameMonth={isSameMonth(day, dates.monthStart)}
            isSameDay={isSameDay(day, currentDate)}
            isSelectedDate={isSameDay(day, dates.selectedDate)}
            key={day}
            onClick={() => onChangeDate(cloneDay)}
          >
            <CalendarBodyCellNumber id="CalendarBodyCellNumber">
              {isSameMonth(day, dates.monthStart) && !isSameDay(day, currentDate)
                ? formattedDate
                : formattedDateNotValid}
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
    return rows;
  };

  return <Body id="CalendarBody">{_renderBody()}</Body>;
};

ScheduleMonth.propTypes = {};

export default ScheduleMonth;
