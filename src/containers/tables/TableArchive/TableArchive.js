import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

import { Box, Row, Column, Container, RightColumn } from './TableArchive.styles';
import { useTable, useInputs } from './TableArchive.service';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { useTableTemplate } from '../../../hooks/useTableTemplate';
import { TABLE_NAMES } from '../../../data/constants/TableConstants';
import { useTableFilters } from '../../../hooks/useTableFilters';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getHours, subDays } from 'date-fns';

const TableArchive = ({ idPage = 'TableArchive', orgSid = 1 }) => {
  const { localInput, startDate, endDate, selectDate } = useTableFilters(
    'Extract Name,  Status, Vendor, etc.',
    useParams()
  );

  const { tableProps } = useTableTemplate(
    TABLE_NAMES.ARCHIVES,
    orgSid,
    { rangeStart: startDate.value, rangeEnd: endDate.value },
    localInput.value,
    '',
    localInput.value
  );

  //Component did mount
  useEffect(() => {}, []);

  return (
    <Container>
      <Row id={`${idPage}-filters`} around>
        <Column center>
          <InputText id={`${idPage}__Card__Row__Input-Email`} autoFocus disabled={false} {...localInput} />
        </Column>
        <RightColumn center>
          <InputDateRange startDate={startDate} endDate={endDate} />
        </RightColumn>
      </Row>
      <Box id={`${idPage}`}>
        {!tableProps.loading && (
          <Table id={`${idPage}`} onOption={() => null} searchInput={localInput.value} {...tableProps} />
        )}
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
