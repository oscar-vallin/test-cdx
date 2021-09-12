import styled from 'styled-components';

export const DivStyled = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ center, bottom }) => {
    if (center) return 'center';

    if (bottom) return 'flex-end';

    return 'flex-start';
  }};
  align-items: ${({ centerV, right }) => {
    if (centerV) return 'center';
    if (right) return 'flex-end';

    return 'flex-start';
  }};
`;
