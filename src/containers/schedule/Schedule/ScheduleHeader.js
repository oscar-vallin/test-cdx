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
  CalendarBodyRow,
  CalendarBodyCell,
  CalendarBodyCellNumber,
  CalendarBodyCellBg,
  CalendarColumn,
  StyledButtonAction,
  UpDownContainer,
  MonthYearContainer,
} from './ScheduleHeader.styles';

import { ButtonAction } from '../../../components/buttons/ButtonAction';
import { isCurrentViewDay, isCurrentViewMonth, isCurrentViewWeek } from './helpers';
import { addWeeks } from '@fluentui/react';

export const ScheduleHeader = ({ id, currentView, currentDate, onChangeDate, onChangeView }) => {
  const [currentMonth, setCurrentMonth] = React.useState(currentDate ?? new Date());
  const [currentWeek, setCurrentWeek] = React.useState(currentDate ?? new Date());
  const [currentDay, setCurrentDay] = React.useState(currentDate ?? new Date());
  const headerMonthFormat = 'MMMM';
  const headerYearFormat = 'yyyy';

  //
  const handleChangeDate = (_newDate) => {
    setCurrentMonth(_newDate);
    setCurrentWeek(_newDate);
    setCurrentDay(_newDate);
    onChangeDate(_newDate);
  };

  //
  const handlePrevDay = () => {
    const _currentDay = addDays(currentDay, -1);

    handleChangeDate(_currentDay);
  };

  //
  const handleNextDay = () => {
    const _currentDay = addDays(currentDay, 1);

    handleChangeDate(_currentDay);
  };

  //
  const handlePrevWeek = () => {
    const _currentWeek = addWeeks(currentWeek, -1);

    handleChangeDate(_currentWeek);
  };

  //
  const handleNextWeek = () => {
    const _currentWeek = addWeeks(currentWeek, 1);

    handleChangeDate(_currentWeek);
  };

  //
  const handlePrevMonth = () => {
    const _currentMonth = addMonths(currentMonth, -1);

    handleChangeDate(_currentMonth);
  };

  //
  const handleNextMonth = () => {
    const _currentMonth = addMonths(currentMonth, 1);

    handleChangeDate(_currentMonth);
  };

  const handleChangeView = (_newView) => {
    if (_newView === currentView) return;

    onChangeView(_newView);
  };

  const handleSelectToday = () => {
    handleChangeDate(new Date());
  };

  const renderTodayButton = () => {
    return (
      <StyledButtonAction id={`ButtonToday`} onClick={handleSelectToday} icon="today">
        Today
      </StyledButtonAction>
    );
  };

  const renderHeaderTitle = () => {
    const formatWeek = 'LLLL d';
    if (isCurrentViewDay(currentView)) {
      return (
        <MonthYearContainer>
          <HeaderMonth>{`${format(currentDay, formatWeek)}, ${format(currentDay, headerYearFormat)}`}</HeaderMonth>
        </MonthYearContainer>
      );
    }

    if (isCurrentViewWeek(currentView)) {
      console.log('renderHeaderTitle, currentDate: ', currentWeek);

      const weekStart = startOfWeek(currentWeek);
      const weekEnd = endOfWeek(currentWeek);

      return (
        <MonthYearContainer>
          <HeaderMonth>{`${format(weekStart, formatWeek)} - ${format(weekEnd, formatWeek)}, ${format(
            currentMonth,
            headerYearFormat
          )}`}</HeaderMonth>
        </MonthYearContainer>
      );
    }

    return (
      <MonthYearContainer>
        <HeaderMonth>{format(currentMonth, headerMonthFormat)}</HeaderMonth>
        <HeaderYear>{format(currentMonth, headerYearFormat)}</HeaderYear>
      </MonthYearContainer>
    );
  };

  //
  // *
  const renderNavArrows = () => {
    return (
      <UpDownContainer>
        {isCurrentViewDay(currentView) && (
          <>
            <StyledButtonAction id={`ButtonPrev`} onClick={handlePrevDay} icon="chromeBack" />
            <StyledButtonAction id={`ButtonNext`} onClick={handleNextDay} icon="chromeNext" />
          </>
        )}
        {isCurrentViewWeek(currentView) && (
          <>
            <StyledButtonAction id={`ButtonPrev`} onClick={handlePrevWeek} icon="chromeBack" />
            <StyledButtonAction id={`ButtonNext`} onClick={handleNextWeek} icon="chromeNext" />
          </>
        )}
        {isCurrentViewMonth(currentView) && (
          <>
            <StyledButtonAction id={`ButtonUp`} onClick={handlePrevMonth} icon="up" />
            <StyledButtonAction id={`ButtonDown`} onClick={handleNextMonth} icon="down" />
          </>
        )}
      </UpDownContainer>
    );
  };

  const renderHeaderMonth = () => {
    return (
      <RowHeader>
        <ColumnHeader>
          <RowHeaderItem>
            {renderTodayButton()}
            {renderNavArrows()}
            {renderHeaderTitle()}
          </RowHeaderItem>
        </ColumnHeader>
        <ColumnHeader>
          <RowHeaderItem key={`ContainerButton-View`}>
            <HeaderButtonView
              key={`Button-MonthView`}
              selected={isCurrentViewMonth(currentView)}
              onClick={() => handleChangeView('month')}
            >
              {'Month'}
            </HeaderButtonView>
            <HeaderButtonView
              key={`Button-WeekView`}
              selected={isCurrentViewWeek(currentView)}
              onClick={() => handleChangeView('week')}
            >
              {'Week'}
            </HeaderButtonView>
            <HeaderButtonView
              key={`Button-DayView`}
              selected={isCurrentViewDay(currentView)}
              onClick={() => handleChangeView('day')}
            >
              {'Day'}
            </HeaderButtonView>
          </RowHeaderItem>
        </ColumnHeader>
      </RowHeader>
    );
  };

  return <>{renderHeaderMonth()}</>;
};

ScheduleHeader.propTypes = {};

export default ScheduleHeader;
