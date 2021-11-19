import { useEffect, useState } from 'react';
import { TableActivity } from './TableActivity';
import { Container, TableContainer } from './TableActivity.styles';

import { useTableFilters } from '../../../hooks/useTableFilters';
import { TableFilters } from '../TableFilters';
import { Row, Column } from '../../../components/layouts';
import { useQueryHandler } from '../../../hooks/useQueryHandler';
import {
  OrganizationLink,
  useExchangeActivityErroredLazyQuery,
  useExchangeActivityInProcessLazyQuery,
  useExchangeActivityTransmittedLazyQuery,
} from '../../../data/services/graphql';
import { useOrgSid } from '../../../hooks/useOrgSid';

const TablesCurrentActivity = ({ id = 'TableCurrentActivity' }) => {
  const { orgSid } = useOrgSid();

  const { searchText, startDate, endDate } = useTableFilters('Name, Id, Last Activity');
  const [apiCompleted, { data: dataCompleted, loading: loadingCompleted, error: errorCompleted }] = useQueryHandler(
    useExchangeActivityTransmittedLazyQuery
  );
  const [apiErrored, { data: dataErrored, loading: loadingErrored, error: errorErrored }] = useQueryHandler(
    useExchangeActivityErroredLazyQuery
  );
  const [apiInProcess, { data: dataInProcess, loading: loadingInProcess, error: errorInProcess }] = useQueryHandler(
    useExchangeActivityInProcessLazyQuery
  );

  const [completedItems, setCompletedItems] = useState<OrganizationLink[]>([]);
  const [erroredItems, setErroredItems] = useState<OrganizationLink[]>([]);
  const [inProcessItems, setInProcessItems] = useState<OrganizationLink[]>([]);

  useEffect(() => {
    apiInProcess({
      variables: {
        orgSidInput: { orgSid },
        dateRange: { rangeStart: startDate.value, rangeEnd: endDate.value },
        pageableInput: {
          pageNumber: 0,
          pageSize: 100,
        },
      },
    });
    apiCompleted({
      variables: {
        orgSidInput: { orgSid },
        dateRange: { rangeStart: startDate.value, rangeEnd: endDate.value },
        pageableInput: {
          pageNumber: 0,
          pageSize: 100,
        },
      },
    });
    apiErrored({
      variables: {
        orgSidInput: { orgSid },
        dateRange: { rangeStart: startDate.value, rangeEnd: endDate.value },
        pageableInput: {
          pageNumber: 0,
          pageSize: 100,
        },
      },
    });
  }, [orgSid, searchText.delayedValue, startDate.value, endDate.value]);

  useEffect(() => {
    if (!loadingInProcess) {
      setInProcessItems(dataInProcess?.exchangeActivityInProcess?.nodes ?? []);
    }
  }, [dataInProcess, loadingInProcess]);

  useEffect(() => {
    if (!loadingCompleted) {
      setCompletedItems(dataCompleted?.exchangeActivityTransmitted?.nodes ?? []);
    }
  }, [dataCompleted, loadingCompleted]);

  useEffect(() => {
    if (!loadingErrored) {
      setErroredItems(dataErrored?.exchangeActivityErrored?.nodes ?? []);
    }
  }, [dataErrored, loadingErrored]);

  return (
    <Container id={id}>
      <TableFilters id={id} searchText={searchText} startDate={startDate} endDate={endDate} />
      <TableContainer>
        <Row>
          <Column lg="6">
            <TableActivity id="__Table__In__Process" tableName="In Process" items={inProcessItems} loading={false} />
          </Column>
          <Column lg="6">
            <TableActivity
              id="__Table__Completed"
              tableName="Completed"
              color="complete"
              items={completedItems}
              loading={false}
            />
          </Column>
        </Row>
        <Row>
          <Column lg="12">
            <TableActivity
              id="__Table__Errored"
              tableName="Errored"
              color="error"
              items={erroredItems}
              loading={false}
            />
          </Column>
        </Row>
      </TableContainer>
    </Container>
  );
};

TablesCurrentActivity.propTypes = {};

export { TablesCurrentActivity };
