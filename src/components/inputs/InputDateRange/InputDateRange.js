import React from 'react';
import { Label } from '@fluentui/react/lib-commonjs/Label';
import { InputDate } from '../InputDate';
import { Box, Row, Column } from './InputDateRange.styles.js';

const InputDateRange = ({ startDate, endDate }) => {
  return (
    <Row id="InputDateRange--Row">
      <Column id="InputDateRange--Column" lg="6">
        <Label>From</Label>
        <InputDate {...startDate} />
      </Column>
      <Column id="InputDateRange--Column" lg="6">
        <Label>To</Label>
        <InputDate {...endDate} />
      </Column>
    </Row>
  );
};

export { InputDateRange };
