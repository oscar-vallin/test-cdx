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
  isSameHour,
  isSameMonth,
  parse,
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
  SWeekHourContainer,
  SWeekHour,
  CalendarBodyRow,
} from './ScheduleDay.styles';

export const ScheduleDay = ({ id, currentDate, selectedDate, items }) => {
  const currentSelectedDate = selectedDate ?? currentDate;

  let days = [];
  const rows = [];

  let formattedHour = '';
  let hour = startOfDay(currentSelectedDate);
  const hourFormat = 'h aa';

  //
  //
  const renderItems = (hour, allItems) => {
    const dayRows = allItems.filter((_item) => isSameHour(parseISO(_item.datetime), hour));

    return dayRows.map((_item) => <CellItem>{_item.label}</CellItem>);
  };

  const _renderBody = () => {
    for (let h = 1; h <= 24; h++) {
      formattedHour = format(hour, hourFormat);
      rows.push(
        <CalendarBodyRow id="CalendarBodyRow" key={formattedHour}>
          <SWeekHourContainer>{h > 1 && <SWeekHour>{formattedHour}</SWeekHour>}</SWeekHourContainer>
          <DayOfWeekContainer
            id="CalendarBodyCell"
            isSameDay={isSameDay(new Date(), currentSelectedDate)}
            // onClick={() => onDateClick(parse(cloneDay))}
          >
            {/* <CalendarBodyCellNumber id="CalendarBodyCellNumber">{renderItems(hour, items)}</CalendarBodyCellNumber> */}
          </DayOfWeekContainer>
        </CalendarBodyRow>
      );

      days = [];
      hour = addHours(hour, 1);
    }

    return <Container id="DayContainer">{rows}</Container>;
  };

  return <WeekRow id="WeekRow">{_renderBody()}</WeekRow>;
  // return <>{_renderBody()}</>;
};

ScheduleDay.propTypes = {};

export default ScheduleDay;
