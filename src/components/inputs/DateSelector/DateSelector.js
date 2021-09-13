import { addMonths, addYears } from '@fluentui/date-time-utilities';
import { DatePicker, DayOfWeek } from 'office-ui-fabric-react/lib-commonjs/DatePicker';

const today = new Date(Date.now());
const minDate = addMonths(today, -1);
const maxDate = addYears(today, 1);

const DayPickerStrings = {
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
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
  monthPickerHeaderAriaLabel: '{0}, select to change the year',
  yearPickerHeaderAriaLabel: '{0}, select to change the month',

  isRequiredErrorMessage: 'Field is required.',

  invalidInputErrorMessage: 'Invalid date format.',

  isOutOfBoundsErrorMessage: `Date must be between ${minDate.toLocaleDateString()}-${maxDate.toLocaleDateString()}`,
};

const firstDayOfWeek = DayOfWeek.Sunday;

export const DateSelector = ({ id = '', onChange, required }) => {
  return (
    <DatePicker
      id={id}
      isRequired={required}
      firstDayOfWeek={firstDayOfWeek}
      strings={DayPickerStrings}
      minDate={minDate}
      maxDate={maxDate}
      onSelectDate={onChange}
      initialPickerDate={today}
      allowTextInput
    >
      AAAAAAAA
    </DatePicker>
  );
};

export default DateSelector;
