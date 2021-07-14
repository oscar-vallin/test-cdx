import styled from 'styled-components';
import chroma from 'chroma-js';
import { Text } from '../../../../components/typography/Text';

export const StyledDiv = styled.div`
  background: ${({ theme, level }) => theme.colors.neutralLighter};
  border: ${({ theme, level }) => `1px solid ${chroma(theme.colors.neutralTertiaryAlt).darken(0.25 * level)}`};
  border-radius: 5px;
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
      border: ${({ theme, level }) => `1px solid ${chroma(theme.colors.themePrimary).darken(0.5 * level)}`};
      box-shadow: 0 10px 15px -10px rgba(0, 0, 0, 0.4);
    }

    & > div:not([id*='CDXSpacing']),
    & > [id*='Text'] {
      background: ${({ theme, level }) => `${chroma(theme.colors.themePrimary).darken(0.5 * level)}15`};
    }
  }
`;

export const StyledText = styled(Text)`
  align-items: center;
  background: ${({ theme, level }) => theme.colors.neutralLighter};
  border: ${({ theme, level }) => `1px solid ${chroma(theme.colors.neutralTertiaryAlt).darken(0.25 * level)}`};
  border-radius: 5px;
  display: flex;
  padding: 5px 10px;
  position: absolute;
  top: -15px;
`;
