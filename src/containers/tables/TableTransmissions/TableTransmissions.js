import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/TableNew';

import { Box, Row, Column, Container, RightColumn } from './TableTransmissions.styles';
import { useTable, useInputs } from './TableOrganizations.service';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';

const TableOrganizations = ({ id = 'TableOrganizations', data, dateRange, filter }) => {
  const { tableProps } = useTable(data);
  const { localInput, startDate, endDate } = useInputs();

  console.log('TableOrganizations, tableProps: ', tableProps);
  return (
    <Container>
      {!tableProps.loading && (
        <Box id={`${id}`}>
          <Table id={`${id}`} onOption={() => console.log('Table click')} {...tableProps} />
        </Box>
      )}
    </Container>
  );
};

TableOrganizations.propTypes = {
  id: PropTypes.string,
  orgSid: PropTypes.string,
  dateRange: PropTypes.array,
  filter: PropTypes.string,
};

export { TableOrganizations };
