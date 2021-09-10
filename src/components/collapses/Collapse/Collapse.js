import React, { useEffect, useState } from 'react';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { StyledDiv } from './Collapse.styles';

const CDXCollapse = ({ label, children, className = '', expanded = false, onToggle = () => {} }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
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

  useEffect(() => onToggle(isExpanded), [isExpanded]);

  return (
    <StyledDiv className={`collapse ${className}`}>
      <button className="collapse__trigger" onClick={handleClick}>
        {label} &nbsp; <FontIcon iconName="ChevronDown" />
      </button>

      {isExpanded && (
        <div className={`collapse__content ms-motion-${isAnimating ? 'fadeIn' : 'fadeOut'}`}>{children}</div>
      )}
    </StyledDiv>
  );
};

export default CDXCollapse;
