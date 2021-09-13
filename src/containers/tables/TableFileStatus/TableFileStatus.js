/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Label } from '@fluentui/react/lib/Label';
import { useParams, useLocation } from 'react-router-dom';
import { Table } from '../../../components/tables/Table';

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
import { useQueryParams } from '../../../hooks/useQueryParams';

const TableFileStatus = ({
  idPage = 'TableFileStatus',
  onItemsListChange = () => {
    return null;
  },
}) => {
  const QueryParams = useQueryParams();

  const location = useLocation();
  const urlParams = QueryParams.parse(location.search);

  const { localInput, startDate, endDate } = useTableFilters('Extract Name,  Status, Vendor, etc.');

  const { tableProps } = useTableTemplate(
    TABLE_NAMES.FILE_STATUS,
    urlParams?.orgSid,
    { rangeStart: startDate.value, rangeEnd: endDate.value },
    localInput.value,
    '',
    localInput.value
  );

  const { id } = useParams();
  const { search } = useLocation();

  const selectDate = (date) => {
    const _startDay = getStartDay(date);
    const _endDay = getEndDay(date);

    startDate.setValue(_startDay);
    endDate.setValue(_endDay);
  };

  useEffect(() => {
    if (urlParams.startDate && urlParams.endDate) {
      startDate.setValue(new Date(`${urlParams.startDate} 00:00:00`));
      endDate.setValue(new Date(`${urlParams.endDate} 00:00:00`));
    }
  }, [urlParams.startDate, urlParams.endDate]);

  // Component did mount
  useEffect(() => {
    const date = new URLSearchParams(search).get('date');

    if (date) {
      selectDate(date);
    }

    if (id === undefined) {
      return;
    }
    const params = id.split('*');
    localInput.setValue(params[0]);
    selectDate(params[1]);
  }, []);

  return (
    <>
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
              onItemsListChange={(items) => {
                onItemsListChange({
                  count: items.length,
                  loading: tableProps.loading,
                });
              }}
              {...tableProps}
            />
          </Box>
        )}
      </Container>
    </>
  );
};

TableFileStatus.propTypes = {
  id: PropTypes.string,
  orgSid: PropTypes.string,
  dateRange: PropTypes.array,
  filter: PropTypes.string,
};

export { TableFileStatus };
