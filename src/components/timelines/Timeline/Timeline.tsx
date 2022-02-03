import { ReactElement, useState } from 'react';
import { Callout, DirectionalHint, FontIcon, mergeStyleSets } from '@fluentui/react';
import { Spinner } from 'src/components/spinners/Spinner';
import { StyledUl, StyledLi } from './Timeline.styles';
import { Maybe, WorkStepStatus } from 'src/data/services/graphql';
import { Text } from 'src/components/typography';
import { LabelValue } from 'src/components/labels/LabelValue';

type CDXTimelineProps = {
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

const CDXTimeline = ({ items = [], activeIndex = 0, onClick }: CDXTimelineProps): ReactElement => {

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

  const renderLabelValue = (label: string, value?: any, key?: string) => {
    if (value) {
      return <LabelValue key={key} label={label} value={value}/>
    }
  };

  const renderStepDetails = (item: WorkStepStatus | null) => {

    if (item) {
      return (
        <>
          <Text size="large">{item.stepName}</Text>
          {renderLabelValue('Type', item.stepType)}
          {renderLabelValue('Population Count', item.populationCount?.value)}
          {renderLabelValue(item.transformedArchiveFile?.label ?? 'Transformed File', fileName(item.transformedArchiveFile?.value))}
          {renderLabelValue('Record Count', item.recordCounts?.recordCount)}
          {renderLabelValue('Total Count', item.recordCounts?.totalCount)}
          {item.stepFile?.map((stepFile, index) =>
            renderLabelValue(stepFile?.label ?? 'File', fileName(stepFile?.value), `stepFile_${index}`)
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
