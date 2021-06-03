import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

import { Box, Row, Column, Container, RightColumn } from './TableOrganizations.styles';
import { useTable, useInputs } from './TableOrganizations.service';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';

const TableOrganizations = ({ id = 'TableOrganizations', data, dateRange, filter }) => {
  const { tableProps } = useTable(data);
  const { localInput, startDate, endDate } = useInputs();

  return (
    <Container>
      {!tableProps.loading && (
        <Box id={`${id}`}>
          <Table id={`${id}`} onOption={() => null} {...tableProps} />
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
