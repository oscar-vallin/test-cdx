import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

import { Box, Row, Column, Container, RightColumn } from './TableErrors.styles';
import { useTable, useInputs } from './TableErrors.service';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';

const TableErrors = ({ id = 'TableErrors', orgSid = 1, dateRange, filter }) => {
  const { tableProps } = useTable(orgSid, dateRange, filter);
  const { localInput, startDate, endDate } = useInputs();

  console.log('TableErrors, tableProps: ', tableProps);
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
      {!tableProps.loading && (
        <Box id={`${id}`}>
          <Table
            id={`${id}`}
            onOption={() => console.log('Table click')}
            searchInput={localInput.value}
            {...tableProps}
          />
        </Box>
      )}
    </Container>
  );
};

TableErrors.propTypes = {
  id: PropTypes.string,
  orgSid: PropTypes.string,
  dateRange: PropTypes.array,
  filter: PropTypes.string,
};

export { TableErrors };
