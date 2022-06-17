import styled from 'styled-components';
import { Icon } from '@fluentui/react';

export const StyledIcon = styled(Icon)`
  font-size: 20px;
  font-weight: 800;
  color: ${({ theme, iconName }) =>
    iconName === 'StatusCircleCheckmark' ? theme.colors.custom.success : theme.colors.custom.error};
`;

export const CompositeRulesSeparator = styled.div`
  font-weight: 500;
`;
