/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Pivot,
  PivotItem,
  Stack,
  PanelType,
  Spinner,
  SpinnerSize,
  PrimaryButton,
  ICommandBarItemProps,
} from '@fluentui/react';
import { useHistory } from 'react-router-dom';

import { PanelBody, ThemedPanel } from 'src/layouts/Panels/Panels.styles';

import { Badge } from 'src/components/badges/Badge';
import { Text } from 'src/components/typography';
import {
  DeliveredFile,
  useWorkPacketStatusDetailsLazyQuery,
  useWorkPacketStatusPollQuery,
  WorkPacketCommandType,
  WorkPacketStatusDetails,
  WorkStatus,
} from 'src/data/services/graphql';

import { ErrorHandler } from 'src/utils/ErrorHandler';
import { InfoIcon } from 'src/components/badges/InfoIcon';
import { format } from 'date-fns';
import { Required } from 'src/components/labels/FormLabel/FormLabel.styles';
import { LabelValue } from 'src/components/labels/LabelValue';
import { theme } from 'src/styles/themes/theme';
import { ArchivesTab } from 'src/pages/FileStatusDetails/ArchivesTab/ArchivesTab';
import { isDateTimeValid } from 'src/utils/CDXUtils';
import { useWorkPacketCommands } from 'src/pages/FileStatusDetails/useWorkPacketCommands';
import { Spacing } from 'src/components/spacings/Spacing';
import { Row } from 'src/components/layouts';
import { TableFiltersType } from 'src/hooks/useTableFilters';
import { useNotification } from 'src/hooks/useNotification';
import { EmptyState } from 'src/containers/states';
import QualityChecksTab from './QualityChecksTab/QualityChecksTab';
import WorkStepsTab from './WorkStepsTab/WorkStepsTab';
import EnrollmentStatsTab from './EnrollmentStatsTab/EnrollmentStatsTab';
import VendorCountStatsTab from './VendorCountStatsTab/VendorCountStatsTab';
import { WorkPacketCommandButton } from './WorkPacketCommandButton';
import { BadgeWrapper, FileMetaDetails, FileTitle, ShadowBox } from './FileStatusDetails.styles';
import { UseFileStatusDetailsPanel } from './useFileStatusDetailsPanel';
import { ThemedCommandBar } from 'src/components/buttons/CommandBar/ThemedCommandBar.styles';

const POLL_INTERVAL = 20000;
type FileStatusDetailsPageProps = {
  useFileStatusDetailsPanel?: UseFileStatusDetailsPanel;
  tableFilters?: TableFiltersType;
};

