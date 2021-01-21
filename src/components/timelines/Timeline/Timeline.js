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

const CDXTimeline = ({ items = [] }) => {
  return (
    <StyledUl className="timeline">
      {
        items.map(({ active = false, status, content }, index) => (
          <StyledLi className="item" status={status} active={active} key={index}>
            <div className="item__status">
              {getStatusIcon(status)}
            </div>

            <div className={`item__content ${active ? 'item__content--active' : ''}`}>
              <div className="title">{content.title}</div>
              {content.description && <span className="description">{content.description}</span>}
            </div>
          </StyledLi>
        ))
      }
    </StyledUl>
  )
}

export default CDXTimeline;