import styled from 'styled-components';
import { Box as LayoutBox } from '../../components/layouts';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

export const StyledBox = styled(LayoutBox)`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: calc(100vh - 48px);
  width: 100%;
`;

export const StyledNav = styled(Nav)`
  background: ${({ theme }) => theme.colors.neutralLighter};
  height: calc(100vh - 48px);

  .ms-Nav-compositeLink {
    .ms-Button {
      font-size: .75rem;
      
      &:hover {
        background: ${({ theme }) => theme.colors.neutralLighter};
      }
    }

    .ms-Nav-chevronButton {
      position: absolute;
      width: 100%;
      z-index: 2;

      & + .ms-Button {
        font-size: .75rem;
        pointer-events: none;
      }
    }
  }
`;