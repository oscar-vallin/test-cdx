import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';
import { useParams } from 'react-router-dom';
import {
  endOfDay,
  endOfYesterday,
  getHours,
  isToday,
  isYesterday,
  lastDayOfMonth,
  startOfDay,
  startOfMonth,
  startOfYesterday,
  subDays,
  subMonths,
} from 'date-fns';

import { Box, Row, Column, Container, RightColumn } from './TableFileStatus.styles';
import { useTable } from './TableFileStatus.service';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { useTableFilters } from '../../../hooks/useTableFilters';
import { useRefresh } from './hooks/useRefresh';

const TableFileStatus = ({ idPage = 'TableFileStatus', orgSid = 1, dateRange, filter }) => {
  const [_isToday, setIsToday] = useState(true);

  const { localInput, startDate, endDate } = useTableFilters('Extract Name,  Status, Vendor, etc.');
  const { tableProps } = useTable(orgSid, dateRange, filter, _isToday, localInput.value);

  const { id } = useParams();

  //Component did mount

  console.log('TableFileStatus, localInput: ', tableProps);

  const hour = getHours(new Date());

  useEffect(() => {
    if (id === undefined) {
      if (hour < 9) {
        startDate.setValue(subDays(new Date(), 1));
        endDate.setValue(subDays(new Date(), 1));

        return;
      }
      startDate.setValue(new Date());
      endDate.setValue(new Date());
      return;
    }
    let params = id.split('*');
    localInput.setValue(params[0]);
    selectDate(params[1]);

    console.log('date: ');
  }, []);

  useEffect(() => {
    setIsToday(todayDate(startDate.value, endDate.value));
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

  const todayDate = (firstDate, secondDate) => {
    if (hour < 9) {
      if (isYesterday(new Date(firstDate)) && isYesterday(new Date(secondDate))) {
        return true;
      }
    }
    if (isToday(new Date(firstDate)) && isToday(new Date(secondDate))) {
      return true;
    }
    return false;
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
