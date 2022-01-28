import { ReactElement } from 'react';
import { Row, Column } from './InputDateRange.styles';
import { FormLabel } from 'src/components/labels/FormLabel';
import { DateState } from 'src/hooks/useDateValue';
import { DatePicker } from '@fluentui/react';
import { DayPickerStrings, firstDayOfWeek } from 'src/components/inputs/DateConstants';

type InputDateRangeProps = {
  startDate: DateState;
  endDate: DateState;
  showLabels?: boolean;
}

const ERR_FROM_DATE = 'The "From" date must be before the "To" date';
const ERR_TO_DATE = 'The "To" date must be after the "From" date';

const InputDateRange = ({ startDate, endDate, showLabels = true}: InputDateRangeProps): ReactElement => {
  return (
    <Row id="InputDateRange--Row">
      <Column id="InputDateRange--Column--From" lg="6" direction="column">
        {showLabels && (<FormLabel label="From" required={true}/>)}
        <DatePicker
          id="Input__From__Date"
          firstDayOfWeek={firstDayOfWeek}
          strings={
            {
              ...DayPickerStrings,
              isOutOfBoundsErrorMessage: ERR_FROM_DATE
            }
          }
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
        {showLabels && (<FormLabel label="To" required={true}/>)}
        <DatePicker
          id="Input__To__Date"
          firstDayOfWeek={firstDayOfWeek}
          strings={
            {
              ...DayPickerStrings,
              isOutOfBoundsErrorMessage: ERR_TO_DATE
            }
          }
          placeholder="Select a Date..."
          ariaLabel="Select a Date..."
          minDate={startDate.value}
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
