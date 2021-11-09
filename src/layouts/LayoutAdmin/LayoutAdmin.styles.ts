import styled from 'styled-components';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { Box as LayoutBox } from '../../components/layouts';

export const StyledBox = styled(LayoutBox)`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: calc(100vh - 48px);
  width: 100%;
`;

export const StyledNav = styled(Nav)<StyledNavProps>`
  background: ${({ theme }) => theme.colors.neutralLighter};
  height: calc(100vh - 48px);

  .ms-Nav-compositeLink {
    .ms-Button {
      font-size: 0.75rem;

      &:hover {
        background: ${({ theme }) => theme.colors.neutralLighter};
      }
    }

    .ms-Nav-chevronButton {
      position: absolute;
      width: 100%;
      z-index: 2;

      & + .ms-Button {
        font-size: 0.75rem;
        pointer-events: none;
      }
    }
  }
`;

type StyledNavProps = {
  onLinkClick: any | null;
};
