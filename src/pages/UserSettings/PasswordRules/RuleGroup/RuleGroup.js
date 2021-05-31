import React from 'react';
import { Spacing } from '../../../../components/spacings/Spacing';

import { StyledIcon } from './../../UserSettingsPage.styles';
import { StyledDiv, StyledText } from './RuleGroup.styles';

const RuleGroup = ({ item, children, ...props }) => {
  return (
    <StyledDiv level={item.level} {...props}>
      <Spacing margin={{ top: 'small', bottom: 'normal' }}>
        <StyledText level={item.level}>
          {((item.rules) ? item.isCurrentLevelValid : item.isValid)
            ? <StyledIcon iconName="StatusCircleCheckmark" />
            : <StyledIcon iconName="StatusCircleErrorX" />}

          <div>
            Meet <strong>{
              item.level === 0 ? 'all' : item.level === 1 ? 'any' : item.expectation
            }</strong> of these
          </div>
        </StyledText>
      </Spacing>

      {children}
    </StyledDiv>
  )
}

export default RuleGroup;