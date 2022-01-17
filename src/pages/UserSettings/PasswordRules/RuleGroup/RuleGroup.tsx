import { ReactElement } from 'react';
import { Spacing } from 'src/components/spacings/Spacing';

import { StyledIcon } from '../../UserSettingsPage.styles';
import { StyledDiv, StyledText } from './RuleGroup.styles';

type RuleGroupParams = {
  title: string | ReactElement;
  passes: boolean;
  children: any;
};

const RuleGroup = ({ title, passes, children }: RuleGroupParams) => {
  const renderIcon = (value) => {
    return value ? <StyledIcon iconName="StatusCircleCheckmark" /> : <StyledIcon iconName="StatusCircleErrorX" />;
  };

  return (
    <StyledDiv level={1}>
      <Spacing margin={{ top: 'small', bottom: 'normal' }}>
        <StyledText level={1}>
          {renderIcon(passes)}
          <div>{title}</div>
        </StyledText>
      </Spacing>

      {children}
    </StyledDiv>
  );
};

export default RuleGroup;
