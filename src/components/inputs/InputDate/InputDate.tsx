import { ReactElement } from 'react';
import { addDays, addYears } from '@fluentui/date-time-utilities';
import { DatePicker } from '@fluentui/react';
import { getHours } from 'date-fns';
import { DayPickerStrings, firstDayOfWeek } from 'src/components/inputs/DateConstants';

const defaultProps = {
  id: '',
  placeholder: 'Select a Date...',
  value: 8,
  required: true,
};

type InputDateProps = {
  id?: string;
  placeholder?: string;
  label?: string;
  value?: Date | number | any;
  onChange?: (date: Date | null | undefined) => void;
  required?: boolean;
} & typeof defaultProps;

const today = new Date();
const yesterday = addDays(today, -1);
const hour = getHours(new Date());
const maxDate = addYears(today, 1);

const getValue = (value) => {
  if (value !== '') return value;

  if (hour < 9) return yesterday;

  return today;
};

const InputDate = ({ id, placeholder, label, value, onChange, required }: InputDateProps): ReactElement => {
  return (
    <DatePicker
      id={id}
      label={label}
      isRequired={required}
      firstDayOfWeek={firstDayOfWeek}
      strings={DayPickerStrings}
      placeholder={placeholder}
      ariaLabel={placeholder}
      maxDate={maxDate}
      onSelectDate={onChange}
      value={getValue(value)}
      allowTextInput
      style={{ width: '100%' }}
    />
  );
};

InputDate.defaultProps = defaultProps;

export { InputDate };
