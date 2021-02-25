import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

import { Box, Container } from './TableTransmissions.styles';
import { useTable } from './TableTransmissions.service';

const TableTransmissions = ({ id = 'TableTransmissions', data }) => {
  const { tableProps } = useTable(data);

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
