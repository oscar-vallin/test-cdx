import React, { useState } from 'react';
import { StyledDiv } from './Collapse.styles';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';

const CDXCollapse = ({ label, children, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isExpanded) {
      setIsAnimating(false);
      setTimeout(() => {
        setIsExpanded(false);
      }, 75);
    } else {
      setIsExpanded(true);
      setIsAnimating(true);
    }
  };

  return (
    <StyledDiv className={`collapse ${className}`}>
      <button className="collapse__trigger" onClick={handleClick}>
        {label} &nbsp; <FontIcon iconName="ChevroDown" />
      </button>

      {isExpanded && (
        <div className={`collapse__content ms-motion-${isAnimating ? 'fadeIn' : 'fadeOut'}`}>{children}</div>
      )}
    </StyledDiv>
  );
};

export default CDXCollapse;
