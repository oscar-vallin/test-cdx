import React from 'react';
import { IColumn, Link } from '@fluentui/react';
import { format } from 'date-fns';
import {
  Maybe, Scalars,
  WorkPacketCommand,
  WorkPacketCommandType,
  WorkPacketStatus,
  WpProcessError,
  WpTransmission
} from 'src/data/services/graphql';
import { CellItemRow, StyledCell } from 'src/components/tables/Table/Table.styles';
import { HighlightCounter } from 'src/components/badges/HighlightCounter';
import { getStepStatusLabel } from 'src/data/constants/FileStatusConstants';
import { FileProgress } from '../bars/FileProgress';
import { useOrgSid } from 'src/hooks/useOrgSid';

export const useWorkPacketColumns = (
  selectedColumns: WorkPacketColumns[],
  onSort?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void
) => {
  const {startDate, endDate} = useOrgSid();

  const graphQLUrl = process.env.REACT_APP_API_SERVER;
  const serverUrl = graphQLUrl?.replace('/graphql', '') ?? '';

  const renderDownloadLink = (workOrderId?: string, commands?: Maybe<Array<Maybe<WorkPacketCommand>>> | undefined, filePath?: Maybe<Scalars["String"]> | undefined) => {

    const idx = filePath?.lastIndexOf('/') ?? -1;
    const fileName = filePath?.substring(idx + 1);
    if (commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.DownloadFile)) {
      return (
        <CellItemRow>
          <Link href={`${serverUrl}k/archive/download?workOrderID=${workOrderId}&s3Key=${filePath}`} target="_new">
            {fileName}
          </Link>
        </CellItemRow>
      );
    } else {
      return <span>{fileName}</span>;
    }
  };

  const columnOptions: IColumn[] = [
    {
      key: 'timestamp',
      name: 'Received On',
      className: 'Datetime',
      targetWidthProportion: 1,
      minWidth: 140,
      maxWidth: 180,
      fieldName: 'timestamp',
      isSorted: true,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted Oldest to Most Recent',
      sortDescendingAriaLabel: 'Sorted Most Recent to Oldest',
      data: WorkPacketColumns.TIMESTAMP,
      onColumnClick: onSort,
      onRender: (item: WorkPacketStatus) => {
        const timestamp = format(new Date(item.timestamp), 'MM/dd/yyyy hh:mm a');
        if (item.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.ViewDetails)) {
          return (
            <CellItemRow>
              <Link href={`/file-status/${item.workOrderId}?orgSid=${item.orgSid}&startDate=${startDate}&endDate=${endDate}`}>
                {timestamp}
              </Link>
              {item.recordHighlightCount && (
                <HighlightCounter
                  id={`__FileStatus_Highlight_Counter_${item.workOrderId}`}
                  type={item.recordHighlightType}
                  href={`/file-status/${item.workOrderId}?orgSid=${item.orgSid}&startDate=${startDate}&endDate=${endDate}*#quality`}
                >
                  {item.recordHighlightCount}
                </HighlightCounter>
              )}
            </CellItemRow>
          );
        } else {
          return (
            <CellItemRow>
              <span>{timestamp}</span>
              {item.recordHighlightCount && (
                <HighlightCounter
                  id={`__FileStatus_Highlight_Counter_${item.workOrderId}`}
                  type={item.recordHighlightType}
                >
                  {item.recordHighlightCount}
                </HighlightCounter>
              )}
            </CellItemRow>
          );

        }
      },
    },
    {
      key: 'deliveredOn',
      name: 'Delivered On',
      className: 'Datetime',
      targetWidthProportion: 1,
      minWidth: 140,
      maxWidth: 150,
      fieldName: 'deliveredOn',
      isSorted: true,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted Oldest to Most Recent',
      sortDescendingAriaLabel: 'Sorted Most Recent to Oldest',
      data: WorkPacketColumns.DATETIME,
      onColumnClick: onSort,
      onRender: (item: WpTransmission) => {
        const timestamp = format(new Date(item.deliveredOn), 'MM/dd/yyyy hh:mm a');
        if (item.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.ViewDetails)) {
          return (
            <Link href={`/file-status/${item.workOrderId}?orgSid=${item.orgSid}&startDate=${startDate}&endDate=${endDate}`}>
              {timestamp}
            </Link>
          );
        } else {
          return <span>{timestamp}</span>;
        }
      },
    },
    {
      key: 'startTime',
      name: 'Start Time',
      className: 'Datetime',
      targetWidthProportion: 1,
      minWidth: 140,
      maxWidth: 150,
      fieldName: 'startTime',
      isSorted: true,
      isSortedDescending: true,
      sortAscendingAriaLabel: 'Sorted Oldest to Most Recent',
      sortDescendingAriaLabel: 'Sorted Most Recent to Oldest',
      data: WorkPacketColumns.START_TIME,
      onColumnClick: onSort,
      onRender: (item: WpProcessError) => {
        const timestamp = format(new Date(item.startTime), 'MM/dd/yyyy hh:mm a');
        if (item.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.ViewDetails)) {
          return (
            <Link href={`/file-status/${item.workOrderId}?orgSid=${item.orgSid}&startDate=${startDate}&endDate=${endDate}`}>
              {timestamp}
            </Link>
          );
        } else {
          return <span>{timestamp}</span>;
        }
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
      data: WorkPacketColumns.VENDOR,
      onColumnClick: onSort,
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
      data: WorkPacketColumns.PLAN_SPONSOR,
      onColumnClick: onSort,
    },
    {
      key: 'orgId',
      name: 'Sponsor',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 120,
      fieldName: 'orgId',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      data: WorkPacketColumns.ORG_ID,
      onColumnClick: onSort,
    },
    {
      key: 'inboundFilename',
      name: 'Extract Name',
      targetWidthProportion: 2,
      minWidth: 100,
      maxWidth: 500,
      fieldName: 'inboundFilename',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      data: WorkPacketColumns.INBOUND_FILENAME,
      onColumnClick: onSort,
    },
    {
      key: 'outboundFilename',
      name: 'Vendor File',
      targetWidthProportion: 2,
      minWidth: 100,
      maxWidth: 500,
      fieldName: 'outboundFilename',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      data: WorkPacketColumns.OUTBOUND_FILENAME,
      onColumnClick: onSort,
    },
    {
      key: 'outboundFilesize',
      name: 'Outbound File Size',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 120,
      fieldName: 'outboundFilesize',
      sortAscendingAriaLabel: 'Sorted Smallest to Largest',
      sortDescendingAriaLabel: 'Sorted Largest to Smallest',
      isPadded: true,
      data: WorkPacketColumns.OUTBOUND_FILESIZE,
      onColumnClick: onSort,
    },
    {
      key: 'specId',
      name: 'Spec',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 120,
      fieldName: 'specId',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      data: WorkPacketColumns.SPEC_ID,
      onColumnClick: onSort,
    },
    {
      key: 'implementation',
      name: 'Implementation',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 120,
      fieldName: 'implementation',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      data: WorkPacketColumns.IMPLEMENTATION,
      onColumnClick: onSort,
    },
    {
      key: 'billingCount',
      name: 'Billing Unit Count',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 120,
      fieldName: 'billingCount',
      sortAscendingAriaLabel: 'Sorted Smallest to Largest',
      sortDescendingAriaLabel: 'Sorted Largest to Smallest',
      isPadded: true,
      data: WorkPacketColumns.BILLING_COUNT,
      onColumnClick: onSort,
    },
    {
      key: 'packetStatus',
      name: 'Overall',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 120,
      fieldName: 'packetStatus',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      data: WorkPacketColumns.PACKET_STATUS,
      onColumnClick: onSort,
      onRender: (item: WorkPacketStatus) => {
        return <span>{getStepStatusLabel(item.packetStatus)}</span>;
      },
    },
    {
      key: 'step',
      name: 'Work Step',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 120,
      fieldName: 'step',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      data: WorkPacketColumns.STEP,
      onColumnClick: onSort,
      onRender: (item: WpProcessError) => {
        return <span>{item.stepName}</span>;
      },
    },
    {
      key: 'progress',
      name: 'Progress',
      targetWidthProportion: 2,
      minWidth: 150,
      maxWidth: 300,
      data: WorkPacketColumns.PROGRESS,
      onRender: (item: WorkPacketStatus) => {
        return (
          <StyledCell id={`__Progress_${item.workOrderId}`}>
            <FileProgress step={item.step} stepStatus={item.stepStatus}/>
          </StyledCell>
        );
      },
    },
    {
      key: 'inboundFileName',
      name: 'Client File',
      targetWidthProportion: 1,
      minWidth: 100,
      maxWidth: 300,
      fieldName: 'clientFileArchivePath',
      isSorted: false,
      isSortedDescending: false,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      data: WorkPacketColumns.CLIENT_FILE,
      onColumnClick: onSort,
      onRender: (item: WorkPacketStatus) => renderDownloadLink(item.workOrderId, item.commands, item.clientFileArchivePath),
    },
    {
      key: 'vendorFileArchivePath',
      name: 'Vendor File',
      targetWidthProportion: 1,
      minWidth: 100,
      maxWidth: 300,
      fieldName: 'vendorFileArchivePath',
      isSorted: false,
      isSortedDescending: false,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      data: WorkPacketColumns.VENDOR_FILE,
      onColumnClick: onSort,
      onRender: (item: WorkPacketStatus) => renderDownloadLink(item.workOrderId, item.commands, item.vendorFileArchivePath),
    },
    {
      key: 'totalRecords',
      name: 'Total Records',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 120,
      fieldName: 'totalRecords',
      sortAscendingAriaLabel: 'Sorted Smallest to Largest',
      sortDescendingAriaLabel: 'Sorted Largest to Smallest',
      isPadded: true,
      data: WorkPacketColumns.TOTAL_RECORDS,
      onColumnClick: onSort,
    },
    {
      key: 'extractType',
      name: 'Feed',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 120,
      fieldName: 'extractType',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      data: WorkPacketColumns.EXTRACT_TYPE,
      onColumnClick: onSort,
    },
    {
      key: 'extractVersion',
      name: 'Version',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 120,
      fieldName: 'extractVersion',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      data: WorkPacketColumns.EXTRACT_VERSION,
      onColumnClick: onSort,
    },
    {
      key: 'msg',
      name: 'Message',
      targetWidthProportion: 1,
      minWidth: 100,
      maxWidth: 300,
      fieldName: 'msg',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      data: WorkPacketColumns.MESSAGE,
      onColumnClick: onSort,
    },
  ];

  const initialColumns = (): IColumn[] => {
    const initCols: IColumn[] = [];
    selectedColumns.forEach((sCol: WorkPacketColumns) => {
      const matching = columnOptions.find((colOpt: IColumn) => {
        return colOpt.data === sCol;
      });
      if (matching != null) {
        initCols.push(matching);
      } else {
        console.error(`Could not find a Work Packet column for ${sCol}`);
      }
    });
    return initCols;
  };

  return {
    initialColumns,
  };
};

export enum WorkPacketColumns {
  TIMESTAMP,
  DATETIME,
  START_TIME,
  VENDOR,
  ORG_ID,
  PLAN_SPONSOR,
  INBOUND_FILENAME,
  OUTBOUND_FILENAME,
  OUTBOUND_FILESIZE,
  SPEC_ID,
  IMPLEMENTATION,
  BILLING_COUNT,
  STEP,
  PACKET_STATUS,
  PROGRESS,
  CLIENT_FILE,
  VENDOR_FILE,
  TOTAL_RECORDS,
  EXTRACT_TYPE,
  EXTRACT_VERSION,
  MESSAGE,
}
