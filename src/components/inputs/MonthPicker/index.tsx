/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement, useState } from 'react';
import { Calendar, DayOfWeek, DateRangeType } from 'office-ui-fabric-react/lib-commonjs/Calendar';
import { DefaultButton } from 'office-ui-fabric-react/lib-commonjs/Button';
import { addDays, getDateRangeArray } from '@fluentui/date-time-utilities';
import { Container } from './MonthPicker.styles';

const defaultProps = {
  open: false,
  onSelect: () => null,
  showDates: false,
  isMonthPickerVisible: true,
  dateRangeType: DateRangeType.Month,
  autoNavigateOnSelection: true,
  showGoToToday: true,
  showNavigateButtons: true,
  highlightCurrentMonth: true,
  highlightSelectedMonth: true,
  isDayPickerVisible: false,
  showMonthPickerAsOverlay: true,
  showWeekNumbers: false,
  firstDayOfWeek: 0,
};

type MonthPickerProps = {
  open?: boolean;
  onSelect?: any | null;
  showDates?: boolean;
  isMonthPickerVisible?: boolean;
  dateRangeType?: any;
  autoNavigateOnSelection?: boolean;
  showGoToToday?: boolean;
  showNavigateButtons?: boolean;
  highlightCurrentMonth?: boolean;
  highlightSelectedMonth?: boolean;
  isDayPickerVisible?: boolean;
  showMonthPickerAsOverlay?: boolean;
  showWeekNumbers?: boolean;
  firstDayOfWeek?: any;
  /// /////////////////
  minDate?: any;
  maxDate?: any;
  restrictedDates?: any;
  showSixWeeksByDefault?: any;
  workWeekDays?: any;
  theme?: any;
} & typeof defaultProps;

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
  open = false,
  onSelect,
  showDates = false,
  isMonthPickerVisible = true,
  dateRangeType = DateRangeType.Month,
  autoNavigateOnSelection = true,
  showGoToToday = true,
  showNavigateButtons = true,
  highlightCurrentMonth = true,
  highlightSelectedMonth = true,
  isDayPickerVisible = false,
  showMonthPickerAsOverlay = true,
  showWeekNumbers = false,
  firstDayOfWeek = DayOfWeek.Monday,
  ...props
}: MonthPickerProps): ReactElement => {
  const [selectedDateRange, setSelectedDateRange] = useState<Date>();
  const [selectedDate, setSelectedDate] = useState<Date>();

  const onSelectDate = (date, dateRangeArray) => {
    setSelectedDate(date);
    setSelectedDateRange(dateRangeArray);
    onSelect(date);
  };

  const goPrevious = () => {
    const goPreviousSelectedDate = selectedDate || new Date();
    const dateRangeArray = getDateRangeArray(goPreviousSelectedDate, props.dateRangeType, DayOfWeek.Sunday);
    let subtractFrom = dateRangeArray[0];
    let daysToSubtract = dateRangeArray.length;
    if (props.dateRangeType === DateRangeType.Month) {
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
    const dateRangeArray = getDateRangeArray(goNextSelectedDate, props.dateRangeType, DayOfWeek.Sunday);
    const newSelectedDate = addDays(dateRangeArray.pop() as Date, 1);

    return {
      goNextSelectedDate: newSelectedDate,
    };
  };

  const onDismiss = () => {
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
      {(props.minDate || props.maxDate) && (
        <div>
          Date boundary:
          <span>
            {' '}
            {props.minDate ? props.minDate.toLocaleDateString() : 'Not set'}-
            {props.maxDate ? props.maxDate.toLocaleDateString() : 'Not set'}
          </span>
        </div>
      )}
      {props.restrictedDates && (
        <div>
          Disabled date(s):
          <span>
            {' '}
            {props.restrictedDates.length > 0
              ? props.restrictedDates.map((d) => d.toLocaleDateString()).join(', ')
              : 'Not set'}
          </span>
        </div>
      )}
      <Calendar
        data-testid="Calendar"
        // eslint-disable-next-line react/jsx-no-bind
        onSelectDate={onSelectDate}
        // eslint-disable-next-line react/jsx-no-bind
        onDismiss={onDismiss}
        isMonthPickerVisible
        dateRangeType={props.dateRangeType}
        autoNavigateOnSelection={props.autoNavigateOnSelection}
        showGoToToday={props.showGoToToday}
        value={selectedDate ?? ''}
        firstDayOfWeek={DayOfWeek.Monday}
        strings={dayPickerStrings}
        highlightCurrentMonth={props.highlightCurrentMonth}
        highlightSelectedMonth={props.highlightSelectedMonth}
        isDayPickerVisible={false}
        showMonthPickerAsOverlay={props.showMonthPickerAsOverlay}
        showWeekNumbers={false}
        minDate={props.minDate}
        maxDate={props.maxDate}
        restrictedDates={props.restrictedDates}
        showSixWeeksByDefault={props.showSixWeeksByDefault}
        workWeekDays={props.workWeekDays}
      />
      {props.showNavigateButtons && (
        <div>
          <DefaultButton
            data-testid="__PrevioustBtn"
            // eslint-disable-next-line react/jsx-no-bind
            onClick={goPrevious}
            text="Previous"
          />
          <DefaultButton
            data-testid="__NextBtn"
            // eslint-disable-next-line react/jsx-no-bind
            onClick={goNext}
            text="Next"
          />
        </div>
      )}
    </Container>
  );
};

MonthPicker.defaultProps = defaultProps;
