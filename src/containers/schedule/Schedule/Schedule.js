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
  CalendarBodyCellNumber,
  CalendarBodyCellBg,
} from './Schedule.styles';
import { addMonths } from 'date-fns/esm';

const Schedule = ({ id = 'ScheduleContainer', orgSid = 1, dateRange, filter, ...props }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  console.log('Schedule Container, props: ', props);

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

    return (
      <Row>
        <Column>
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </Column>
        <Column>
          <span>{format(currentMonth, dateFormat)}</span>
        </Column>
        <Column>
          <div className="col col-end" onClick={nextMonth}>
            <div className="icon">chevron_right</div>
          </div>
        </Column>
      </Row>
    );
  };

  const renderDate = () => {};

  const renderDays = () => {
    const dateFormat = 'dddd';
    const days = [];
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <Column sm={12} key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </Column>
      );
    }
    return <Row>{days}</Row>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        // Collpase icon.
        // Month View, Week Month, Day Month.
        // Select Day highlihgt and Change the View.
        // Just highlighted.

        console.log('Formated Date: ', formattedDate);

        days.push(
          <Column
            isSameMonth={isSameMonth(day, monthStart)}
            isSameDay={isSameDay(day, selectedDate)}
            key={day}
            onClick={() => onDateClick(parse(cloneDay))}
          >
            <CalendarBodyCellNumber>{formattedDate}</CalendarBodyCellNumber>
            <CalendarBodyCellBg>{formattedDate}</CalendarBodyCellBg>
          </Column>
        );

        day = addDays(day, 1);
      }
      rows.push(<Row key={day}>{days}</Row>);
      days = [];
    }
  };

  const onDateClick = () => {};

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <Container>
      <Row>{renderHeader()}</Row>

      <Row>{renderDays()}</Row>
      <Row>{renderCells()}</Row>
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
