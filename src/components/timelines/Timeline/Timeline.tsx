import React, { ReactElement, useState } from 'react';
import { Callout, DirectionalHint, FontIcon, Link, mergeStyleSets, PrimaryButton } from '@fluentui/react';
import { Spinner } from 'src/components/spinners/Spinner';
import { WorkPacketCommandType, WorkPacketStatusDetails, WorkStatus, WorkStepStatus } from 'src/data/services/graphql';
import { Text } from 'src/components/typography';
import { LabelValue, LabelValueProps } from 'src/components/labels/LabelValue';
import { InlineLabel } from 'src/components/labels/LabelValue/LabelValue.styles';
import { theme } from 'src/styles/themes/theme';
import { Spacing } from 'src/components/spacings/Spacing';
import { StyledLi, StyledUl } from './Timeline.styles';

type CDXTimelineProps = {
  packet?: WorkPacketStatusDetails;
  activeIndex?: number;
  onClick?: (selectedStepIndex: number) => void | null;
  onRedo?: (stepName?: string | null) => void;
};

const styles = mergeStyleSets({
  buttonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    textAlign: 'center',
    margin: '0 100px',
    minWidth: 130,
    height: 32,
  },
  configArea: {
    width: 300,
    display: 'inline-block',
  },
  button: {
    width: 130,
  },
  callout: {
    minWidth: 320,
    maxWidth: 600,
    padding: '20px 24px',
  },
  link: {
    display: 'block',
    marginTop: 20,
  },
});

type ConditionalLabelValueType = {
  label: string;
  value?: any;
};

const ConditionalLabelValue = ({ label, value }: ConditionalLabelValueType) => {
  if (value) {
    return <LabelValue label={label} value={value} />;
  }
  return null;
};

