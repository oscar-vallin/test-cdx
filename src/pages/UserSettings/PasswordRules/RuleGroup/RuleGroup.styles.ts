import styled from 'styled-components';
import { Text } from '../../../../components/typography';

export const StyledDiv = styled.div<StyledDivProps>`
  background: ${({ theme }) => theme.colors.neutralLighter};
  border: ${({ theme }) => `1px solid ${theme.colors.neutralTertiaryAlt}`};
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  margin: 30px 0 0 0;
  padding: 10px 15px 15px;
  position: relative;
  transition: border 0.15s ease-out, box-shadow 0.15s ease-out;

  & > div:not([id*='CDXSpacing']),
  & > [id*='Text'] {
    background: transparent;
  }

  &:hover {
    &&& {
      border: ${({ theme }) => `1px solid ${theme.colors.themePrimary}`};
      box-shadow: 0 10px 15px -10px rgba(0, 0, 0, 0.4);
    }

    & > div:not([id*='CDXSpacing']),
    & > [id*='Text'] {
      background: ${({ theme }) => `${theme.colors.themePrimary}15`};
    }
  }
`;

type StyledDivProps = {
  level: number;
};

export const StyledText = styled(Text)<StyledTextProps>`
  align-items: center;
  background: ${({ theme }) => theme.colors.neutralLighter};
  border: ${({ theme }) => `1px solid ${theme.colors.neutralTertiaryAlt}`};
  border-radius: 5px;
  display: flex;
  padding: 5px 10px;
  position: absolute;
  top: -15px;
`;

type StyledTextProps = {
  level: number;
};
