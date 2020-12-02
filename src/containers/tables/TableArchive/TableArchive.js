import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

import { Box, Row, Column, Container, RightColumn } from './TableArchive.styles';
import { useTable, useInputs } from './TableArchive.service';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';

const TableArchive = ({ id = 'TableArchive', orgSid = 1, dateRange, filter }) => {
  const { tableProps } = useTable(orgSid, dateRange, filter);
  const { localInput, startDate, endDate } = useInputs();

  return (
    <Container>
      <Row id={`${id}-filters`} around>
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

TableArchive.propTypes = {
  id: PropTypes.string,
  orgSid: PropTypes.string,
  dateRange: PropTypes.array,
  filter: PropTypes.string,
};

export { TableArchive };
