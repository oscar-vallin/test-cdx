import PropTypes from 'prop-types';
import { Table } from '../../../components/tables/Table';
import { Label } from '@fluentui/react/lib/Label';

import { Box, StyledRow, Column, Container, FilterSection } from './TableArchive.styles';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { Card } from '../../../components/cards/Card';
import { Spacing } from '../../../components/spacings/Spacing';
import { Spinner } from '../../../components/spinners/Spinner';
import { useTableTemplate } from '../../../hooks/useTableTemplate';
import { TABLE_NAMES } from '../../../data/constants/TableConstants';
import { useTableFilters } from '../../../hooks/useTableFilters';
import { useParams } from 'react-router-dom';
import { useEffect, Fragment } from 'react';

import { useAuthContext } from '../../../contexts/AuthContext';

const TableArchive = ({ idPage = 'TableArchive', _orgSid = 1, onItemsListChange = () => {} }) => {
  const { orgSid } = useAuthContext();
  const { localInput, startDate, endDate, selectDate } = useTableFilters(
    'Extract Name,  Status, Vendor, etc.',
    useParams()
  );

  const { tableProps } = useTableTemplate(
    TABLE_NAMES.ARCHIVES,
    orgSid,
    { rangeStart: startDate.value, rangeEnd: endDate.value },
    localInput.value,
    '',
    localInput.value
  );

  //Component did mount
  useEffect(() => {}, []);

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
        <Box id={`${idPage}`}>
          {tableProps.loading ? (
            <Spacing margin={{ top: 'double' }}>
              <Spinner size="lg" label="Fetching archives" />
            </Spacing>
          ) : (
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
          )}
        </Box>
      </Container>
    </Fragment>
  );
};

TableArchive.propTypes = {
  id: PropTypes.string,
  _orgSid: PropTypes.string,
  dateRange: PropTypes.array,
  filter: PropTypes.string,
};

export { TableArchive };
