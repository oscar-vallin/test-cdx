import { ReactElement } from 'react';
import { addDays, addYears } from '@fluentui/date-time-utilities';
import { DatePicker, DayOfWeek } from 'office-ui-fabric-react/lib-commonjs/DatePicker';
import { getHours } from 'date-fns';

const defaultProps = {
  id: '',
  placeholder: 'Select a Date...',
  value: 8,
  onChange: () => null,
  required: true,
};

type InputDateProps = {
  id?: string;
  placeholder?: string;
  value?: Date | number | any;
  onChange?: any | null;
  required?: boolean;
} & typeof defaultProps;

const today = new Date();
const yesterday = addDays(today, -1);
const hour = getHours(new Date());
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

  isOutOfBoundsErrorMessage: `Date must be between some initial date}-${maxDate.toLocaleDateString()}`,
};

const firstDayOfWeek = DayOfWeek.Sunday;

const getValue = (value) => {
  if (value !== '') return value;

  if (hour < 9) return yesterday;

  return today;
};

const InputDate = ({
  id,
  placeholder = 'Select a Date...',
  value,
  onChange,
  required,
}: InputDateProps): ReactElement => {
  return (
    <DatePicker
      id={id}
      isRequired={required}
      firstDayOfWeek={firstDayOfWeek}
      strings={DayPickerStrings}
      placeholder={placeholder}
      ariaLabel={placeholder}
      maxDate={maxDate}
      onSelectDate={onChange}
      value={getValue(value)}
      allowTextInput
    />
  );
};

InputDate.defaultProps = defaultProps;

export { InputDate };
