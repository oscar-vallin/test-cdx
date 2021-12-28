import { ReactElement } from 'react';
import { InputDate } from '../InputDate';
import { Row, Column } from './InputDateRange.styles';

const defaultProps = {
  startDate: '',
  endDate: '',
};

type InputDateRangeProps = {
  startDate?: any;
  endDate?: any;
} & typeof defaultProps;

const InputDateRange = ({ startDate, endDate }: InputDateRangeProps): ReactElement => {
  return (
    <Row id="InputDateRange--Row">
      <Column id="InputDateRange--Column--From" lg="6">
        <InputDate id="Input__From__Date" label="From" {...startDate} required />
      </Column>
      <Column id="InputDateRange--Column--To" lg="6">
        <InputDate id="Input__To__Date" label="To" {...endDate} required />
      </Column>
    </Row>
  );
};

InputDateRange.defaultProps = defaultProps;

export { InputDateRange };
