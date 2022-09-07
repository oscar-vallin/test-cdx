import { useEffect, useState } from 'react';

import { useTableFilters } from 'src/hooks/useTableFilters';
import { Row, Column } from 'src/components/layouts';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import {
  OrganizationLink,
  useExchangeActivityErroredLazyQuery,
  useExchangeActivityInProcessLazyQuery,
  useExchangeActivityTransmittedLazyQuery,
} from 'src/data/services/graphql';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { useHistory } from 'react-router-dom';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { TableFilters } from '../TableFilters';
import { Container, TableContainer } from './TableActivity.styles';
import { TableActivity } from './TableActivity';

const TablesCurrentActivity = ({ id = 'TableCurrentActivity' }) => {
  const { orgSid } = useOrgSid();
  const history = useHistory();
  const ActiveDomainStore = useActiveDomainStore();
  const handleError = ErrorHandler();

  const { searchText, startDate, endDate } = useTableFilters('Name, Id, Last Activity');
  const [apiCompleted, { data: dataCompleted, loading: loadingCompleted, error: errorCompleted }] = useQueryHandler(
    useExchangeActivityTransmittedLazyQuery,
  );
  const [apiErrored, { data: dataErrored, loading: loadingErrored, error: errorErrored }] = useQueryHandler(
    useExchangeActivityErroredLazyQuery,
  );
  const [apiInProcess, { data: dataInProcess, loading: loadingInProcess, error: errorInProcess }] = useQueryHandler(
    useExchangeActivityInProcessLazyQuery,
  );

  useEffect(() => {
    handleError(errorCompleted);
  }, [errorCompleted]);
  useEffect(() => {
    handleError(errorErrored);
  }, [errorErrored]);
  useEffect(() => {
    handleError(errorInProcess);
  }, [errorInProcess]);

  const [completedItems, setCompletedItems] = useState<OrganizationLink[]>([]);
  const [erroredItems, setErroredItems] = useState<OrganizationLink[]>([]);
  const [inProcessItems, setInProcessItems] = useState<OrganizationLink[]>([]);

  useEffect(() => {
    apiInProcess({
      variables: {
        orgSidInput: { orgSid },
        searchText: searchText.delayedValue,
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
        searchText: searchText.delayedValue,
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
        searchText: searchText.delayedValue,
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

  const onClick = (_orgSid?: string | null) => {
    const _urlParams = new URLSearchParams(window.location.search);
    const _startDate = _urlParams.get('startDate');
    const _endDate = _urlParams.get('endDate');
    ActiveDomainStore.setCurrentOrg({
      orgSid: _orgSid,
    });
    history.push(`/file-status?orgSid=${_orgSid}&startDate=${_startDate}&endDate=${_endDate}`);
  };

  return (
    <Container id={id}>
      <TableFilters id={id} searchText={searchText} startDate={startDate} endDate={endDate} />
      <TableContainer>
        <Row>
          <Column lg="6">
            <TableActivity
              onClick={onClick}
              id="__Table__In__Process"
              tableName="In Process"
              items={inProcessItems}
              color="info"
              loading={false}
              emptyMessage="There are no clients with files In Process in this date range"
            />
          </Column>
          <Column lg="6">
            <TableActivity
              onClick={onClick}
              id="__Table__Completed"
              tableName="Completed"
              color="complete"
              items={completedItems}
              loading={false}
              emptyMessage="There are no clients with Completed files in this date range"
            />
          </Column>
        </Row>
        <Row>
          <Column lg="12">
            <TableActivity
              onClick={onClick}
              id="__Table__Errored"
              tableName="Errored"
              color="error"
              items={erroredItems}
              loading={false}
              emptyMessage="There are no clients with files in Error in this date range"
            />
          </Column>
        </Row>
      </TableContainer>
    </Container>
  );
};

TablesCurrentActivity.propTypes = {};

export { TablesCurrentActivity };
export default TablesCurrentActivity;
