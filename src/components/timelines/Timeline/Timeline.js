import React from 'react';
import { StyledUl, StyledLi } from './Timeline.styles';
import { Spinner } from '../../spinners/Spinner';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';

const getStatusIcon = status => {
  const ICONS = {
    DONE: <FontIcon iconName="AcceptMedium" />,
    PROGRESS: <Spinner size="md" />
  }

  return ICONS[status];
}

const CDXTimeline = ({ items = [], activeIndex, onClick }) => {
  return (
    <StyledUl className="timeline">
      {
        items.map((item, index) => (
          <StyledLi className="item" status={item.status} active={index === activeIndex} onClick={() => onClick(index)} key={index}>
            <div className="item__status">
              {getStatusIcon(item.status)}
            </div>

            <div className={`item__content ${index === activeIndex ? 'item__content--active' : ''}`}>
              <div className="title">{item.content.title}</div>
              {item.content.description && <span className="description">{item.content.description}</span>}
            </div>
          </StyledLi>
        ))
      }
    </StyledUl>
  )
}

export default CDXTimeline;