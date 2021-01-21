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
  background: #dadada;
  height: calc(100vh - 48px);

  .ms-Nav-compositeLink {
    &:hover {
      .ms-Button {
        background: #dadada !important;
      }
    }
  }
`;