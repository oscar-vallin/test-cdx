import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

import { Box, Row, Column, Container, RightColumn } from './TableTransmissions.styles';
import { useTable, useInputs } from './TableTransmissions.service';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';

const TableTransmissions = ({ id = 'TableTransmissions', data, dateRange, filter }) => {
  const { tableProps } = useTable(data);
  const { localInput, startDate, endDate } = useInputs();

  console.log('TableTransmissions, tableProps: ', tableProps);
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

TableTransmissions.propTypes = {
  id: PropTypes.string,
  orgSid: PropTypes.string,
  dateRange: PropTypes.array,
  filter: PropTypes.string,
};

export { TableTransmissions };
