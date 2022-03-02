import { ReactElement, useState } from 'react';
import { Calendar, DateRangeType, DayOfWeek, DefaultButton } from '@fluentui/react';
import { addDays, getDateRangeArray } from '@fluentui/date-time-utilities';
import { Container } from './MonthPicker.styles';

type MonthPickerProps = {
  open?: boolean;
  value?: Date;
  onSelect?: (date: Date) => void;
  showDates?: boolean;
  isMonthPickerVisible?: boolean;
  dateRangeType?: DateRangeType;
  showGoToToday?: boolean;
  showNavigateButtons?: boolean;
  highlightCurrentMonth?: boolean;
  highlightSelectedMonth?: boolean;
  isDayPickerVisible?: boolean;
  showMonthPickerAsOverlay?: boolean;
  showWeekNumbers?: boolean;
  firstDayOfWeek?: DayOfWeek;
  /// /////////////////
  minDate?: Date;
  maxDate?: Date;
  restrictedDates?: Date[];
  showSixWeeksByDefault?: boolean;
  workWeekDays?: DayOfWeek[];
};

const dayPickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToToday: 'Go to today',
  weekNumberFormatString: 'Week number {0}',
  prevMonthAriaLabel: 'Previous month',
  nextMonthAriaLabel: 'Next month',
  prevYearAriaLabel: 'Previous year',
  nextYearAriaLabel: 'Next year',
  prevYearRangeAriaLabel: 'Previous year range',
  nextYearRangeAriaLabel: 'Next year range',
  closeButtonAriaLabel: 'Close',
  monthPickerHeaderAriaLabel: '{0}, select to change the year',
  yearPickerHeaderAriaLabel: '{0}, select to change the month',
};

let dateRangeString = null as any;

export const MonthPicker = ({
  open,
  value,
  onSelect,
  showDates = false,
  dateRangeType = DateRangeType.Month,
  showGoToToday = true,
  showNavigateButtons = false,
  highlightCurrentMonth = true,
  highlightSelectedMonth = true,
  showMonthPickerAsOverlay = true,
  minDate,
  maxDate,
  restrictedDates,
  showSixWeeksByDefault,
  workWeekDays,
}: MonthPickerProps): ReactElement => {
  const [selectedDateRange, setSelectedDateRange] = useState<Date[]>();
  const [selectedDate, setSelectedDate] = useState<Date>(value ?? new Date());

  const onSelectDate = (date: Date, dateRangeArray?: Date[]) => {
    setSelectedDate(date);
    setSelectedDateRange(dateRangeArray);
    if (onSelect) {
      onSelect(date);
    }
  };

  const goPrevious = () => {
    const goPreviousSelectedDate = selectedDate || new Date();
    const dateRangeArray = getDateRangeArray(goPreviousSelectedDate, dateRangeType, DayOfWeek.Sunday);
    let subtractFrom = dateRangeArray[0];
    let daysToSubtract = dateRangeArray.length;
    if (dateRangeType === DateRangeType.Month) {
      subtractFrom = new Date(subtractFrom.getFullYear(), subtractFrom.getMonth(), 1);
      daysToSubtract = 1;
    }
    const newSelectedDate = addDays(subtractFrom, -daysToSubtract);
    return {
      goPreviousSelectedDate: newSelectedDate,
    };
  };

  const goNext = () => {
    const goNextSelectedDate = selectedDate || new Date();
    const dateRangeArray = getDateRangeArray(goNextSelectedDate, dateRangeType, DayOfWeek.Sunday);
    const newSelectedDate = addDays(dateRangeArray.pop() as Date, 1);

    return {
      goNextSelectedDate: newSelectedDate,
    };
  };

  const onCalendarDismiss = () => {
    return selectedDate;
  };

  if (selectedDateRange) {
    const rangeStart = selectedDateRange[0] as Date;
    const rangeEnd = selectedDateRange[selectedDateRange.length - 1] as Date;
    dateRangeString = `${rangeStart.toLocaleDateString()}-${rangeEnd.toLocaleDateString()}`;
  }

  return (
    <Container id="MonthPickerModal" show={open}>
      {showDates && (
        <>
          <div>
            Selected date(s): <span>{!selectedDate ? 'Not set' : selectedDate.toLocaleString()}</span>
          </div>

          <div>
            Selected dates:
            <span> {!dateRangeString ? 'Not set' : dateRangeString}</span>
          </div>
        </>
      )}
      {(minDate || maxDate) && (
        <div>
          Date boundary:
          <span>
            {' '}
            {minDate ? minDate.toLocaleDateString() : 'Not set'}-{maxDate ? maxDate.toLocaleDateString() : 'Not set'}
          </span>
        </div>
      )}
      {restrictedDates && (
        <div>
          Disabled date(s):
          <span>
            {' '}
            {restrictedDates.length > 0 ? restrictedDates.map((d) => d.toLocaleDateString()).join(', ') : 'Not set'}
          </span>
        </div>
      )}
      <Calendar
        className="cdx-cal"
        data-testid="Calendar"
        onSelectDate={onSelectDate}
        onDismiss={onCalendarDismiss}
        isMonthPickerVisible
        dateRangeType={dateRangeType}
        showGoToToday={showGoToToday}
        value={selectedDate ?? new Date()}
        firstDayOfWeek={DayOfWeek.Sunday}
        strings={dayPickerStrings}
        highlightCurrentMonth={highlightCurrentMonth}
        highlightSelectedMonth={highlightSelectedMonth}
        isDayPickerVisible={false}
        showMonthPickerAsOverlay={showMonthPickerAsOverlay}
        showWeekNumbers={false}
        minDate={minDate}
        maxDate={maxDate}
        restrictedDates={restrictedDates}
        showSixWeeksByDefault={showSixWeeksByDefault}
        workWeekDays={workWeekDays}
      />
      {showNavigateButtons && (
        <div>
          <DefaultButton data-testid="__PrevioustBtn" onClick={goPrevious} text="Previous" />
          <DefaultButton data-testid="__NextBtn" onClick={goNext} text="Next" />
        </div>
      )}
    </Container>
  );
};
