import { useState } from 'react';
import PropTypes from 'prop-types';
import { Label } from '@fluentui/react/lib/Label';
import { useParams, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Table } from '../../../components/tables';

import { Box, Column, Container, FilterSection, StyledRow } from '../WorkPacketTable.styles';
import { Card } from '../../../components/cards';
import { Spacing } from '../../../components/spacings/Spacing';
import { Spinner } from '../../../components/spinners/Spinner';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { TABLE_NAMES } from '../../../data/constants/TableConstants';
import { useTableFilters } from '../../../hooks/useTableFilters';
import { useTableTemplate } from '../../../hooks/useTableTemplate';

const TableErrors = ({
  idPage = 'TableErrors',
  onItemsListChange = () => {
    return null;
  },
}) => {
  const location = useLocation();
  const [urlParams] = useState(queryString.parse(location.search));
  const { localInput, startDate, endDate } = useTableFilters('Extract Name,  Status, Vendor, etc.', useParams());
  const { tableProps } = useTableTemplate(
    TABLE_NAMES.ERRORS,
    urlParams?.orgSid,
    localInput.value,
    { rangeStart: startDate.value, rangeEnd: endDate.value },
    localInput.value,
    '',
    localInput.value
  );

  return (
    <>
      <FilterSection id={`${idPage}-filters`}>
        <Container>
          <Card elevation="smallest">
            <StyledRow>
              <Column lg="6">
                <Label>Search</Label>
                <InputText id={`${idPage}__Card__Row__Input-Search`} autoFocus disabled={false} {...localInput} />
              </Column>
              <Column lg="6">
                <InputDateRange startDate={startDate} endDate={endDate} />
              </Column>
            </StyledRow>
          </Card>
        </Container>
      </FilterSection>

      <Container>
        <Box id={`${idPage}`}>
          {tableProps.loading ? (
            <Spacing margin={{ top: 'double' }}>
              <Spinner size="lg" label="Fetching errors" />
            </Spacing>
          ) : (
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
          )}
        </Box>
      </Container>
    </>
  );
};

TableErrors.propTypes = {
  id: PropTypes.string,
  _orgSid: PropTypes.string,
  dateRange: PropTypes.array,
  filter: PropTypes.string,
};

export { TableErrors };
