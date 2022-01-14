import styled from 'styled-components';
import { Box } from 'src/components/layouts';
import { defaultTheme } from 'src/styles/themes';

export const LoadingHeader = styled.div`
  height: 60px;
  width: 100%;
`;

export const LoadingFrame = styled(Box)`
  background: ${defaultTheme.white};
  color: ${defaultTheme.black};
  overflow: auto;
  padding: 58px 0 0;
  width: 100%;
`;

export const AppHeaderContainer = styled.header`
  align-items: stretch;
  background: ${defaultTheme.themePrimary};
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  color: ${defaultTheme.white};
  display: flex;
  left: 0;
  position: fixed;
  top: 0;
  white-space: nowrap;
  width: 100%;
`;
