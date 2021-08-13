import styled from 'styled-components';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { Row } from '../../../components/layouts';

export const StyledErrorIcon = styled(FontIcon)`
  color: red;
  margin: 0 10px 0 0;
`;

export const StyledDiv = styled.div`
  position: absolute;
  top: 75px;
  transform: translateY(-30px);
  z-index: 2;
  width: 100%;
`;
