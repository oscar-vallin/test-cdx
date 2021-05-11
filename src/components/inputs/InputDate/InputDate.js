import React from 'react';
import { addMonths, addYears } from '@fluentui/date-time-utilities';
import { DatePicker, DayOfWeek } from 'office-ui-fabric-react/lib/DatePicker';
import { endOfDay, endOfYesterday, getHours, startOfDay, startOfYesterday } from 'date-fns';
import { isConstructorDeclaration } from 'typescript';

const today = new Date();
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
  const [selectedDate, setSelectedDate] = React.useState();

  // React.useEffect(() => {
  //   if (value === '') {
  //     const hour = getHours(new Date());
  //     if (hour < 9) {
  //       console.log('hours: ', hour);
  //       const startDay = startOfYesterday(new Date());
  //       setSelectedDate(startDay);

  //       return;
  //     }
  //     const startDay = startOfDay(new Date());
  //     setSelectedDate(startDay);

  //     return;
  //   }
  //   setSelectedDate(value);
  // }, []);

  console.log('date in uinput: ', onChange);

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
      value={value}
      allowTextInput
    />
  );
};

export { InputDate };
