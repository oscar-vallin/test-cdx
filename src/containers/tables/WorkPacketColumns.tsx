import React from 'react';
import { IColumn, Link } from '@fluentui/react';
import { format } from 'date-fns';
import {
  Maybe,
  Scalars,
  WorkPacketCommand,
  WorkPacketCommandType,
  WorkPacketStatus,
  WpProcessError,
  WpTransmission,
} from 'src/data/services/graphql';
import { HighlightCounter } from 'src/components/badges/HighlightCounter';
import { getStepStatusLabel } from 'src/data/constants/FileStatusConstants';
import { DataColumn } from 'src/containers/tables/ColumnHeader';
import { FileProgress } from '../bars/FileProgress';
import { CellItemRow, StyledCell, StyledColumn, Text } from './WorkPacketTable.styles';

export enum WorkPacketColumn {
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

export const useWorkPacketColumns = (
  selectedColumns: WorkPacketColumn[],
  openDetails: (fsOrgSid?: string | null, workOrderId?: string, tab?: string) => void
) => {
  const graphQLUrl = process.env.REACT_APP_API_SERVER;
  const serverUrl = graphQLUrl?.replace('/graphql', '') ?? '';

  const renderDownloadLink = (
    workOrderId?: string,
    commands?: Maybe<Array<Maybe<WorkPacketCommand>>> | undefined,
    filename?: string | null,
    filePath?: Maybe<Scalars['String']> | undefined
  ) => {
    if (commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.DownloadFile)) {
      return (
        <CellItemRow>
          <Link href={`${serverUrl}k/archive/download?workOrderID=${workOrderId}&s3Key=${filePath}`} target="_new">
            {filename}
          </Link>
        </CellItemRow>
      );
    }
    return <span>{filename}</span>;
  };

