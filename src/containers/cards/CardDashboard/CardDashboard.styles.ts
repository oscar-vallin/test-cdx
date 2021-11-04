// import { ReactElement } from 'react';
import styled from 'styled-components';
import { Column as LayoutColumn } from '../../../components/layouts';
import { Text } from '../../../components/typography';

export const StyledColumn = styled(LayoutColumn)`
  width: 100%;
`;

export const StyledTitle = styled(Text)<StyledTitleProps>`
  &&& {
    color: ${({ theme }) => theme.colors.black};
    text-align: ${({ noData }) => (noData ? 'center' : 'left')};
    font-size: 0.875rem;
    font-weight: ${({ theme, noData }) => (noData ? theme.fontWeights.bold : theme.fontWeights.normal)};
  }
`;

export const StyledSubtitle = styled(StyledTitle)`
  &&& {
    color: ${({ theme }) => theme.colors.neutralPrimaryA};
    font-size: 0.75rem;
  }
`;

export const StyledValues = styled(Text)`
  &&& {
    text-align: left;
    color: ${({ theme }) => theme.colors.black};
    font-size: 2.25rem;
    font-weight: 700;
  }
`;

type StyledTitleProps = {
  noData?: boolean;
  children?: React.ReactNode | any;
};
