import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

import { useParams, useLocation } from 'react-router-dom';

import { Box, Row, Column, Container, RightColumn } from './TableFileStatus.styles';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { useTableFilters } from '../../../hooks/useTableFilters';
import { TABLE_NAMES } from '../../../data/constants/TableConstants';
import { useTableTemplate } from '../../../hooks/useTableTemplate';
import { getStartDay, getEndDay } from '../../../helpers/tableHelpers';
import queryString from 'query-string';

const TableFileStatus = ({ idPage = 'TableFileStatus', orgSid = 1, dateRange, filter }) => {
  const { localInput, startDate, endDate } = useTableFilters('Extract Name,  Status, Vendor, etc.');
  const location = useLocation();
  const [urlParams, setUrlParams] = useState(queryString.parse(location.search));

  const { tableProps } = useTableTemplate(
    TABLE_NAMES.FILE_STATUS,
    orgSid,
    { rangeStart: startDate.value, rangeEnd: endDate.value },
    localInput.value,
    '',
    localInput.value
  );

  const { id } = useParams();
  const { search } = useLocation();

  useEffect(() => {
    if (urlParams.startDate && urlParams.endDate) {
      startDate.setValue(new Date(`${urlParams.startDate} 00:00:00`));
      endDate.setValue(new Date(`${urlParams.endDate} 00:00:00`));
    }
  }, [urlParams.startDate, urlParams.endDate]);

  //Component did mount
  useEffect(() => {
    const date = new URLSearchParams(search).get('date');

    if (date) {
      selectDate(date);
    }

    if (id === undefined) {
      return;
    }
    let params = id.split('*');
    localInput.setValue(params[0]);
    selectDate(params[1]);
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
          <Table id={`${idPage}`} onOption={() => null} searchInput={localInput.value} {...tableProps} />
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
