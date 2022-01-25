import styled from 'styled-components';
import { Box } from 'src/components/layouts';

export const BoxStyled = styled(Box)`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  overflow: auto;
  padding: 58px 0 0;
  width: 100vw;

  [data-icon-name='FilterSolid'] {
    margin: 3px 10px 0 0;
    display: inline-block;
    color: ${({ theme }) => theme.colors.neutralTertiaryAlt};
    font-size: 0.75em;
  }
`;
