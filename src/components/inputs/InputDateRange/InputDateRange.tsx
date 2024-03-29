import { ReactElement } from 'react';
import { DatePicker } from '@fluentui/react';
import { FormLabel } from 'src/components/labels/FormLabel';
import { DateState } from 'src/hooks/useDateValue';
import { DayPickerStrings, firstDayOfWeek } from 'src/components/inputs/DateConstants';
import { Row, LeftColumn, RightColumn } from './InputDateRange.styles';

type InputDateRangeProps = {
  startDate: DateState;
  endDate: DateState;
  showLabels?: boolean;
};

const ERR_FROM_DATE = 'The "From" date must be before the "To" date';
const ERR_TO_DATE = 'The "To" date must be after the "From" date';

// Get tomorrow's date for maxDate value
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const InputDateRange = (
  {
    startDate,
    endDate,
    showLabels = true,
  }: InputDateRangeProps,
): ReactElement => (
  <Row id="InputDateRange--Row">
    <LeftColumn id="InputDateRange--Column--From" sm="6" direction="column">
      {showLabels && <FormLabel label="From" required={true} />}
      <DatePicker
        id="Input__From__Date"
        firstDayOfWeek={firstDayOfWeek}
        strings={{
          ...DayPickerStrings,
          isOutOfBoundsErrorMessage: ERR_FROM_DATE,
        }}
        placeholder="Select a Date..."
        ariaLabel="Select a Date..."
        maxDate={endDate.value}
        onSelectDate={startDate.onChange}
        value={startDate.value}
        allowTextInput
        style={{ width: '100%' }}
      />
    </LeftColumn>
    <RightColumn id="InputDateRange--Column--To" sm="6">
      {showLabels && <FormLabel label="To" required={true} />}
      <DatePicker
        id="Input__To__Date"
        firstDayOfWeek={firstDayOfWeek}
        strings={{
          ...DayPickerStrings,
          isOutOfBoundsErrorMessage: ERR_TO_DATE,
        }}
        placeholder="Select a Date..."
        ariaLabel="Select a Date..."
        minDate={startDate.value}
        onSelectDate={endDate.onChange}
        value={endDate.value}
        allowTextInput
        style={{ width: '100%' }}
      />
    </RightColumn>
  </Row>
);

export { InputDateRange };
