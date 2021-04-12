import * as React from 'react';
import { Calendar, DayOfWeek, DateRangeType } from 'office-ui-fabric-react/lib/Calendar';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { addDays, getDateRangeArray } from '@fluentui/date-time-utilities';
import { Container } from './MonthPicker.styles.js';

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
// const divStyle: React.CSSProperties = {
//   height: 'auto',
// };
// const buttonStyle: React.CSSProperties = {
//   margin: '17px 10px 0 0',
// };
let dateRangeString = null;

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
  // minDate?: Date;
  // maxDate?: Date;
  // restrictedDates?: Date[];
  // showSixWeeksByDefault?: boolean;
  // workWeekDays?: DayOfWeek[];
  firstDayOfWeek = DayOfWeek.Monday,
  ...props
}) => {
  const [selectedDateRange, setSelectedDateRange] = React.useState();
  const [selectedDate, setSelectedDate] = React.useState();

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
    const newSelectedDate = addDays(dateRangeArray.pop(), 1);

    return {
      goNextSelectedDate: newSelectedDate,
    };
  };

  const onDismiss = () => {
    return selectedDate;
  };

  if (selectedDateRange) {
    const rangeStart = selectedDateRange[0];
    const rangeEnd = selectedDateRange[selectedDateRange.length - 1];
    dateRangeString = rangeStart.toLocaleDateString() + '-' + rangeEnd.toLocaleDateString();
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
        // eslint-disable-next-line react/jsx-no-bind
        onSelectDate={onSelectDate}
        // eslint-disable-next-line react/jsx-no-bind
        onDismiss={onDismiss}
        isMonthPickerVisible={true}
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
            style={buttonStyle}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={goPrevious}
            text="Previous"
          />
          <DefaultButton
            style={buttonStyle}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={goNext}
            text="Next"
          />
        </div>
      )}
    </Container>
  );
};
