import React from 'react';
import PropTypes from 'prop-types';
import {
  addDays,
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
  CalendarBodyRow,
  CalendarBodyCell,
  CalendarBodyCellNumber,
  CalendarBodyCellBg,
  CalendarColumn,
} from './Schedule.styles';
import { addMonths } from 'date-fns/esm';

import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { ButtonAction } from '../../../components/buttons/ButtonAction';

import { ScheduleHeader } from './ScheduleHeader';
import { ScheduleWeek } from './ScheduleWeek';
import ScheduleSubHeader from './ScheduleSubHeader';
import { isCurrentViewWeek, isCurrentViewMonth } from './helpers';
import ScheduleMonth from './ScheduleMonth';

// https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3b27cc08-ebdc-42ea-b144-f91ae83b752e/dcc2mld-1481803c-ebe8-41c7-9e7c-ba8c37f8c47d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvM2IyN2NjMDgtZWJkYy00MmVhLWIxNDQtZjkxYWU4M2I3NTJlXC9kY2MybWxkLTE0ODE4MDNjLWViZTgtNDFjNy05ZTdjLWJhOGMzN2Y4YzQ3ZC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.I7WhA1T1xVSbcDQ7NHjdboU6FuUje3jD5C-chv4bt98
const Schedule = ({ id = 'ScheduleContainer', orgSid = 1, dateRange, filter, ...props }) => {
  const [currentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [currentView, setCurrentView] = React.useState('month');
  console.log('Schedule Container, props: ', props);

  //
  const handleChangeView = (_newView) => {
    setCurrentView(_newView);
  };

  //
  const handleChangeDate = (_newDate) => {
    console.log('handleChangeDate: ', _newDate);
    setSelectedDate(_newDate);
  };

  return (
    <Container>
      <ScheduleHeader
        currentDate={currentDate}
        currentView={currentView}
        onChangeView={handleChangeView}
        onChangeDate={handleChangeDate}
      />
      <ScheduleSubHeader currentDate={currentDate} currentView={currentView} selectedDate={selectedDate} />
      {!!isCurrentViewMonth(currentView) && (
        <ScheduleMonth selectedDate={selectedDate} currentDate={currentDate} onChangeDate={handleChangeDate} />
      )}
      {!!isCurrentViewWeek(currentView) && (
        <ScheduleWeek selectedDate={selectedDate} currentDate={currentDate} onChangeDate={handleChangeDate} />
      )}
    </Container>
  );
};

Schedule.propTypes = {
  id: PropTypes.string,
  orgSid: PropTypes.string,
  dateRange: PropTypes.array,
  filter: PropTypes.string,
};

export { Schedule };
