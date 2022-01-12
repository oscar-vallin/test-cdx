import { ReactElement } from 'react';
import { FontIcon } from '@fluentui/react';
import { Spinner } from 'src/components/spinners/Spinner';
import { StyledUl, StyledLi } from './Timeline.styles';

const defaultProps = {
  items: [],
  activeIndex: 0,
  onClick: () => null,
};

type CDXTimelineProps = {
  items?: { status: string; content: { title: string; description: string } }[] | any;
  activeIndex?: number;
  onClick?: any | null;
} & typeof defaultProps;

const getStatusIcon = (status) => {
  const ICONS = {
    DONE: <FontIcon iconName="AcceptMedium" />,
    PROGRESS: <Spinner size="md" />,
  };

  return ICONS[status];
};

const CDXTimeline = ({ items = [], activeIndex, onClick }: CDXTimelineProps): ReactElement => {
  return (
    <StyledUl className="timeline">
      {items.map((item, index) => (
        <StyledLi
          className="item"
          status={item.status}
          active={index === activeIndex}
          onClick={() => onClick(index)}
          key={index}
        >
          <div className="item__status">{getStatusIcon(item.status)}</div>

          <div className={`item__content ${index === activeIndex ? 'item__content--active' : ''}`}>
            <div className="title">{item.content.title}</div>
            {item.content.description && <span className="description">{item.content.description}</span>}
          </div>
        </StyledLi>
      ))}
    </StyledUl>
  );
};

CDXTimeline.defaultProps = defaultProps;

export default CDXTimeline;
