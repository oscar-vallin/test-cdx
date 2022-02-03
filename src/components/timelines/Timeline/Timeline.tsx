import React, { ReactElement, useState } from 'react';
import { Callout, DirectionalHint, FontIcon, Link, mergeStyleSets } from '@fluentui/react';
import { Spinner } from 'src/components/spinners/Spinner';
import { StyledUl, StyledLi } from './Timeline.styles';
import { Maybe, WorkStepStatus } from 'src/data/services/graphql';
import { Text } from 'src/components/typography';
import { LabelValue, LabelValueProps } from 'src/components/labels/LabelValue';
import { InlineLabel } from 'src/components/labels/LabelValue/LabelValue.styles';

type CDXTimelineProps = {
  workOrderId?: string;
  items?: Maybe<WorkStepStatus>[];
  activeIndex?: number;
  onClick?: any | null;
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

const CDXTimeline = ({ workOrderId, items = [], activeIndex = 0, onClick }: CDXTimelineProps): ReactElement => {

  const [showCallout, setShowCallout] = useState(false);

  const getStatusIcon = (status) => {
    const ICONS = {
      DONE: <FontIcon iconName="CompletedSolid" style={{fontSize: 32}}/>,
      PROGRESS: <Spinner size="md" />,
    };

    return ICONS[status];
  };

  const renderRedo = (item?: WorkStepStatus | null) => {
    if (item?.stepStatus == 'DONE') {
      return <div>Redo</div>
    }
  };

  const fileName = (path?: string) => {
    if (!path) {
      return null;
    }
    return path.substring(path.lastIndexOf('/') + 1);
  };

  type ConditionalLabelValueType = {
    label: string;
    value?: any;
  };

  const ConditionalLabelValue = ({label, value}: ConditionalLabelValueType) => {
    if (value) {
      return <LabelValue label={label} value={value}/>
    }
    return null;
  };

  const FileValue = ({label, value}: LabelValueProps) => {
    const graphQLUrl = process.env.REACT_APP_API_SERVER;
    const serverUrl = graphQLUrl?.replace('/graphql', '') ?? '';

    if (value) {
      const fName = fileName(value);
      return (
        <div>
          <InlineLabel>{`${label}:`}</InlineLabel>
          <Link target="_new"
                href={`${serverUrl}k/archive/download?workOrderID=${workOrderId}&s3Key=${value}`}
                title={fName ?? undefined}
                style={{
                  fontSize: '.75rem'
                }}>
            {fName}
            <FontIcon iconName='DownloadDocument' style={{paddingLeft: '.5em'}}/>
          </Link>
        </div>
      );
    }
    return null;
  };

  const renderStepDetails = (item: WorkStepStatus | null) => {

    if (item) {
      return (
        <>
          <Text size="large">{item.stepName}</Text>
          <ConditionalLabelValue label="Type" value={item.stepType}/>
          <ConditionalLabelValue label="Population Count" value={item.populationCount?.value}/>
          <FileValue label={item.transformedArchiveFile?.label ?? 'Transformed File'} value={item.transformedArchiveFile?.value}/>
          <ConditionalLabelValue label="Record Count" value={item.recordCounts?.recordCount}/>
          <ConditionalLabelValue label="Total Count" value={item.recordCounts?.totalCount}/>
          {item.stepFile?.map((stepFile, index) =>
            <FileValue key={`stepFile_${index}`} label={stepFile?.label ?? 'File'} value={stepFile?.value}/>
          )}
        </>
      )
    }
    return <div>No further information</div>
  };

  return (
    <>
      <StyledUl className="timeline">
        {items.map((item, index) => (
          <StyledLi
            id={`step_${index}`}
            className="item"
            status={item?.stepStatus ?? 'DONE'}
            active={index === activeIndex}
            onClick={() => {
              onClick(index);
              setShowCallout(!showCallout);
            }}
            key={index}
          >
            <div className="item__status">{getStatusIcon(item?.stepStatus ?? 'DONE')}</div>

            <div className={`item__content ${index === activeIndex ? 'item__content--active' : ''}`}>
              <div className="title">{item?.stepName}</div>
              {item?.stepType && <span className="description">{item?.stepType}</span>}
            </div>
            {renderRedo(item)}
          </StyledLi>
        ))}
      </StyledUl>
      {items[activeIndex] && showCallout && (
        <Callout target={`#step_${activeIndex}`}
                 isBeakVisible={true}
                 className={styles.callout}
                 gapSpace={10}
                 directionalHint={DirectionalHint.rightCenter}
                 onDismiss={() => setShowCallout(false)}>
          {renderStepDetails(items[activeIndex])}
        </Callout>
      )}
    </>
  );
};

export default CDXTimeline;
