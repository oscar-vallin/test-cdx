import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

import { Box, Row, Column, Container, RightColumn } from './TableErrors.styles';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { TABLE_NAMES } from '../../../data/constants/TableConstants';
import { useTableFilters } from '../../../hooks/useTableFilters';
import { useTableTemplate } from '../../../hooks/useTableTemplate';
import { useParams } from 'react-router-dom';

const TableErrors = ({ id = 'TableErrors', orgSid = 1 }) => {
  const { localInput, startDate, endDate } = useTableFilters('Extract Name,  Status, Vendor, etc.', useParams());

  const { tableProps } = useTableTemplate(
    TABLE_NAMES.ERRORS,
    orgSid,
    { rangeStart: startDate.value, rangeEnd: endDate.value },
    localInput.value,
    '',
    localInput.value
  );

  //Component did mount

  console.log('Table Errors, tableProps: ', tableProps);

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
          <Table id={`${id}`} onOption={() => null} searchInput={localInput.value} {...tableProps} />
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
