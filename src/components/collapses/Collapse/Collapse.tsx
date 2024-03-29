import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FontIcon } from '@fluentui/react';
import { StyledDiv, StyledButton } from './Collapse.styles';

const CDXCollapse = ({
  id = '',
  label,
  children,
  className = '',
  expanded = false,
  onToggle = (expandedValue: boolean) => ({} as any),
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(!!expanded);
  const [isAnimating, setIsAnimating] = useState(!!expanded);

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
    <StyledDiv className={`collapse ${className}`} {...props}>
      <StyledButton
        id={id ? `${id}_Collapse_Button` : undefined}
        className="collapse__trigger"
        onClick={handleClick}
        {...props}
      >
        {label} &nbsp; <FontIcon iconName={!isExpanded ? 'ChevronUp' : 'ChevronDown'} />
      </StyledButton>

      {isExpanded && (
        <div className={`collapse__content ms-motion-${isAnimating ? 'fadeIn' : 'fadeOut'}`}>{children}</div>
      )}
    </StyledDiv>
  );
};

CDXCollapse.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default CDXCollapse;
