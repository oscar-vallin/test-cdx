import React from 'react';
import { addDays, addMonths, endOfWeek, format, startOfWeek } from 'date-fns';

import { addWeeks } from '@fluentui/react';
import {
  RowHeaderItem,
  HeaderMonth,
  HeaderYear,
  HeaderButtonView,
  StyledButtonAction,
  UpDownContainer,
  MonthYearContainer,
  HeaderButtonTitle,
  FillerHours,
} from './ScheduleHeader.styles';

import { isCurrentViewDay, isCurrentViewMonth, isCurrentViewWeek } from './helpers';
import { MonthPicker } from '../../../components/inputs/MonthPicker';

import { Spacing } from '../../../components/spacings/Spacing';
import { Row, Column } from '../../../components/layouts';

export const ScheduleHeader = ({ id, currentView, currentDate, onChangeDate, onChangeView }) => {
  const [currentMonth, setCurrentMonth] = React.useState(currentDate ?? new Date());
  const [currentWeek, setCurrentWeek] = React.useState(currentDate ?? new Date());
  const [currentDay, setCurrentDay] = React.useState(currentDate ?? new Date());
  const headerMonthFormat = 'MMMM';
  const headerYearFormat = 'yyyy';
  const [calendarOpen, setCalendarOpen] = React.useState(false);

  //
  const handleChangeDate = (_newDate) => {
    setCalendarOpen(false);
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
      <StyledButtonAction id="ButtonToday" onClick={handleSelectToday} icon="today">
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
      const weekStart = startOfWeek(currentWeek);
      const weekEnd = endOfWeek(currentWeek);

      return (
        <MonthYearContainer>
          <HeaderMonth>
            {`${format(weekStart, formatWeek)} - ${format(weekEnd, formatWeek)}, ${format(
              currentMonth,
              headerYearFormat
            )}`}
          </HeaderMonth>
        </MonthYearContainer>
      );
    }

    return (
      <MonthYearContainer>
        {calendarOpen && <MonthPicker open={calendarOpen} onSelect={handleChangeDate} />}
        <HeaderButtonTitle onClick={() => setCalendarOpen(true)}>
          <HeaderMonth>{format(currentMonth, headerMonthFormat)}</HeaderMonth>
          <HeaderYear>{format(currentMonth, headerYearFormat)}</HeaderYear>
        </HeaderButtonTitle>
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
            <StyledButtonAction id="ButtonPrev" onClick={handlePrevDay} icon="chromeBack" />
            <StyledButtonAction id="ButtonNext" onClick={handleNextDay} icon="chromeNext" />
          </>
        )}
        {isCurrentViewWeek(currentView) && (
          <>
            <StyledButtonAction id="ButtonPrev" onClick={handlePrevWeek} icon="chromeBack" />
            <StyledButtonAction id="ButtonNext" onClick={handleNextWeek} icon="chromeNext" />
          </>
        )}
        {isCurrentViewMonth(currentView) && (
          <>
            <StyledButtonAction id="ButtonUp" onClick={handlePrevMonth} icon="up" />
            <StyledButtonAction id="ButtonDown" onClick={handleNextMonth} icon="down" />
          </>
        )}
      </UpDownContainer>
    );
  };

  const renderHeaderMonth = () => {
    return (
      <Row id={id}>
        <Column lg="8">
          <RowHeaderItem>
            {isCurrentViewWeek(currentView) && <FillerHours />}
            {renderTodayButton()}
            {renderNavArrows()}
            {renderHeaderTitle()}
          </RowHeaderItem>
        </Column>
        <Column lg="4" direction="row" right>
          <Spacing margin={{ left: 'normal' }}>
            <HeaderButtonView
              key="Button-MonthView"
              selected={isCurrentViewMonth(currentView)}
              onClick={() => handleChangeView('month')}
            >
              Month
            </HeaderButtonView>
          </Spacing>

          <Spacing margin={{ left: 'normal' }}>
            <HeaderButtonView
              key="Button-WeekView"
              selected={isCurrentViewWeek(currentView)}
              onClick={() => handleChangeView('week')}
            >
              Week
            </HeaderButtonView>
          </Spacing>

          <Spacing margin={{ left: 'normal' }}>
            <HeaderButtonView
              key="Button-DayView"
              selected={isCurrentViewDay(currentView)}
              onClick={() => handleChangeView('day')}
            >
              Day
            </HeaderButtonView>
          </Spacing>
        </Column>
      </Row>
    );
  };

  return <>{renderHeaderMonth()}</>;
};

ScheduleHeader.propTypes = {};

export default ScheduleHeader;
