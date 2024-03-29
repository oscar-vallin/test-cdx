import styled from 'styled-components';
import { Breadcrumb } from '@fluentui/react';
import { Box } from 'src/components/layouts';
import { device } from 'src/styles/GlobalStyles';

interface DashboardBodyProps {
  isMenuOpen?: boolean;
}

export const DashboardContainer = styled(Box)`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  overflow: auto;
  padding: 58px 0 0;
  width: 100%;
  height: 100vh;

  [data-icon-name='FilterSolid'] {
    margin: 3px 10px 0 0;
    display: inline-block;
    color: ${({ theme }) => theme.colors.neutralTertiaryAlt};
    font-size: 0.75em;
  }
`;

export const DashboardBody = styled.div<DashboardBodyProps>`
  transition: all 0.15s ease-in-out;
  margin: 20px 0 0 0;
  width 100%;
  height: calc(100vh - 88px);
  
  @media ${device.tablet} {
    margin-left: ${({ isMenuOpen }) => (isMenuOpen ? '230px' : '0')};
    width: ${({ isMenuOpen }) => (isMenuOpen ? 'calc(100% - 230px)' : '100%')};
  }
`;

export const SmallBreadcrumbs = styled(Breadcrumb)`
  font-size: 1em;
  margin: 0 20px 10px 20px;

  .ms-Breadcrumb-itemLink {
    font-size: ${({ theme }) => theme.fontSizes.small};
    line-height: 2em;
    color: ${({ theme }) => theme.colors.themePrimary};
  }

  .ms-Breadcrumb-item {
    font-size: ${({ theme }) => theme.fontSizes.small};
    line-height: 2em;
  }
`;
