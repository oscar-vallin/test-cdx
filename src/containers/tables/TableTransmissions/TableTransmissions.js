import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

import { Box, Row, Column, Container, RightColumn } from './TableTransmissions.styles';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { useTableFilters } from '../../../hooks/useTableFilters';
import { TABLE_NAMES } from '../../../data/constants/TableConstants';
import { useTableTemplate } from '../../../hooks/useTableTemplate';
import { useParams, useLocation } from 'react-router-dom';
import { getStartDay, getEndDay } from '../../../helpers/tableHelpers';

const TableTransmissions = ({ idPage = 'TableTransmissions', orgSid = 1, dateRange, filter }) => {
  const { localInput, startDate, endDate } = useTableFilters('Extract Name,  Status, Vendor, etc.', useParams());
  const { search } = useLocation();
  const paramsDate = new URLSearchParams(search).get('date');
  const [date, _setDate] = useState(paramsDate);

  const { tableProps } = useTableTemplate(
    TABLE_NAMES.TRANSMISSIONS,
    orgSid,
    { rangeStart: startDate.value, rangeEnd: endDate.value },
    localInput.value,
    '',
    localInput.value
  );

  //Component did mount
  useEffect(() => {
    if (date) {
      selectDate(date);
    }
  }, []);

  const selectDate = (date) => {
    const _startDay = getStartDay(date);
    const _endDay = getEndDay(date);

    startDate.setValue(_startDay);
    endDate.setValue(_endDay);
  };

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
      {!tableProps.loading && (
        <Box id={`${idPage}`}>
          <Table id={`${idPage}`} onOption={() => null} searchInput={localInput.value} {...tableProps} date={date} />
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