const FileStatusDetailsPage = ({ useFileStatusDetailsPanel, tableFilters }: FileStatusDetailsPageProps) => {
  const history = useHistory();
  /* 
  const fsOrgSid = urlParams.get('fsOrgSid') ?? orgSid;
  const { hash } = useLocation();
  const { id }: any = useParams(); 
  */
  const fsOrgSid = useFileStatusDetailsPanel?.fsOrgSid ?? '';
  const hash = useFileStatusDetailsPanel?.hash;
  const id = useFileStatusDetailsPanel?.workOrderId ?? '';

  const [packet, setPacket] = useState<WorkPacketStatusDetails>();
  const [commandBarItems, setCommandBarItems] = useState<ICommandBarItemProps[]>([]);
  const [showDetails, setShowDetails] = useState(true);
  const realId = id?.replace('*', '');
  const [lastUpdatedPoll, setLastUpdatedPoll] = useState<Date>(new Date());
  const Toast = useNotification();

  const [callGetWPDetails, { data, loading, error }] = useWorkPacketStatusDetailsLazyQuery({
    variables: {
      orgSid: fsOrgSid,
      workOrderId: realId,
    },
  });

  const pollWPStatus = useWorkPacketStatusPollQuery({
    variables: {
      orgSid: fsOrgSid,
      workOrderId: realId,
      lastUpdated: lastUpdatedPoll,
    },
    pollInterval: POLL_INTERVAL,
  });

  const workPacketCommands = useWorkPacketCommands(realId);
  const handleError = ErrorHandler();

  useEffect(() => {
    if (realId) {
      callGetWPDetails();
    }
  }, [realId]);

  useEffect(() => {
    handleError(error);
  }, [error]);

  useEffect(() => {
    handleError(pollWPStatus.error);
  }, [pollWPStatus.error]);

  useEffect(() => {
    if (data?.workPacketStatusDetails && !loading) {
      setPacket(data?.workPacketStatusDetails);
      setLastUpdatedPoll(new Date());
      switch (data?.workPacketStatusDetails?.packetStatus) {
        case WorkStatus.Submitted:
        case WorkStatus.Queued:
        case WorkStatus.Processing:
          pollWPStatus.startPolling(POLL_INTERVAL);
          break;
        default:
          pollWPStatus.stopPolling();
          break;
      }
    }
  }, [data, loading]);

  const validateStatus = () => {
    if (data?.workPacketStatusDetails && !loading) {
      switch (data?.workPacketStatusDetails?.packetStatus) {
        case WorkStatus.Submitted:
        case WorkStatus.Queued:
        case WorkStatus.Processing:
          pollWPStatus.startPolling(POLL_INTERVAL);
          break;
        default:
      }
    }
  };

  useEffect(() => {
    if (pollWPStatus.data?.workPacketStatusPoll && pollWPStatus.data?.workPacketStatusPoll > 0) {
      callGetWPDetails();
    }
  }, [pollWPStatus.data]);

  const errorCount = (): number => packet?.qualityChecks?.fieldCreationErrorCount ?? 0;

  const formatDate = (d?: Date): string => {
    // Check if this date has a valid time value
    if (d && isDateTimeValid(d)) {
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
      default:
        return 'info';
    }
  };

  const deliveredFile: DeliveredFile | undefined | null = packet?.deliveredFiles
    ? packet?.deliveredFiles[0]
    : undefined;
  // const rerunCmd = packet?.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.RerunStep);

  const renderWorkPacketCommandButton = (item: any) => {
    if (!item) return <></>;
    return (
      <WorkPacketCommandButton
        id={item.id}
        icon={item.icon}
        confirmationMsg={item.confirmationMsg}
        command={item.command}
        onClick={item.onClick}
        workPacketCommands={item.workPacketCommands}
        realId={item.realId}
        callback={item.callback}
        fileName={packet?.inboundFilename ?? ''}
      />
    );
  };

  useEffect(() => {
    const resendCmd = packet?.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.Resend);
    const continueCmd = packet?.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.Continue);
    const reprocessCmd = packet?.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.Reprocess);
    const reprocessRenameCmd = packet?.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.Rename);
    const cancelCmd = packet?.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.Cancel);
    const deleteCmd = packet?.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.Delete);

    const commandBarItems = [
      {
        id: '__ResendBtn',
        key: '__ResendBtn',
        icon: 'Send',
        confirmationMsg: 'Are you sure you want to Resend this Work Packet?',
        command: resendCmd,
        onClick: () => {
          workPacketCommands.apiCallResend().then();
        },
        onRender: renderWorkPacketCommandButton,
      },
      {
        id: '__ContinueBtn',
        key: '__ContinueBtn',
        icon: 'PlayResume',
        confirmationMsg: 'Are you sure you want to Continue this Work Packet?',
        command: continueCmd,
        onClick: () => {
          workPacketCommands.apiCallContinue().then();
        },
        callback: () => validateStatus(),
        onRender: renderWorkPacketCommandButton,
      },
      {
        id: '__ReprocessBtn',
        key: '__ReprocessBtn',
        icon: 'Rerun',
        confirmationMsg: 'Are you sure you want to Reprocess this Work Packet?',
        command: reprocessCmd,
        workPacketCommands,
        realId,
        callback: () => validateStatus(),
        onRender: renderWorkPacketCommandButton,
      },
      {
        id: '__ReprocessRenameBtn',
        key: '__ReprocessRenameBtn',
        icon: 'Rerun',
        confirmationMsg: 'Are you sure you want to Reprocess this Work Packet?',
        workPacketCommands,
        realId,
        command: reprocessRenameCmd,
        onClick: () => {
          workPacketCommands.apiCallRenameReprocess().then();
        },
        callback: () => validateStatus(),
        onRender: renderWorkPacketCommandButton,
      },
      {
        id: '__CancelBtn',
        key: '__CancelBtn',
        icon: 'Cancel',
        confirmationMsg: "Are you sure you want to Cancel this Work Packet's processing?",
        command: cancelCmd,
        onClick: () => {
          workPacketCommands.apiCallCancel().then();
        },
        callback: () => validateStatus(),
        onRender: renderWorkPacketCommandButton,
      },
      {
        id: '__DeleteBtn',
        key: '__DeleteBtn',
        icon: 'Delete',
        confirmationMsg: 'Are you sure you want to Delete this Work Packet?',
        command: deleteCmd,
        onClick: () => {
          workPacketCommands.apiCallDelete().then();
        },
        callback: () => {
          useFileStatusDetailsPanel?.closePanel();
          tableFilters?.setPagingParams({
            pageNumber: 0,
            pageSize: 100,
            sort: tableFilters.pagingParams.sort,
          });
        },
        onRender: renderWorkPacketCommandButton,
      },
    ];
    setCommandBarItems(commandBarItems);
  }, [packet]);

  const renderDeliveredFileInfo = (fileInfo?: DeliveredFile | null) => {
    if (fileInfo) {
      return (
        <>
          <Stack.Item>
            <Text size="small" variant="muted">
              Delivered Vendor File Details
            </Text>
            <LabelValue label="Filename" value={fileInfo.filename ?? 'File not found'} />
            <LabelValue label="Delivered on" value={formatDate(new Date(fileInfo.timeDelivered))} />
            <LabelValue label="Size" value={`${fileInfo.fileSizeInBytes} bytes (without encryption)`} />
          </Stack.Item>
          {fileInfo?.ftp?.host && (
            <Stack.Item>
              <Text size="small" variant="muted">
                FTP details
              </Text>
              <LabelValue label="Protocol" value={fileInfo.ftp?.protocol} />
              {fileInfo?.ftp?.port && <LabelValue label="Port" value={fileInfo.ftp?.port} />}
              <LabelValue label="User" value="*******" title={fileInfo.ftp?.username} />
              <LabelValue label="Host" value={fileInfo.ftp?.host} />
              <LabelValue label="Folder" value={fileInfo.ftp?.folder} />
            </Stack.Item>
          )}
        </>
      );
    }
    return null;
  };
  const copyFileStatusDetailsUrl = () => {
    navigator.clipboard.writeText(window.location.href).then();
    Toast.success({ text: 'URL copied successfully' });
  };

  const renderFileMetaData = () => {
    return (
      <ShadowBox id="__FileMeta">
        <Row center wrap={false}>
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
            {packet?.packetStatus === WorkStatus.Processing && <Spinner size={SpinnerSize.medium} />}
            <Stack.Item align="center">
              <IconButton iconProps={{ iconName: 'Copy' }} onClick={copyFileStatusDetailsUrl} />
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
          </Stack>
          <Stack horizontal={true} wrap={false} grow>
            <Stack.Item grow align="end">
              <ThemedCommandBar items={commandBarItems} overflowButtonProps={{ ariaLabel: 'More commands' }} />
            </Stack.Item>
          </Stack>
        </Row>
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

  const onRenderItemLink = (link: any, defaultRenderer: any): any => (
    <>
      {defaultRenderer(link)}
      {packet?.qualityChecks?.sequenceCreationEvent && errorCount() > 0 && (
        <BadgeWrapper>
          <Badge variant="error" label={errorCount().toString()} />
        </BadgeWrapper>
      )}
    </>
  );

  const handleClosePanel = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete('tab');
    params.delete('workOrderId');
    params.delete('fsOrgSid');
    params.delete('redirectUrl');
    history.replace(`${window.location.pathname}?${params.toString()}`);
    useFileStatusDetailsPanel?.closePanel();
  };

  const handleFilesDetailsTabChange = (item) => {
    const params = new URLSearchParams(window.location.search);
    params.set('tab', item.props.itemKey.replace('#', ''));
    history.replace(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      type={PanelType.extraLarge}
      isOpen={useFileStatusDetailsPanel?.isPanelOpen}
      onDismiss={handleClosePanel}
      onOuterClick={handleClosePanel}
    >
      {loading ? (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading file status details" />
        </Spacing>
      ) : (
        <PanelBody>
          {data?.workPacketStatusDetails ? (
            <>
              {renderFileMetaData()}
              <ShadowBox>
                <Pivot
                  onLinkClick={handleFilesDetailsTabChange}
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
                  <PivotItem headerText="Quality Checks" itemKey="#quality" onRenderItemLink={onRenderItemLink}>
                    <QualityChecksTab details={packet} />
                  </PivotItem>
                  <PivotItem headerText="Archives" itemKey="#archives">
                    <ArchivesTab packet={packet} />
                  </PivotItem>
                </Pivot>
              </ShadowBox>
            </>
          ) : (
            <ShadowBox id="__FileMeta-Empty">
              <EmptyState
                title="There is no available data for this Exchange"
                actions={<PrimaryButton onClick={handleClosePanel} text="Close" />}
              />
            </ShadowBox>
          )}
        </PanelBody>
      )}
    </ThemedPanel>
  );
};

export { FileStatusDetailsPage };