  const columnOptions: DataColumn[] = [
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
      data: WorkPacketColumn.TIMESTAMP,
      dataType: 'date',
      sortable: true,
      filterable: false,
      onRender: (item: WorkPacketStatus) => {
        const timestamp = format(new Date(item.timestamp), 'MM/dd/yyyy hh:mm a');
        if (
          item.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.ViewDetails) &&
          !item.reprocessedOn &&
          !item.reprocessedBy
        ) {
          return (
            <CellItemRow>
              <Link onClick={() => openDetails(item.orgSid, item.workOrderId)}>{timestamp}</Link>
              {item.recordHighlightCount && (
                <HighlightCounter
                  id={`__FileStatus_Highlight_Counter_${item.workOrderId}`}
                  type={item.recordHighlightType}
                  onClick={() => openDetails(item.orgSid, item.workOrderId, 'quality')}
                >
                  {item.recordHighlightCount}
                </HighlightCounter>
              )}
            </CellItemRow>
          );
        }
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
      data: WorkPacketColumn.DATETIME,
      dataType: 'date',
      sortable: true,
      filterable: false,
      onRender: (item: WpTransmission) => {
        const timestamp = format(new Date(item.deliveredOn), 'MM/dd/yyyy hh:mm a');
        if (item.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.ViewDetails)) {
          return <Link onClick={() => openDetails(item.orgSid, item.workOrderId)}>{timestamp}</Link>;
        }
        return <span>{timestamp}</span>;
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
      data: WorkPacketColumn.START_TIME,
      dataType: 'date',
      sortable: true,
      filterable: false,
      onRender: (item: WpProcessError) => {
        const timestamp = format(new Date(item.startTime), 'MM/dd/yyyy hh:mm a');
        if (item.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.ViewDetails)) {
          return <Link onClick={() => openDetails(item.orgSid, item.workOrderId)}>{timestamp}</Link>;
        }
        return <span>{timestamp}</span>;
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
      data: WorkPacketColumn.VENDOR,
      dataType: 'string',
      sortable: true,
      filterable: true,
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
      data: WorkPacketColumn.PLAN_SPONSOR,
      dataType: 'string',
      sortable: true,
      filterable: true,
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
      data: WorkPacketColumn.ORG_ID,
      dataType: 'string',
      sortable: true,
      filterable: true,
    },
    {
      key: 'inboundFilename',
      name: 'Extract Name',
      targetWidthProportion: 2,
      minWidth: 100,
      maxWidth: 450,
      fieldName: 'inboundFilename',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      data: WorkPacketColumn.INBOUND_FILENAME,
      dataType: 'string',
      sortable: true,
      filterable: true,
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
      data: WorkPacketColumn.OUTBOUND_FILENAME,
      dataType: 'string',
      sortable: true,
      filterable: true,
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
      data: WorkPacketColumn.OUTBOUND_FILESIZE,
      dataType: 'number',
      sortable: true,
      filterable: false,
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
      data: WorkPacketColumn.SPEC_ID,
      dataType: 'string',
      sortable: true,
      filterable: true,
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
      data: WorkPacketColumn.IMPLEMENTATION,
      dataType: 'string',
      sortable: true,
      filterable: true,
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
      data: WorkPacketColumn.BILLING_COUNT,
      dataType: 'number',
      sortable: true,
      filterable: false,
    },
    {
      key: 'packetStatus',
      name: 'Overall',
      targetWidthProportion: 1,
      minWidth: 120,
      maxWidth: 180,
      fieldName: 'packetStatus',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      data: WorkPacketColumn.PACKET_STATUS,
      dataType: 'enum',
      sortable: true,
      filterable: false,
      onRender: (item: WorkPacketStatus) => {
        const reprocessOnTimestamp = item.reprocessedOn
          ? format(new Date(item.reprocessedOn), 'MM/dd/yyyy hh:mm a')
          : null;
        const workOrderId = item.reprocessedBy ?? null;
        if (
          reprocessOnTimestamp &&
          item.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.ViewDetails)
        ) {
          return (
            <StyledColumn>
              <Link
                disabled={!workOrderId}
                onClick={workOrderId ? () => openDetails(item.orgSid, workOrderId) : () => null}
              >
                Reprocessed on
              </Link>
              <Text>{reprocessOnTimestamp}</Text>
            </StyledColumn>
          );
        }
        return <span>{getStepStatusLabel(item.packetStatus)}</span>;
      },
    },
    {
      key: 'stepName',
      name: 'Work Step',
      targetWidthProportion: 1,
      minWidth: 80,
      maxWidth: 120,
      fieldName: 'stepName',
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      isPadded: true,
      data: WorkPacketColumn.STEP,
      dataType: 'string',
      sortable: true,
      filterable: true,
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
      data: WorkPacketColumn.PROGRESS,
      dataType: 'enum',
      sortable: false,
      filterable: false,
      onRender: (item: WorkPacketStatus) => {
        return (
          <StyledCell>
            <FileProgress
              id={`__Progress_${item.workOrderId}`}
              step={item.step}
              stepStatus={item.stepStatus}
              archiveOnly={item.archiveOnly ?? false}
            />
          </StyledCell>
        );
      },
    },
    {
      key: 'inboundFilename',
      name: 'Client File',
      targetWidthProportion: 1,
      minWidth: 100,
      maxWidth: 300,
      fieldName: 'inboundFilename',
      isSorted: false,
      isSortedDescending: false,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      data: WorkPacketColumn.CLIENT_FILE,
      dataType: 'string',
      sortable: true,
      filterable: true,
      onRender: (item: WorkPacketStatus) =>
        renderDownloadLink(item.workOrderId, item.commands, item.inboundFilename, item.clientFileArchivePath),
    },
    {
      key: 'vendorFilename',
      name: 'Vendor File',
      targetWidthProportion: 1,
      minWidth: 100,
      maxWidth: 300,
      fieldName: 'vendorFilename',
      isSorted: false,
      isSortedDescending: false,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      data: WorkPacketColumn.VENDOR_FILE,
      dataType: 'string',
      sortable: true,
      filterable: true,
      onRender: (item: WorkPacketStatus) =>
        renderDownloadLink(item.workOrderId, item.commands, item.vendorFilename, item.vendorFileArchivePath),
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
      data: WorkPacketColumn.TOTAL_RECORDS,
      dataType: 'number',
      sortable: true,
      filterable: false,
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
      data: WorkPacketColumn.EXTRACT_TYPE,
      dataType: 'string',
      sortable: true,
      filterable: false,
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
      data: WorkPacketColumn.EXTRACT_VERSION,
      dataType: 'string',
      sortable: true,
      filterable: false,
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
      data: WorkPacketColumn.MESSAGE,
      dataType: 'string',
      sortable: true,
      filterable: true,
    },
  ];

  const initialColumns = (): DataColumn[] => {
    const initCols: DataColumn[] = [];
    selectedColumns.forEach((sCol: WorkPacketColumn) => {
      const matching = columnOptions.find((colOpt: IColumn) => {
        return colOpt.data === sCol;
      });
      if (matching != null) {
        initCols.push(matching);
      }
    });
    return initCols;
  };

  return {
    initialColumns,
  };
};
