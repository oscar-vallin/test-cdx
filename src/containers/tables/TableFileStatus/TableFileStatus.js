import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text } from '../../../components/typography/Text';
import { Table } from '../../../components/tables/Table';
import { Label } from '@fluentui/react/lib/Label';

import { useParams, useLocation } from 'react-router-dom';

import { Box, StyledRow, Column, Container, FilterSection } from './TableFileStatus.styles';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { Card } from '../../../components/cards/Card';
import { Spacing } from '../../../components/spacings/Spacing';
import { Spinner } from '../../../components/spinners/Spinner';
import { useTableFilters } from '../../../hooks/useTableFilters';
import { TABLE_NAMES } from '../../../data/constants/TableConstants';
import { useTableTemplate } from '../../../hooks/useTableTemplate';
import { getStartDay, getEndDay } from '../../../helpers/tableHelpers';
import { useAuthContext } from '../../../contexts/AuthContext';
import queryString from 'query-string';

const TableFileStatus = ({
  idPage = 'TableFileStatus',
  _orgSid = 1,
  dateRange,
  filter,
  onItemsListChange = () => {},
}) => {
  const { localInput, startDate, endDate } = useTableFilters('Extract Name,  Status, Vendor, etc.');
  const location = useLocation();
  const [urlParams, setUrlParams] = useState(queryString.parse(location.search));
  const { authData, orgSid } = useAuthContext();

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
    <Fragment>
      <FilterSection id={`${idPage}-filters`}>
        <Container>
          <Card elevation="smallest">
            <StyledRow>
              <Column lg="6">
                <Label>Search</Label>
                <InputText id={`${idPage}__Card__Row__Input-Email`} autoFocus disabled={false} {...localInput} />
              </Column>
              <Column lg="6">
                <InputDateRange startDate={startDate} endDate={endDate} />
              </Column>
            </StyledRow>
          </Card>
        </Container>
      </FilterSection>

      <Container>
        {tableProps.loading ? (
          <Spacing margin={{ top: 'double' }}>
            <Spinner size="lg" label="Fetching file status" />
          </Spacing>
        ) : (
          <Box id={`${idPage}`}>
            <Table
              id={`${idPage}`}
              onOption={() => null}
              searchInput={localInput.value}
              onItemsListChange={(items) =>
                onItemsListChange({
                  count: items.length,
                  loading: tableProps.loading,
                })
              }
              {...tableProps}
            />
          </Box>
        )}
      </Container>
    </Fragment>
  );
};

TableFileStatus.propTypes = {
  id: PropTypes.string,
  orgSid: PropTypes.string,
  dateRange: PropTypes.array,
  filter: PropTypes.string,
};

export { TableFileStatus };
