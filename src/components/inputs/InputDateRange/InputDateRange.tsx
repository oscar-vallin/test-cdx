import { ReactElement } from 'react';
import { FormLabel } from 'src/components/labels/FormLabel';
import { DateState } from 'src/hooks/useDateValue';
import { DayPickerStrings, firstDayOfWeek } from 'src/components/inputs/DateConstants';
import { Row, Column, ThemedDatePicker } from './InputDateRange.styles';

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

const InputDateRange = ({ startDate, endDate, showLabels = true }: InputDateRangeProps): ReactElement => {
  return (
    <Row id="InputDateRange--Row">
      <Column id="InputDateRange--Column--From" lg="6" direction="column">
        {showLabels && <FormLabel label="From" required={true} />}
        <ThemedDatePicker
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
      </Column>
      <Column id="InputDateRange--Column--To" lg="6">
        {showLabels && <FormLabel label="To" required={true} />}
        <ThemedDatePicker
          id="Input__To__Date"
          firstDayOfWeek={firstDayOfWeek}
          strings={{
            ...DayPickerStrings,
            isOutOfBoundsErrorMessage: ERR_TO_DATE,
          }}
          placeholder="Select a Date..."
          ariaLabel="Select a Date..."
          minDate={startDate.value}
          maxDate={tomorrow}
          onSelectDate={endDate.onChange}
          value={endDate.value}
          allowTextInput
          style={{ width: '100%' }}
        />
      </Column>
    </Row>
  );
};

export { InputDateRange };
