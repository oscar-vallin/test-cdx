import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';
import { useParams } from 'react-router-dom';
import {
  endOfDay,
  endOfYesterday,
  lastDayOfMonth,
  startOfDay,
  startOfMonth,
  startOfYesterday,
  subMonths,
} from 'date-fns';

import { Box, Row, Column, Container, RightColumn } from './TableFileStatus.styles';
import { useTable } from './TableFileStatus.service';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { useTableFilters } from '../../../hooks/useTableFilters';

const TableFileStatus = ({ idPage = 'TableFileStatus', orgSid = 1, dateRange, filter }) => {
  const { tableProps } = useTable(orgSid, dateRange, filter);
  const { localInput, startDate, endDate } = useTableFilters('Extract Name,  Status, Vendor, etc.');

  const [date, setDate] = useState();

  const { id } = useParams();

  //Component did mount
  useEffect(() => {
    if (id === undefined) {
      return;
    }
    let params = id.split('*');
    localInput.setValue(params[0]);
    selectDate(params[1]);
    console.log('date filter', startDate.value, endDate.value);

    console.log('date: ');
  }, []);

  useEffect(() => {
    console.log('date filter', startDate.value, endDate.value);
  }, [startDate, endDate]);

  const selectDate = (date) => {
    if (date === 'today') {
      const startDay = startOfDay(new Date());
      const endDay = endOfDay(new Date());

      startDate.setValue(startDay);
      endDate.setValue(endDay);
    }
    if (date === 'yesterday') {
      const startDay = startOfYesterday(new Date());
      const endDay = endOfYesterday(new Date());

      startDate.setValue(startDay);
      endDate.setValue(endDay);
    }
    if (date === 'thisMonth') {
      const startDay = startOfMonth(new Date());
      const endDay = lastDayOfMonth(new Date());

      startDate.setValue(startDay);
      endDate.setValue(endDay);
    }
    if (date === 'lastMonth') {
      const startDay = startOfMonth(subMonths(new Date(), 1));
      const endDay = lastDayOfMonth(subMonths(new Date(), 1));
      startDate.setValue(startDay);
      endDate.setValue(endDay);
    }
  };

  console.log('date filter', startDate, endDate);

  console.log('TableFileStatus, localInput: ', tableProps);
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
          <Table
            id={`${idPage}`}
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
