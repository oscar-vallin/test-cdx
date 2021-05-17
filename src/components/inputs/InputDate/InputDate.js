import React from 'react';
import { addDays, addMonths, addYears } from '@fluentui/date-time-utilities';
import { DatePicker, DayOfWeek } from 'office-ui-fabric-react/lib/DatePicker';
import { endOfDay, endOfYesterday, getHours, startOfDay, startOfYesterday } from 'date-fns';
import { isConstructorDeclaration } from 'typescript';
import { useDateValue } from './../../../hooks/useDateValue';

const today = new Date();
const yesterday = addDays(today, -1);
const hour = getHours(new Date());
const minDate = addMonths(today, -2);
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

const InputDate = ({ id = '', Label, placeholder = 'Select a Date...', value, onChange, required }) => {
  return (
    <DatePicker
      isRequired={required}
      firstDayOfWeek={firstDayOfWeek}
      strings={DayPickerStrings}
      placeholder={placeholder}
      ariaLabel={placeholder}
      minDate={minDate}
      maxDate={maxDate}
      onSelectDate={onChange}
      value={value === '' ? (hour < 9 ? yesterday : today) : value}
      allowTextInput
    />
  );
};

export { InputDate };
