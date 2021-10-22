import React from 'react';
import { IColumn } from 'office-ui-fabric-react/lib-commonjs/DetailsList';
import { format } from 'date-fns';
import { Link } from 'office-ui-fabric-react/lib-commonjs/Link';
import { WorkPacketStatus } from '../../data/services/graphql';
import { CellItemRow, RouteLink, StyledCell } from '../../components/tables/Table/Table.styles';
import { HighlightCounter } from '../../components/badges/HighlightCounter';
import { getStepStatusLabel } from '../../data/constants/FileStatusConstants';
import { FileProgress } from '../bars/FileProgress';

export const useWorkPacketColumns = (onSort?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void) => {
  const timeStampCol: IColumn = {
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
    onColumnClick: onSort,
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
  };

  const vendorCol: IColumn = {
    key: 'vendorId',
    name: 'Vendor',
    targetWidthProportion: 1,
    minWidth: 80,
    maxWidth: 150,
    fieldName: 'vendorId',
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    isPadded: true,
    onColumnClick: onSort,
  };

  const planSponsorCol: IColumn = {
    key: 'planSponsorId',
    name: 'Sponsor',
    targetWidthProportion: 1,
    minWidth: 80,
    maxWidth: 120,
    fieldName: 'planSponsorId',
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    isPadded: true,
    onColumnClick: onSort,
  };

  const fileNameCol: IColumn = {
    key: 'inboundFilename',
    name: 'Extract Name',
    targetWidthProportion: 2,
    minWidth: 100,
    maxWidth: 300,
    fieldName: 'inboundFilename',
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    isPadded: true,
    onColumnClick: onSort,
  };

  const stepStatusCol: IColumn = {
    key: 'stepStatus',
    name: 'Overall',
    targetWidthProportion: 1,
    minWidth: 80,
    maxWidth: 120,
    fieldName: 'stepStatus',
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    isPadded: true,
    onColumnClick: onSort,
    onRender: (item: WorkPacketStatus) => {
      return <span>{getStepStatusLabel(item.stepStatus)}</span>;
    },
  };

  const progressCol: IColumn = {
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
  };

  const clientFileCol: IColumn = {
    key: 'inboundFileName',
    name: 'Client File',
    targetWidthProportion: 1,
    minWidth: 100,
    maxWidth: 300,
    fieldName: 'clientFileArchivePath',
    isSorted: true,
    isSortedDescending: true,
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    onColumnClick: onSort,
    onRender: (item: WorkPacketStatus) => {
      return (
        <CellItemRow>
          <Link>
            <RouteLink to={`${item.clientFileArchivePath}`}>{item.inboundFilename}</RouteLink>
          </Link>
        </CellItemRow>
      );
    },
  };

  const vendorFileCol: IColumn = {
    key: 'vendorFileArchivePath',
    name: 'Vendor File',
    targetWidthProportion: 1,
    minWidth: 100,
    maxWidth: 300,
    fieldName: 'vendorFileArchivePath',
    isSorted: true,
    isSortedDescending: true,
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    onColumnClick: onSort,
    onRender: (item: WorkPacketStatus) => {
      return (
        <CellItemRow>
          <Link>
            <RouteLink to={`${item.vendorFileArchivePath}`}>{item.workOrderId}</RouteLink>
          </Link>
        </CellItemRow>
      );
    },
  };

  return {
    timeStampCol,
    vendorCol,
    planSponsorCol,
    fileNameCol,
    stepStatusCol,
    progressCol,
    clientFileCol,
    vendorFileCol,
  };
};

export enum WorkPacketColumns {
  TIMESTAMP,
  VENDOR,
  PLAN_SPONSOR,
  FILENAME,
  STEP_STATUS,
  PROGRESS,
  CLIENT_FILE,
  VENDOR_FILE = 7,
}
