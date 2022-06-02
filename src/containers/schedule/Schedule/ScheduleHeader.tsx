import { useState } from 'react';
import { addDays, addMonths, endOfWeek, format, startOfWeek } from 'date-fns';

import { addWeeks, DateRangeType } from '@fluentui/react';

import { MonthPicker } from 'src/components/inputs/MonthPicker';

import { Spacing } from 'src/components/spacings/Spacing';
import { Column, Row } from 'src/components/layouts';
import { isCurrentViewDay, isCurrentViewMonth, isCurrentViewWeek } from './helpers';
import {
  HeaderButtonTitle,
  HeaderButtonView,
  HeaderMonth,
  HeaderYear,
  MonthYearContainer,
  RowHeaderItem,
  StyledButtonAction,
  UpDownContainer,
} from './ScheduleHeader.styles';

type ScheduleHeaderType = {
  id: string;
  currentView: string;
  selectedDate: Date;
  onChangeDate: (d: Date) => void;
  onChangeView: (view: string) => void;
};

export const ScheduleHeader = ({ id, currentView, selectedDate, onChangeDate, onChangeView }: ScheduleHeaderType) => {
  const headerMonthFormat = 'MMMM';
  const headerYearFormat = 'yyyy';
  const [calendarOpen, setCalendarOpen] = useState(false);

  //
  const handleChangeDate = (_newDate?: Date) => {
    if (_newDate) {
      setCalendarOpen(false);
      onChangeDate(_newDate);
    }
  };
  //
  const handleOnOutsideClick = () => {
    setCalendarOpen(false);
  };

  //
  const handlePrevDay = () => {
    const _currentDay = addDays(selectedDate, -1);

    handleChangeDate(_currentDay);
    return null;
  };

  //
  const handleNextDay = () => {
    const _currentDay = addDays(selectedDate, 1);

    handleChangeDate(_currentDay);
    return null;
  };

  //
  const handlePrevWeek = () => {
    const _currentWeek = addWeeks(selectedDate, -1);

    handleChangeDate(_currentWeek);
    return null;
  };

  //
  const handleNextWeek = () => {
    const _currentWeek = addWeeks(selectedDate, 1);

    handleChangeDate(_currentWeek);
    return null;
  };

  //
  const handlePrevMonth = () => {
    const _currentMonth = addMonths(selectedDate, -1);

    handleChangeDate(_currentMonth);
    return null;
  };

  //
  const handleNextMonth = () => {
    const _currentMonth = addMonths(selectedDate, 1);

    handleChangeDate(_currentMonth);
    return null;
  };

  // * Refactored (SonarQube)
  const handleChangeView = (_newView) => {
    setCalendarOpen(false);
    if (_newView !== currentView) {
      onChangeView(_newView);
    }
  };

  const handleSelectToday = () => {
    handleChangeDate(new Date());
  };

  //
  const handleCalendarOpen = (open: boolean) => {
    setCalendarOpen(open);
  };

  const renderTodayButton = () => {
    return (
      <StyledButtonAction id="ButtonToday" onClick={handleSelectToday} icon="today" disabled={false}>
        Today
      </StyledButtonAction>
    );
  };

  const renderHeaderTitle = () => {
    const formatWeek = 'LLL d';
    if (isCurrentViewDay(currentView)) {
      return (
        <MonthYearContainer>
          <HeaderButtonTitle
            id="__DayButtonTitle_Id"
            variant="secondary"
            disabled={false}
            block={false}
            onClick={() => handleCalendarOpen(!calendarOpen)}
            text=""
          >
            <HeaderMonth>
              {`${format(selectedDate, formatWeek)}, ${format(selectedDate, headerYearFormat)}`}
            </HeaderMonth>
          </HeaderButtonTitle>
          {calendarOpen && (
            <MonthPicker
              onClickOutside={handleOnOutsideClick}
              open={calendarOpen}
              value={selectedDate}
              onSelect={handleChangeDate}
              dateRangeType={DateRangeType.Day}
            />
          )}
        </MonthYearContainer>
      );
    }

    if (isCurrentViewWeek(currentView)) {
      const weekStart = startOfWeek(selectedDate);
      const weekEnd = endOfWeek(selectedDate);

      return (
        <MonthYearContainer>
          <HeaderButtonTitle
            id="__WeekButtonTitle_Id"
            variant="secondary"
            disabled={false}
            block={false}
            onClick={() => handleCalendarOpen(!calendarOpen)}
            text=""
          >
            <HeaderMonth>
              {`${format(weekStart, formatWeek)} - ${format(weekEnd, formatWeek)}, ${format(
                selectedDate,
                headerYearFormat
              )}`}
            </HeaderMonth>
          </HeaderButtonTitle>
          {calendarOpen && (
            <MonthPicker
              onClickOutside={handleOnOutsideClick}
              open={calendarOpen}
              value={selectedDate}
              onSelect={handleChangeDate}
              dateRangeType={DateRangeType.Week}
            />
          )}
        </MonthYearContainer>
      );
    }

    return (
      <MonthYearContainer>
        <HeaderButtonTitle
          id="__MonthButtonTitle_Id"
          variant="secondary"
          disabled={false}
          block={false}
          onClick={() => handleCalendarOpen(!calendarOpen)}
          text=""
        >
          <HeaderMonth>{format(selectedDate, headerMonthFormat)}</HeaderMonth>
          <HeaderYear>{format(selectedDate, headerYearFormat)}</HeaderYear>
        </HeaderButtonTitle>
        {calendarOpen && (
          <MonthPicker
            onClickOutside={handleOnOutsideClick}
            open={calendarOpen}
            value={selectedDate}
            onSelect={handleChangeDate}
            dateRangeType={DateRangeType.Month}
          />
        )}
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
            <StyledButtonAction id="ButtonPrev" onClick={handlePrevDay} icon="chromeBack" disabled={false} />
            <StyledButtonAction id="ButtonNext" onClick={handleNextDay} icon="chromeNext" disabled={false} />
          </>
        )}
        {isCurrentViewWeek(currentView) && (
          <>
            <StyledButtonAction id="ButtonPrev" onClick={handlePrevWeek} icon="chromeBack" disabled={false} />
            <StyledButtonAction id="ButtonNext" onClick={handleNextWeek} icon="chromeNext" disabled={false} />
          </>
        )}
        {isCurrentViewMonth(currentView) && (
          <>
            <StyledButtonAction id="ButtonUp" onClick={handlePrevMonth} icon="up" disabled={false} />
            <StyledButtonAction id="ButtonDown" onClick={handleNextMonth} icon="down" disabled={false} />
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
