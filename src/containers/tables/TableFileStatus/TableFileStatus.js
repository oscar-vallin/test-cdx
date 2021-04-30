import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

import { Box, Row, Column, Container, RightColumn } from './TableFileStatus.styles';
import { useTable } from './TableFileStatus.service';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { useTableFilters } from '../../../hooks/useTableFilters';

const TableFileStatus = ({ idComp = 'TableFileStatus', orgSid = 1, dateRange, filter }) => {
  const { tableProps } = useTable(orgSid, dateRange, filter);
  const { localInput, startDate, endDate } = useTableFilters('Extract Name,  Status, Vendor, etc.');

  console.log('TableFileStatus, localInput: ', localInput);
  
  useEffect(() => {
    
  }, []);

  console.log('dates: ', startDate.value, endDate.value);
  console.log('local input: ', localInput.value);
  return (
    <Container>
      <Row id={`${idComp}-filters`} around>
        <Column center>
          <InputText id={`${idComp}__Card__Row__Input-Email`} autoFocus disabled={false} {...localInput} />
        </Column>
        <RightColumn center>
          <InputDateRange startDate={startDate} endDate={endDate} />
        </RightColumn>
      </Row>
      {!tableProps.loading && (
        <Box id={`${idComp}`}>
          <Table
            id={`${idComp}`}
            onOption={() => console.log('Table click')}
            searchInput={localInput.value}
            {...tableProps}
          />
        </Box>
      )}
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
