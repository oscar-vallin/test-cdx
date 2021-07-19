import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';

import { Box, StyledRow, Column, Container, FilterSection } from './TableTransmissions.styles';
import { Card } from '../../../components/cards/Card';
import { Spacing } from '../../../components/spacings/Spacing';
import { Spinner } from '../../../components/spinners/Spinner';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { useTableFilters } from '../../../hooks/useTableFilters';
import { TABLE_NAMES } from '../../../data/constants/TableConstants';
import { useTableTemplate } from '../../../hooks/useTableTemplate';
import { useParams, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const TableTransmissions = ({ idPage = 'TableTransmissions', orgSid = 1, dateRange, filter, onItemsListChange = () => {} }) => {
  const { localInput, startDate, endDate } = useTableFilters('Extract Name,  Status, Vendor, etc.', useParams());
  const { search } = useLocation();
  const paramsDate = new URLSearchParams(search).get('date');
  const [date, _setDate] = useState(paramsDate);
  const [urlParams, _setUrlParams] = useState(queryString.parse(search));

  const { tableProps } = useTableTemplate(
    TABLE_NAMES.TRANSMISSIONS,
    orgSid,
    { rangeStart: startDate.value, rangeEnd: endDate.value },
    localInput.value,
    '',
    localInput.value
  );

  useEffect(() => {
    if (urlParams.startDate && urlParams.endDate) {
      startDate.setValue(new Date(`${urlParams.startDate} 00:00:00`));
      endDate.setValue(new Date(`${urlParams.endDate} 00:00:00`));
    }
  }, []);

  return (
    <Fragment>
      <FilterSection id={`${idPage}-filters`}>
        <Container>
          <Card elevation="smallest">
            <StyledRow>
              <Column lg="6">
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
        <Box id={`${idPage}`}>
          {tableProps.loading
            ? <Spacing margin={{ top: 'double' }}>
                <Spinner size="lg" label="Fetching transmissions" />
              </Spacing>
            : (
              <Table
                id={`${idPage}`}
                onOption={() => null}
                searchInput={localInput.value}
                date={date}
                onItemsListChange={items => onItemsListChange({
                  count: items.length,
                  loading: tableProps.loading,
                })}
                {...tableProps}
              />
          )}
        </Box>
      </Container>
    </Fragment>
  );
};

TableTransmissions.propTypes = {
  id: PropTypes.string,
  orgSid: PropTypes.string,
  dateRange: PropTypes.array,
  filter: PropTypes.string,
};

export { TableTransmissions };
