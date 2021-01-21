import { StyleConstants } from '../../../data/constants/StyleConstants';

export const ComponentStyled = styled.div`
  display: flex;
  justify-content: ${({ direction, top, bottom }) =>
    direction === StyleConstants.DIRECTION_COLUMN ? (top ? 'flex-start' : bottom ? 'flex-end' : 'center') : 'center'};
  align-items: ${({ direction, left, right }) =>
    direction === StyleConstants.DIRECTION_COLUMN ? (left ? 'flex-start' : right ? 'flex-end' : 'center') : 'center'};
  flex-direction: ${({ direction }) => direction};
  padding: 0px;
`;
