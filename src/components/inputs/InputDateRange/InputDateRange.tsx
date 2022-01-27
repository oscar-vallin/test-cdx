import { ReactElement } from 'react';
import { InputDate } from '../InputDate';
import { Row, Column } from './InputDateRange.styles';
import { FormLabel } from 'src/components/labels/FormLabel';

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
      <Column id="InputDateRange--Column--From" lg="6" direction="column">
        <FormLabel label="From" required={true}/>
        <InputDate id="Input__From__Date" {...startDate} required={false}/>
      </Column>
      <Column id="InputDateRange--Column--To" lg="6">
        <FormLabel label="To" required={true}/>
        <InputDate id="Input__To__Date" {...endDate} required={false}/>
      </Column>
    </Row>
  );
};

InputDateRange.defaultProps = defaultProps;

export { InputDateRange };
