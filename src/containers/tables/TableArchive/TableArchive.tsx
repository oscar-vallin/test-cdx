import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Label } from '@fluentui/react/lib/Label';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
} from 'office-ui-fabric-react/lib-commonjs/DetailsList';
import { mergeStyleSets } from 'office-ui-fabric-react/lib-commonjs/Styling';

import { useLocation } from 'react-router-dom';
import { StyledContainer, StyledSpacing, StyledText } from '../../../components/tables/Table/Table.styles';
import { Box, Column, Container, FilterSection, StyledRow } from '../WorkPacketTable.styles';
import { InputText } from '../../../components/inputs/InputText';
import { InputDateRange } from '../../../components/inputs/InputDateRange';
import { Card } from '../../../components/cards';
import { Spinner } from '../../../components/spinners/Spinner';
import { useTableFilters } from '../../../hooks/useTableFilters';
import {
  NullHandling,
  PageableInput,
  SortDirection,
  useWorkPacketStatusesLazyQuery,
  WorkPacketStatus,
} from '../../../data/services/graphql';
import { useWorkPacketColumns } from '../WorkPacketColumns';

const TableArchive = ({ idPage = 'TableArchive' }) => {
  const [pagingParams, setPagingParams] = useState<PageableInput>({
    pageNumber: 0,
    pageSize: 100,
    sort: [
      { property: 'timestamp', direction: SortDirection.Desc, nullHandling: NullHandling.NullsFirst, ignoreCase: true },
    ],
  });

  const doNothing = () => {};
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const orgSid = urlParams.get('orgSid') ?? '-1';

  const { localInput, startDate, endDate } = useTableFilters('Extract Name,  Status, Vendor, etc.');

  const [apiCall, { data, loading, error }] = useWorkPacketStatusesLazyQuery({
    variables: {
      orgSid,
      searchText: localInput.delayedValue,
      dateRange: { rangeStart: startDate.value, rangeEnd: endDate.value },
      pageableInput: pagingParams,
    },
  });

  const _doSort = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter((currCol) => column.key === currCol.key)[0];
    let sortParam: PageableInput = pagingParams;
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        sortParam = {
          pageNumber: 0,
          pageSize: 100,
          sort: [
            {
              property: currColumn.key,
              direction: currColumn.isSortedDescending ? SortDirection.Desc : SortDirection.Asc,
              nullHandling: NullHandling.NullsFirst,
              ignoreCase: true,
            },
          ],
        };
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    setPagingParams(sortParam);
    setColumns(newColumns);
  };

  const { timeStampCol, vendorCol, planSponsorCol, clientFileCol, vendorFileCol } = useWorkPacketColumns(_doSort);

  const [columns, setColumns] = useState<IColumn[]>([
    timeStampCol,
    vendorCol,
    planSponsorCol,
    clientFileCol,
    vendorFileCol,
  ]);

  useEffect(() => {
    apiCall();
  }, [apiCall]);

  const renderTable = () => {
    const classNames = mergeStyleSets({
      root: {
        width: '100%',
      },

      headerDivider: {
        display: 'inline-block',
        height: '100%',
      },
    });

    if (error) {
      return <span>Error: {error}</span>;
    }

    if (loading) {
      return (
        <StyledSpacing margin={{ top: 'double' }}>
          <Spinner size="lg" label="Loading data" />
        </StyledSpacing>
      );
    }

    const items: WorkPacketStatus[] = [];
    data?.workPacketStatuses?.nodes?.map((value) => {
      if (value) {
        items.push(value);
      }
    });

    if (items && items.length > 0) {
      return (
        <DetailsList
          className={classNames.root}
          items={items}
          columns={columns}
          selectionMode={SelectionMode.none}
          setKey="none"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible
        />
      );
    }

    return <StyledText bold>No data available</StyledText>;
  };

  return (
    <>
      <FilterSection id={`${idPage}-filters`}>
        <Container>
          <Card id={`${idPage}__SearchCard`} elevation="smallest">
            <StyledRow>
              <Column lg="6">
                <Label>Search</Label>
                <InputText
                  id={`${idPage}__Card__Row__Input-Search`}
                  onKeyDown={doNothing}
                  onKeyEnter={doNothing}
                  autoFocus
                  disabled={false}
                  {...localInput}
                />
              </Column>
              <Column lg="6">
                <InputDateRange startDate={startDate} endDate={endDate} />
              </Column>
            </StyledRow>
          </Card>
        </Container>
      </FilterSection>

      <Container>
        <Box id={`${idPage}_TableWrap`}>
          <StyledContainer id="Table_Detailed" style={{ width: '100%' }}>
            {renderTable()}
          </StyledContainer>
        </Box>
      </Container>
    </>
  );
};

TableArchive.propTypes = {
  id: PropTypes.string,
  orgSid: PropTypes.string,
  dateRange: PropTypes.array,
  filter: PropTypes.string,
};

export { TableArchive };
