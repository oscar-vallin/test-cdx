import styled from 'styled-components';
import { StyleConstants } from '../../../data/constants/StyleConstants';

export const ComponentStyled = styled.div`
  display: flex;
  justify-content: ${({ direction, top, bottom }) => {
    if (direction !== StyleConstants.DIRECTION_COLUMN) return 'center';

    if (top) return 'flex-start';

    if (bottom) return 'flex-end';

    return 'center';
  }};
  align-items: ${({ direction, left, right }) => {
    if (direction !== StyleConstants.DIRECTION_COLUMN) return 'center';

    if (left) return 'flex-start';

    if (right) return 'flex-end';

    return 'center';
  }};
  flex-direction: ${({ direction }) => direction};
  padding: 0px;
`;
