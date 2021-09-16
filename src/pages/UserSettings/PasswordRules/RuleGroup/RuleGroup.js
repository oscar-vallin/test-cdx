import React, { useState } from 'react';
import { Spacing } from '../../../../components/spacings/Spacing';

import { StyledIcon } from '../../UserSettingsPage.styles';
import { StyledDiv, StyledText } from './RuleGroup.styles';

const RuleGroup = ({ item, children, ...props }) => {
  const renderIcon = (value) => {
    return value ? <StyledIcon iconName="StatusCircleCheckmark" /> : <StyledIcon iconName="StatusCircleErrorX" />;
  };

  const renderText = () => {
    if (item.level === 0) return 'all';

    return item.level === 1 ? 'any' : item.expectation;
  };

  return (
    <StyledDiv level={item.level} {...props}>
      <Spacing margin={{ top: 'small', bottom: 'normal' }}>
        <StyledText level={item.level}>
          {renderIcon(item.rules ? item.isCurrentLevelValid : item.isValid)}

          <div>
            Meet <strong>{renderText()}</strong> of these
          </div>
        </StyledText>
      </Spacing>

      {children}
    </StyledDiv>
  );
};

export default RuleGroup;
