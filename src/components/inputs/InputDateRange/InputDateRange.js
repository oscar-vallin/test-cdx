import React from 'react';
import { InputDate } from '../InputDate';
import { Box, Row, Column } from './InputDateRange.styles.js';

const InputDateRange = ({ startDate, endDate }) => {
  console.log('date in date range: ', startDate, endDate);
  return (
    <Box id="InputDateRange--Box">
      <Row id="InputDateRange--Row" center>
        <Column id="InputDateRange--Column">
          <InputDate {...startDate} />
        </Column>
        <Column id="InputDateRange--Column">
          <InputDate {...endDate} />
        </Column>
      </Row>
    </Box>
  );
};

export { InputDateRange };
