import React from 'react';
import { InputDate } from '../InputDate';
import { Box, Row, Column } from './InputDateRange.styles.js';

const InputDateRange = ({ startDate, endDate }) => {
  return (
    <Row id="InputDateRange--Row">
      <Column id="InputDateRange--Column" lg="6">
        <InputDate {...startDate} />
      </Column>
      <Column id="InputDateRange--Column" lg="6">
        <InputDate {...endDate} />
      </Column>
    </Row>
  );
};

export { InputDateRange };
