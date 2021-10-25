import { ReactElement } from 'react';
import { Label } from '@fluentui/react/lib-commonjs/Label';
import { InputDate } from '../InputDate';
import { Row, Column } from './InputDateRange.styles';

const defaultProps = {
  startDate: 0,
  endDate: 0,
};

type InputDateRangeProps = {
  startDate?: any;
  endDate?: any;
} & typeof defaultProps;

const InputDateRange = ({ startDate, endDate }: InputDateRangeProps): ReactElement => {
  return (
    <Row id="InputDateRange--Row">
      <Column id="InputDateRange--Column--From" lg="6">
        <Label>From</Label>
        <InputDate id="Input__From__Date" {...startDate} />
      </Column>
      <Column id="InputDateRange--Column--To" lg="6">
        <Label>To</Label>
        <InputDate id="Input__To__Date" {...endDate} />
      </Column>
    </Row>
  );
};

InputDateRange.defaultProps = defaultProps;

export { InputDateRange };
