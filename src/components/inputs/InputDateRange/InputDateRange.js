import React from 'react';
import { InputDate } from '../InputDate';
import { Box, Row, Column } from './InputDateRange.styles.js';
import { Label } from '@fluentui/react/lib/Label';

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
