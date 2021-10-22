import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Label } from '@fluentui/react/lib/Label';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { Link } from 'office-ui-fabric-react/lib-commonjs/Link';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
} from 'office-ui-fabric-react/lib-commonjs/DetailsList';
import { mergeStyleSets } from 'office-ui-fabric-react/lib-commonjs/Styling';
import { getStepStatusLabel } from '../../../data/constants/FileStatusConstants';
import { HighlightCounter } from '../../../components/badges/HighlightCounter';
import { FileProgress } from '../../bars/FileProgress';
import {
  CellItemRow,
  RouteLink,
  StyledCell,
  StyledContainer,
  StyledSpacing,
  StyledText,
} from '../../../components/tables/Table/Table.styles';
import { Box, Column, Container, FilterSection, StyledRow } from './TableFileStatus.styles';
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

const TableFileStatus = ({ idPage = 'TableFileStatus' }) => {
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

  const [columns, setColumns] = useState<IColumn[]>([
    {
      key: 'timestamp',
      name: 'Received On',
      className: 'Datetime',
      targetWidthProportion: 1,
      minWidth: 140,
      maxWidth: 150,
      fieldName: 'timestamp',
      isSorted: true,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted Oldest to Most Recent',
      sortDescendingAriaLabel: 'Sorted Most Recent to Oldest',
      onColumnClick: _doSort,
      onRender: (item: WorkPacketStatus) => {
        const timestamp = format(new Date(item.timestamp), 'MM/dd/yyyy hh:mm a');
        return (
          <CellItemRow>
            <Link>
              <RouteLink to={`/file-status/${item.workOrderId}`}>{timestamp}</RouteLink>
            </Link>
            {item.recordHighlightCount && (
              <HighlightCounter
                id={`__FileStatus_Highlight_Counter_${item.workOrderId}`}
                type={item.recordHighlightType}
                href={`/file-status/${item.workOrderId}*#quality`}
              >
                {item.recordHighlightCount}
              </HighlightCounter>
            )}
          </CellItemRow>
        );
      },
    },
    {
      key: 'vendorId',
      name: 'Vendor',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 150,
      fieldName: 'vendorId',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      onColumnClick: _doSort,
    },
    {
      key: 'planSponsorId',
      name: 'Sponsor',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 120,
      fieldName: 'planSponsorId',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      onColumnClick: _doSort,
    },
    {
      key: 'inboundFilename',
      name: 'Extract Name',
      targetWidthProportion: 2,
      minWidth: 100,
      maxWidth: 300,
      fieldName: 'inboundFilename',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      onColumnClick: _doSort,
    },
    {
      key: 'stepStatus',
      name: 'Overall',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 120,
      fieldName: 'stepStatus',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      onColumnClick: _doSort,
      onRender: (item: WorkPacketStatus) => {
        return <span>{getStepStatusLabel(item.stepStatus)}</span>;
      },
    },
    {
      key: 'progress',
      name: 'Progress',
      targetWidthProportion: 2,
      minWidth: 100,
      maxWidth: 250,
      onRender: (item: WorkPacketStatus) => {
        return (
          <StyledCell id={`__Progress_${item.workOrderId}`}>
            <FileProgress step={item.step} stepStatus={item.stepStatus} />
          </StyledCell>
        );
      },
    },
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
          <Card id={`${idPage}__SearchCard`} elevation="smallest" onClick="">
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

TableFileStatus.propTypes = {
  id: PropTypes.string,
  orgSid: PropTypes.string,
  dateRange: PropTypes.array,
  filter: PropTypes.string,
};

export { TableFileStatus };
