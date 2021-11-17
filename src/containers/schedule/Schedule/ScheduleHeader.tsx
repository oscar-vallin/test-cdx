import { useState } from 'react';
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
  const [currentMonth, setCurrentMonth] = useState(currentDate ?? new Date());
  const [currentWeek, setCurrentWeek] = useState(currentDate ?? new Date());
  const [currentDay, setCurrentDay] = useState(currentDate ?? new Date());
  const headerMonthFormat = 'MMMM';
  const headerYearFormat = 'yyyy';
  const [calendarOpen, setCalendarOpen] = useState(false);

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
    return null;
  };

  //
  const handleNextDay = () => {
    const _currentDay = addDays(currentDay, 1);

    handleChangeDate(_currentDay);
    return null;
  };

  //
  const handlePrevWeek = () => {
    const _currentWeek = addWeeks(currentWeek, -1);

    handleChangeDate(_currentWeek);
    return null;
  };

  //
  const handleNextWeek = () => {
    const _currentWeek = addWeeks(currentWeek, 1);

    handleChangeDate(_currentWeek);
    return null;
  };

  //
  const handlePrevMonth = () => {
    const _currentMonth = addMonths(currentMonth, -1);

    handleChangeDate(_currentMonth);
    return null;
  };

  //
  const handleNextMonth = () => {
    const _currentMonth = addMonths(currentMonth, 1);

    handleChangeDate(_currentMonth);
    return null;
  };

  // * Refactored (SonarQube)
  const handleChangeView = (_newView) => {
    if (_newView !== currentView) {
      onChangeView(_newView);
    }

    return null;
  };

  const handleSelectToday = () => {
    handleChangeDate(new Date());
    return null;
  };

  //
  const handleCalendarOpen = (open: boolean) => {
    setCalendarOpen(!!open);
    return null;
  };

  const renderTodayButton = () => {
    return (
      <StyledButtonAction id="ButtonToday" onClick={handleSelectToday} icon="today" disabled={false}>
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
        <HeaderButtonTitle
          id="__HeaderButtonTitle_Id"
          variant="secondary"
          disabled={false}
          block={false}
          onClick={() => handleCalendarOpen(true)}
          text=""
        >
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
            <StyledButtonAction
              id="ButtonPrev"
              onClick={handlePrevDay}
              icon="chromeBack"
              disabled={false}
              children={null}
            />
            <StyledButtonAction
              id="ButtonNext"
              onClick={handleNextDay}
              icon="chromeNext"
              disabled={false}
              children={null}
            />
          </>
        )}
        {isCurrentViewWeek(currentView) && (
          <>
            <StyledButtonAction
              id="ButtonPrev"
              onClick={handlePrevWeek}
              icon="chromeBack"
              disabled={false}
              children={null}
            />
            <StyledButtonAction
              id="ButtonNext"
              onClick={handleNextWeek}
              icon="chromeNext"
              disabled={false}
              children={null}
            />
          </>
        )}
        {isCurrentViewMonth(currentView) && (
          <>
            <StyledButtonAction id="ButtonUp" onClick={handlePrevMonth} icon="up" disabled={false} children={null} />
            <StyledButtonAction
              id="ButtonDown"
              onClick={handleNextMonth}
              icon="down"
              disabled={false}
              children={null}
            />
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
              id="__HeaderButtonView_Button-MonthView_Id"
              variant="secondary"
              disabled={false}
              block={false}
              key="Button-MonthView"
              selected={isCurrentViewMonth(currentView)}
              onClick={() => handleChangeView('month')}
              text=""
            >
              Month
            </HeaderButtonView>
          </Spacing>

          <Spacing margin={{ left: 'normal' }}>
            <HeaderButtonView
              id="__HeaderButtonView_Button-WeekView_Id"
              variant="secondary"
              disabled={false}
              block={false}
              key="Button-WeekView"
              selected={isCurrentViewWeek(currentView)}
              onClick={() => handleChangeView('week')}
              text=""
            >
              Week
            </HeaderButtonView>
          </Spacing>

          <Spacing margin={{ left: 'normal' }}>
            <HeaderButtonView
              id="__HeaderButtonView_Button-DayView_Id"
              variant="secondary"
              disabled={false}
              block={false}
              key="Button-DayView"
              selected={isCurrentViewDay(currentView)}
              onClick={() => handleChangeView('day')}
              text=""
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