const CDXTimeline = ({ packet, activeIndex = 0, onClick, onRedo }: CDXTimelineProps): ReactElement => {
  const [showCallout, setShowCallout] = useState(false);
  const redoCommand = packet?.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.RerunStep);
  const downloadCommand = packet?.commands?.find((cmd) => cmd?.commandType === WorkPacketCommandType.DownloadFile);

  function isComplete(workStepStatus?: WorkStepStatus | null): boolean {
    const stepStatus = workStepStatus?.stepStatus?.toUpperCase();
    if (!stepStatus) {
      // Assume no status means it's done
      return true;
    }
    return stepStatus === 'DONE' || stepStatus === 'COMPLETE';
  }

  function isError(workStepStatus?: WorkStepStatus | null): boolean {
    const stepStatus = workStepStatus?.stepStatus?.toUpperCase();
    if (!stepStatus) {
      // Assume no status means it's done
      return true;
    }
    return stepStatus === 'ERROR';
  }

  const getStatusIcon = (status?: WorkStatus | null) => {
    switch (status) {
      case WorkStatus.Submitted:
      case WorkStatus.Queued:
      case WorkStatus.Processing:
        return <Spinner size="md" />;
      case WorkStatus.Error:
      case WorkStatus.QualityCheckFailed:
      case WorkStatus.TechMigrationCheckFailed:
        return <FontIcon iconName="IncidentTriangle" className="error" style={{ fontSize: 32 }} />;
      case WorkStatus.Warning:
        return <FontIcon iconName="IncidentTriangle" className="warn" style={{ fontSize: 32 }} />;
      case WorkStatus.Hold:
      case WorkStatus.Canceled:
      case WorkStatus.NoRecords:
        return <FontIcon iconName="InfoSolid" className="info" style={{ fontSize: 32 }} />;
      case WorkStatus.Complete:
        return <FontIcon iconName="CompletedSolid" className="success" style={{ fontSize: 32 }} />;
      default:
        return <FontIcon iconName="CompletedSolid" className="success" style={{ fontSize: 32 }} />;
    }
  };

  const renderRedo = (item?: WorkStepStatus | null) => {
    if ((isComplete(item) || isError(item)) && redoCommand) {
      return (
        <Spacing margin={{ top: 'normal' }}>
          <PrimaryButton
            onClick={() => {
              if (onRedo) {
                onRedo(item?.stepName);
              }
            }}
            iconProps={{ iconName: 'Rerun', style: { fontSize: theme.fontSizes.small } }}
            style={{ fontSize: theme.fontSizes.small }}
          >
            {redoCommand.label}
          </PrimaryButton>
        </Spacing>
      );
    }
    return null;
  };

  const fileName = (path?: string) => {
    if (!path) {
      return null;
    }
    return path.substring(path.lastIndexOf('/') + 1);
  };

  /**
   * Ticket #238
   * render the first two NvpStr values in the Work Step
   * @param step work step status
   */
  const renderStepPreview = (step?: WorkStepStatus | null) => {
    if (step) {
      return step.nvp?.map((value, index) => {
        if (value && index < 2) {
          return <LabelValue key={`nvp_${index}`} label={value.name} value={value.value} />;
        }
        return null;
      });
    }
    return null;
  };

  const FileValue = ({ label, value }: LabelValueProps) => {
    const graphQLUrl = process.env.REACT_APP_API_SERVER;
    const serverUrl = graphQLUrl?.replace('/graphql', '') ?? '';

    if (value) {
      const fName = fileName(value);
      if (downloadCommand) {
        return (
          <div>
            <InlineLabel>{`${label}:`}</InlineLabel>
            <Link
              target="_new"
              href={`${serverUrl}k/archive/download?workOrderID=${packet?.workOrderId}&s3Key=${value}`}
              title={fName ?? undefined}
              style={{
                fontSize: '.75rem',
              }}
            >
              {fName}
              <FontIcon iconName="DownloadDocument" style={{ paddingLeft: '.5em' }} />
            </Link>
          </div>
        );
      }
      return <LabelValue label={label} value={fName} />;
    }
    return null;
  };

  const renderStepDetails = (item: WorkStepStatus | null) => {
    if (item) {
      return (
        <>
          <Text size="large">{item.stepName}</Text>
          {item.nvp?.map((value, index) => (
            <ConditionalLabelValue key={`nvp_${index}`} label={value?.name ?? ''} value={value?.value} />
          ))}
          <ConditionalLabelValue label="Type" value={item.stepType} />
          <ConditionalLabelValue label="Population Count" value={item.populationCount?.value} />
          <FileValue
            label={item.transformedArchiveFile?.label ?? 'Transformed File'}
            value={item.transformedArchiveFile?.value}
          />
          <ConditionalLabelValue label="Record Count" value={item.recordCounts?.recordCount} />
          <ConditionalLabelValue label="Total Count" value={item.recordCounts?.totalCount} />
          {item.stepFile?.map((stepFile, index) => (
            <FileValue key={`stepFile_${index}`} label={stepFile?.label ?? 'File'} value={stepFile?.value} />
          ))}
          {renderRedo(item)}
        </>
      );
    }
    return <div>No further information</div>;
  };

  return (
    <>
      <StyledUl className="timeline">
        {packet?.workStepStatus?.map((item, index) => (
          <StyledLi
            id={`step_${index}`}
            className="item"
            active={index === activeIndex}
            onClick={() => {
              if (onClick) {
                onClick(index);
              }
              setShowCallout(!showCallout);
            }}
            key={index}
          >
            <div className="item__status">{getStatusIcon(item?.stepStatus)}</div>

            <div className={`item__content ${index === activeIndex ? 'item__content--active' : ''}`}>
              <div className="title">{item?.stepName}</div>
              {renderStepPreview(item)}
            </div>
          </StyledLi>
        ))}
      </StyledUl>
      {packet?.workStepStatus && packet?.workStepStatus[activeIndex] && showCallout && (
        <Callout
          target={`#step_${activeIndex}`}
          isBeakVisible
          className={styles.callout}
          gapSpace={10}
          directionalHint={DirectionalHint.rightCenter}
          onDismiss={() => setShowCallout(false)}
        >
          {renderStepDetails(packet?.workStepStatus[activeIndex])}
        </Callout>
      )}
    </>
  );
};

export default CDXTimeline;
