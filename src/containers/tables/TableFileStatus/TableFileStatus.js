import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

import { Box, Row, Column, Container, RightColumn } from './TableFileStatus.styles';
import { useTable, useInputs } from './TableFileStatus.service';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';

const TableFileStatus = ({ id = 'TableFileStatus', orgSid = 1, dateRange, filter }) => {
  const { tableProps } = useTable(orgSid, dateRange, filter);
  const { localInput, startDate, endDate } = useInputs();

  return (
    <Container>
      <Row id={`${id}-temp`} around>
        {/* {STEP_STATUS.map((item, index) => (
          <FileProgress key={index} data={{ stepStatus: item.stepStatus, colors: item.colors }} />
        ))} */}
        <Column center>
          <InputText id={`${id}__Card__Row__Input-Email`} autoFocus disabled={false} {...localInput} />
        </Column>
        <RightColumn center>
          <InputDateRange startDate={startDate} endDate={endDate} />
        </RightColumn>
      </Row>
      <Box id={`${id}`}>
        <Table id={`${id}`} onOption={() => console.log('Table click')} {...tableProps} />
      </Box>
    </Container>
  );
};

TableFileStatus.propTypes = {
  id: PropTypes.string,
  orgSid: PropTypes.string,
  dateRange: PropTypes.array,
  filter: PropTypes.string,
};

export { TableFileStatus };
