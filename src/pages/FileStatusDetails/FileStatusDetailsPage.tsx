/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { ROUTES } from 'src/data/constants/RouteConstants';

import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Badge } from 'src/components/badges/Badge';
import { Text } from 'src/components/typography';
import {
  DeliveredFile,
  useWorkPacketStatusDetailsLazyQuery,
  WorkPacketStatusDetails,
  WorkStatus
} from 'src/data/services/graphql';
import { ShadowBox, FileMetaDetails, BadgeWrapper, FileTitle } from './FileStatusDetails.styles';

import QualityChecksTab from './QualityChecksTab/QualityChecksTab';
import WorkStepsTab from './WorkStepsTab/WorkStepsTab';
import EnrollmentStatsTab from './EnrollmentStatsTab/EnrollmentStatsTab';
import VendorCountStatsTab from './VendorCountStatsTab/VendorCountStatsTab';

import { ActionButton, IconButton, Pivot, PivotItem, Stack } from '@fluentui/react';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { InfoIcon } from 'src/components/badges/InfoIcon';
import { format } from 'date-fns';
import { Required } from 'src/components/labels/FormLabel/FormLabel.styles';
import { LabelValue } from 'src/components/labels/LabelValue';
import { ArchivesTab } from 'src/pages/FileStatusDetails/ArchivesTab/ArchivesTab';

