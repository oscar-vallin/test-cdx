import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';
import { useParams } from 'react-router-dom';
import { format, isYesterday, lastDayOfMonth, startOfMonth, startOfYesterday, subMonths } from 'date-fns';

import { Box, Row, Column, Container, RightColumn } from './TableFileStatus.styles';
import { useTable } from './TableFileStatus.service';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { useTableFilters } from '../../../hooks/useTableFilters';

const TableFileStatus = ({ idPage = 'TableFileStatus', orgSid = 1, dateRange, filter }) => {
  const { tableProps } = useTable(orgSid, dateRange, filter);
  const { localInput, startDate, endDate } = useTableFilters('Extract Name,  Status, Vendor, etc.');

  const { id } = useParams();

  //Component did mount
  useEffect(() => {
    if (id === undefined) {
      return;
    }
    let params = id.split('*');
    localInput.setValue(params[0]);
    selectDate(params[1]);

    console.log('date: ');
  }, []);

  const selectDate = (date) => {
    if (date === 'today') {
      const startDay = format(new Date(), 'MM/dd/yyyy hh:mm a');
      startDate.setValue(startDay);
      endDate.setValue(startDay);
    }
    if (date === 'yesterday') {
      const startDay = format(startOfYesterday(new Date()), 'MM/dd/yyyy hh:mm a');
      startDate.setValue(startDay);
      endDate.setValue(startDay);
    }
    if (date === 'thisMonth') {
      const startDay = format(startOfMonth(new Date()), 'MM/dd/yyyy hh:mm a');
      const endDay = format(lastDayOfMonth(new Date()), 'MM/dd/yyyy hh:mm a');

      startDate.setValue(startDay);
      endDate.setValue(endDay);
    }
    if (date === 'lastMonth') {
      const startDay = format(startOfMonth(subMonths(new Date(), 1)), 'MM/dd/yyyy hh:mm a');
      const endDay = format(lastDayOfMonth(subMonths(new Date(), 1)), 'MM/dd/yyyy hh:mm a');
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
