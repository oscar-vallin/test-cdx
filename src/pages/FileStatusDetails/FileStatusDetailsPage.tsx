/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';

import { ROUTES } from 'src/data/constants/RouteConstants';

import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Badge } from 'src/components/badges/Badge';
import { Text } from 'src/components/typography';
import {
  DeliveredFile,
  useWorkPacketStatusDetailsLazyQuery,
  WorkPacketCommand,
  WorkPacketCommandType,
  WorkPacketStatusDetails,
  WorkStatus,
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
import { theme } from 'src/styles/themes/theme';

const FileStatusDetailsPage = () => {
  const { orgSid } = useOrgSid();
  const { hash } = useLocation();

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
        workOrderId: realId,
      },
    });
  }, [realId]);

  useEffect(() => {
    handleError(error);
  }, [error]);

  useEffect(() => {
    if (data?.workPacketStatusDetails && !loading) {
      setPacket(data?.workPacketStatusDetails);
    }
  }, [data, loading]);

  useEffect(() => {
    // const condition = packet?.packetStatus === WorkStatus.Queued || packet?.packetStatus === WorkStatus.Processing|| packet?.packetStatus === WorkStatus.Submitted;
    // enableRefresh(condition);
  }, []);

  const errorCount = (): number => packet?.qualityChecks?.fieldCreationErrorCount ?? 0;

  const formatDate = (d?: Date): string => {
    // Check if this date has a valid time value
    if (d && d.getTime() === d.getTime()) {
      return format(d, 'MM/dd/yyyy hh:mm a');
    }
    return 'N/A';
  };

  const renderReceivedDate = (): string => {
    return `Received on ${formatDate(new Date(packet?.timestamp))}`;
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

  const deliveredFile: DeliveredFile | undefined | null = packet?.deliveredFiles
    ? packet?.deliveredFiles[0]
    : undefined;
  const resendCmd = packet?.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.Resend);
  const continueCmd = packet?.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.Continue);
  const reprocessCmd = packet?.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.Reprocess);
  const cancelCmd = packet?.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.Cancel);
  const deleteCmd = packet?.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.Delete);

  type CommandButtonType = {
    id: string;
    icon: string;
    command?: WorkPacketCommand | null;
  };

  const WorkPacketCommandButton = ({ id, icon, command }: CommandButtonType) => {
    if (command) {
      return (
        <Stack.Item align="center">
          <ActionButton
            id={id}
            onClick={() => null}
            iconProps={{ iconName: icon, style: { fontSize: theme.fontSizes.normal } }}
            style={{ fontSize: theme.fontSizes.normal }}
          >
            {command.label}
          </ActionButton>
        </Stack.Item>
      );
    }
    return null;
  };

  const renderDeliveredFileInfo = (deliveredFile?: DeliveredFile | null) => {
    if (deliveredFile) {
      return (
        <>
          <Stack.Item>
            <Text size="small" variant="muted">
              Delivered Vendor File Details
            </Text>
            <LabelValue label="Filename" value={deliveredFile.filename ?? 'File not found'} />
            <LabelValue label="Delivered on" value={formatDate(new Date(deliveredFile.timeDelivered))} />
            <LabelValue label="Size" value={`${deliveredFile.fileSizeInBytes} bytes (without encryption)`} />
          </Stack.Item>
          <Stack.Item>
            <Text size="small" variant="muted">
              FTP details
            </Text>
            <LabelValue label="Protocol" value={deliveredFile.ftp?.protocol} />
            {deliveredFile?.ftp?.port && <LabelValue label="Port" value={deliveredFile.ftp?.port} />}
            <LabelValue label="User" value="*******" title={deliveredFile.ftp?.username} />
            <LabelValue label="Host" value={deliveredFile.ftp?.host} />
            <LabelValue label="Folder" value={deliveredFile.ftp?.folder} />
          </Stack.Item>
        </>
      );
    }
  };

  const renderFileMetaData = () => {
    return (
      <ShadowBox id="__FileMeta">
        <Stack horizontal={true} wrap={true} tokens={{ childrenGap: 10 }}>
          <Stack.Item align="center" disableShrink>
            <IconButton
              iconProps={{ iconName: showDetails ? 'ChevronUp' : 'ChevronDown' }}
              onClick={() => setShowDetails(!showDetails)}
            />
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
              <>
                <Required>*</Required>
                <InfoIcon id="billingUnitInfo" tooltip="This exchange was not billed" />
              </>
            )}
          </Stack.Item>
          <Stack.Item align="center" grow>
            <Text variant="muted">{renderReceivedDate()}</Text>
          </Stack.Item>
          <WorkPacketCommandButton id="__ResendBtn" icon="Send" command={resendCmd} />
          <WorkPacketCommandButton id="__ContinueBtn" icon="PlayResume" command={continueCmd} />
          <WorkPacketCommandButton id="__ReprocessBtn" icon="Rerun" command={reprocessCmd} />
          <WorkPacketCommandButton id="__CancelBtn" icon="Cancel" command={cancelCmd} />
          <WorkPacketCommandButton id="__DeleteBtn" icon="Delete" command={deleteCmd} />
        </Stack>
        {showDetails && (
          <FileMetaDetails>
            <Stack horizontal={true} wrap={true} tokens={{ childrenGap: 15 }}>
              <Stack.Item>
                <LabelValue label="Vendor" value={packet?.vendorId} />
                <LabelValue label="Plan Sponsor" value={packet?.orgId} />
              </Stack.Item>
              <Stack.Item>
                <LabelValue label="Work Order Id" value={packet?.workOrderId} />
                <LabelValue label="Spec Id" value={packet?.specId} />
              </Stack.Item>
              {renderDeliveredFileInfo(deliveredFile)}
            </Stack>
          </FileMetaDetails>
        )}
      </ShadowBox>
    );
  };

  return (
    <LayoutDashboard id="PageFileStatusDetails" menuOptionSelected={ROUTES.ROUTE_FILE_STATUS.ID}>
      {renderFileMetaData()}

      <ShadowBox>
        <Pivot
          overflowBehavior="menu"
          overflowAriaLabel="more items"
          styles={{
            link: {
              fontSize: theme.fontSizes.normal,
            },
            linkIsSelected: {
              fontSize: theme.fontSizes.normal,
            },
          }}
          style={{ fontSize: theme.fontSizes.normal }}
          defaultSelectedKey={hash}
        >
          <PivotItem headerText="Enrollment Stats" itemKey="#enrollment">
            <EnrollmentStatsTab packet={packet} />
          </PivotItem>
          <PivotItem headerText="Vendor Count Stats" itemKey="#vendor">
            <VendorCountStatsTab items={packet?.outboundRecordCounts} />
          </PivotItem>
          {packet?.workStepStatus && packet.workStepStatus.length > 0 && (
            <PivotItem headerText="Work Steps" itemKey="#work">
              <WorkStepsTab packet={packet} />
            </PivotItem>
          )}
          <PivotItem
            headerText="Quality Checks"
            itemKey="#quality"
            onRenderItemLink={(link: any, defaultRenderer: any): any => (
              <>
                {defaultRenderer(link)}
                {packet?.qualityChecks?.sequenceCreationEvent && errorCount() > 0 && (
                  <BadgeWrapper>
                    <Badge variant="error" label={errorCount().toString()} />
                  </BadgeWrapper>
                )}
              </>
            )}
          >
            <QualityChecksTab details={packet} />
          </PivotItem>
          <PivotItem headerText="Archives">
            <ArchivesTab packet={packet} />
          </PivotItem>
        </Pivot>
      </ShadowBox>
    </LayoutDashboard>
  );
};

export { FileStatusDetailsPage };