const FileStatusDetailsPage = () => {
  const { orgSid } = useOrgSid();

  const { id }: any = useParams();
  const [packet, setPacket] = useState<WorkPacketStatusDetails>();
  const [showDetails, setShowDetails] = useState(true);
  const realId = id.replace('*', '');

  const [callGetWPDetails, { data, loading, error }] = useWorkPacketStatusDetailsLazyQuery();
  const handleError = ErrorHandler();

  //const { enableRefresh, disableRefresh } = useRefresh(TABLE_NAMES.FILE_STATUS_DETAIL_ENROLLMENT, fSPacketStatusQuery);

  useEffect(() => {
    callGetWPDetails({
      variables: {
        orgSid: orgSid,
        workOrderId: realId
      }
    });
  }, [realId])

  useEffect(() => {
    handleError(error);
  }, [error]);

  useEffect(() => {
    if (data?.workPacketStatusDetails && !loading) {
      setPacket(data?.workPacketStatusDetails)

      // setPacket({
      //   ..._packet,
      //   supplementalFiles: (query.workPacketStatusDetails.workStepStatus || [])
      //     .map(({ stepFile }) => stepFile)
      //     .reduce((arr, item) => [...arr, ...item], []),
      // });
    }
  }, [data, loading]);

  useEffect(() => {
    // const condition = packet?.packetStatus === WorkStatus.Queued || packet?.packetStatus === WorkStatus.Processing|| packet?.packetStatus === WorkStatus.Submitted;
    // enableRefresh(condition);
  }, []);

  const errorCount = (): number => {
    let count = 0;
    packet?.qualityChecks?.sequenceCreationEvent?.forEach((sce) => {
      if (sce?.recordCreationEvent) {
        sce.recordCreationEvent?.forEach((rce) => {
          count += rce?.error?.length ?? 0
        });
      }
    });

    return count;
  }

  const formatDate = (d?: Date): string => {
    // Check if this date has a valid time value
    if (d && (d.getTime() === d.getTime())) {
      return format(d, 'MM/dd/yyyy hh:mm a');
    }
    return '';
  };

  const renderReceivedDate = (): string => {
    const lowestDate = Math.min.apply(packet?.deliveredFiles?.map((f) => f?.timeDelivered));
    if (lowestDate > 0 && lowestDate != Infinity) {
      return `Received at ${formatDate(new Date(lowestDate))}`;
    }
    return '';
  };

  const getBadgeVariant = (packetStatus?: WorkStatus): string => {
    if (!packetStatus) {
      return 'info';
    }
    // purposely use a switch statement so if we add a WorkStatus, it will generate a compiler error.
    switch (packetStatus) {
      case WorkStatus.Queued:
        return 'info';
      case WorkStatus.Processing:
        return 'info';
      case WorkStatus.Complete:
        return 'success';
      case WorkStatus.Error:
        return 'error';
      case WorkStatus.Submitted:
        return 'info';
      case WorkStatus.Warning:
        return 'warning';
      case WorkStatus.Hold:
        return 'warning';
      case WorkStatus.Canceled:
        return 'error';
      case WorkStatus.QualityCheckFailed:
        return 'error';
      case WorkStatus.NoRecords:
        return 'warning';
      case WorkStatus.TechMigrationCheckFailed:
        return 'error';
    }
  };

  const deliveredFile: DeliveredFile | undefined | null = packet?.deliveredFiles ? packet?.deliveredFiles[0] : undefined;

  const renderFileMetaData = () => {
    return (
      <ShadowBox id="__FileMeta">
        <Stack horizontal={true} wrap={true} tokens={{childrenGap: 10}}>
          <Stack.Item align="center" disableShrink>
            <IconButton iconProps={{iconName: showDetails ? 'ChevronUp' : 'ChevronDown'}} onClick={() => setShowDetails(!showDetails)}/>
          </Stack.Item>
          <Stack.Item align="center">
            <FileTitle>{packet?.inboundFilename ?? packet?.workOrderId}</FileTitle>
          </Stack.Item>
          <Stack.Item align="center">
            <Badge variant={getBadgeVariant(packet?.packetStatus)} label={packet?.packetStatus} pill />
          </Stack.Item>
          <Stack.Item align="center">
            <Badge variant="info" label={`Billing Units: ${packet?.populationCount ?? 'none'}`} pill />
            {packet?.suppressBilling && (
              <><Required>*</Required><InfoIcon id='billingUnitInfo' tooltip='This exchange was not billed'/></>
            )}
          </Stack.Item>
          <Stack.Item align="center" grow>
            <Text variant="muted">{renderReceivedDate()}</Text>
          </Stack.Item>
          <Stack.Item align="center">
            <ActionButton id="__RetransmitBtn" onClick={() => null} iconProps={{iconName: 'Send'}}>
              Re-transmit over FTP
            </ActionButton>
          </Stack.Item>
          <Stack.Item align="center">
            <ActionButton id="__DeleteBtn" onClick={() => null} iconProps={{iconName: 'Delete'}}>
              Delete
            </ActionButton>
          </Stack.Item>
        </Stack>
        {showDetails && (
          <FileMetaDetails>
            <Stack horizontal={true} wrap={true} tokens={{childrenGap: 15}}>
              <Stack.Item>
                <LabelValue label="Vendor" value={packet?.vendorId} />
                <LabelValue label="Plan Sponsor" value={packet?.orgId} />
              </Stack.Item>
              <Stack.Item>
                <LabelValue label="Work Order Id" value={packet?.workOrderId} />
                <LabelValue label="Spec Id" value={packet?.specId} />
              </Stack.Item>
              <Stack.Item>
                <Text size="small" variant="muted">Delivered Vendor File Details</Text>
                <LabelValue label="Filename" value={deliveredFile?.filename ?? 'File not found'}/>
                <LabelValue label="Delivered at" value={deliveredFile?.timeDelivered}/>
                <LabelValue label="Size" value={`${deliveredFile?.fileSizeInBytes} bytes (without encryption)`}/>
              </Stack.Item>
              <Stack.Item>
                <Text size="small" variant="muted">FTP details</Text>
                <LabelValue label="Protocol" value={deliveredFile?.ftp?.protocol}/>
                {deliveredFile?.ftp?.port && (
                  <LabelValue label="Port" value={deliveredFile?.ftp?.port}/>
                )}
                <LabelValue label="User" value="*******" title={deliveredFile?.ftp?.username}/>
                <LabelValue label="Host" value={deliveredFile?.ftp?.host} />
                <LabelValue label="Folder" value={deliveredFile?.ftp?.folder} />
              </Stack.Item>
            </Stack>
          </FileMetaDetails>
        )}
      </ShadowBox>
    );
  }

  return (
    <LayoutDashboard id="PageFileStatusDetails" menuOptionSelected={ROUTES.ROUTE_FILE_STATUS.ID}>

      {renderFileMetaData()}

      <ShadowBox>
        <Pivot overflowBehavior="menu" overflowAriaLabel="more items">
          <PivotItem headerText="Enrollment Stats">
            <EnrollmentStatsTab packet={packet} />
          </PivotItem>
          <PivotItem headerText="Vendor Count Stats">
            <VendorCountStatsTab items={packet?.outboundRecordCounts} />
          </PivotItem>
          <PivotItem headerText="Work Steps">
            <WorkStepsTab steps={packet?.workStepStatus ?? []} />
          </PivotItem>
          <PivotItem headerText="Quality Checks"
                     onRenderItemLink={(link: any, defaultRenderer: any): any => (
                       <>
                         {defaultRenderer(link)}
                         {packet?.qualityChecks?.sequenceCreationEvent && errorCount() > 0 && (
                           <BadgeWrapper>
                             <Badge variant='error'
                                    label={errorCount().toString()}/>
                           </BadgeWrapper>
                         )}
                       </>
                     )}>
            <QualityChecksTab items={packet?.qualityChecks?.sequenceCreationEvent || []}/>
          </PivotItem>
          <PivotItem headerText="Archives">
            <ArchivesTab packet={packet}/>
          </PivotItem>
        </Pivot>
      </ShadowBox>
    </LayoutDashboard>
  );
};

export { FileStatusDetailsPage };
