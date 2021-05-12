import React from 'react';
import PropTypes from 'prop-types';
import {
  addDays,
  addHours,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parse,
  parseISO,
  set,
  startOfDay,
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
  CalendarBodyRow,
  SWeekHour,
  SWeekHourContainer,
  CellItem,
} from './ScheduleWeek.styles';

export const ScheduleWeek = ({ id, currentDate, selectedDate, onChangeDate, onChangeView, items }) => {
  const startDate = startOfWeek(selectedDate ?? currentDate);
  const endDate = endOfWeek(selectedDate ?? currentDate);
  const currentSelectedDate = selectedDate ?? currentDate;

  const dateFormat = 'd';
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';
  let formattedHour = '';

  let hour = startOfDay(startDate);
  const hourFormat = 'h aa';

  //
  //
  const renderItems = (day, allItems) => {
    const dayRows = allItems.filter((_item) => isSameDay(parseISO(_item.datetime), day));

    return dayRows.map((_item) => <CellItem>{_item.label}</CellItem>);
  };

  // *
  // *
  const _renderBody = () => {
    for (let h = 1; h <= 24; h++) {
      formattedHour = format(hour, hourFormat);
      for (let i = 0; i < 7; i++) {
        days.push(
          <DayOfWeekContainer
            id="CalendarBodyCell"
            isSameDay={isSameDay(day, currentSelectedDate)}
            key={day}
            // onClick={() => onDateClick(parse(cloneDay))}
          >
            <CalendarBodyCellNumber id="CalendarBodyCellNumber">{renderItems(day, items)}</CalendarBodyCellNumber>
          </DayOfWeekContainer>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <CalendarBodyRow id="CalendarBodyRow" key={day}>
          <SWeekHourContainer>{h > 1 && <SWeekHour>{formattedHour}</SWeekHour>}</SWeekHourContainer>
          {days}
        </CalendarBodyRow>
      );

      days = [];
      hour = addHours(hour, 1);
    }

    return <div>{rows}</div>;
  };

  return <Body id="CalendarBody">{_renderBody()}</Body>;
};

ScheduleWeek.propTypes = {};

export default ScheduleWeek;
