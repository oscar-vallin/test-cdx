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
import { getHours } from 'date-fns';

const TableArchive = ({ idPage = 'TableArchive', orgSid = 1, dateRange, filter }) => {
  const { localInput, startDate, endDate } = useTableFilters('Extract Name,  Status, Vendor, etc.');
  // const { tableProps } = useTable(
  //   orgSid,
  //   { rangeStart: startDate.value, rangeEnd: endDate.value },
  //   localInput.value,
  //   '',
  //   localInput.value
  // );

  const { tableProps } = useTableTemplate(
    TABLE_NAMES.ARCHIVES,
    orgSid,
    { rangeStart: startDate.value, rangeEnd: endDate.value },
    localInput.value,
    '',
    localInput.value
  );

  const { id } = useParams();

  //Component did mount
  useEffect(() => {
    const hour = getHours(new Date());

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
  }, []);

  const selectDate = (date) => {
    const _startDay = getStartDay(date);
    const _endDay = getEndDay(date);

    startDate.setValue(_startDay);
    endDate.setValue(_endDay);
  };

  console.log('Archive return Props: ', tableProps);

  return (
    <Container>
      <Row id={`${idPage}-filters`} around>
        <Column center>
          <InputText id={`${id}__Card__Row__Input-Email`} autoFocus disabled={false} {...localInput} />
        </Column>
        <RightColumn center>
          <InputDateRange startDate={startDate} endDate={endDate} />
        </RightColumn>
      </Row>
      <Box id={`${id}`}>
        <Table
          id={`${id}`}
          onOption={() => console.log('Table click')}
          searchInput={localInput.value}
          {...tableProps}
        />
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
