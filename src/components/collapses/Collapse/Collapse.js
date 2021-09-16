import { useEffect, useState } from 'react';
import { FontIcon } from '@fluentui/react/lib-commonjs/Icon';
import { StyledDiv, StyledButton } from './Collapse.styles';

const CDXCollapse = ({
  label,
  children,
  className = '',
  expanded = false,
  onToggle = () => {
    return {};
  },
}) => {
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onToggle(isExpanded), [isExpanded]);

  return (
    <StyledDiv className={`collapse ${className}`}>
      <StyledButton className="collapse__trigger" onClick={handleClick}>
        {label} &nbsp; <FontIcon iconName="ChevronDown" />
      </StyledButton>

      {isExpanded && (
        <div className={`collapse__content ms-motion-${isAnimating ? 'fadeIn' : 'fadeOut'}`}>{children}</div>
      )}
    </StyledDiv>
  );
};

export default CDXCollapse;
