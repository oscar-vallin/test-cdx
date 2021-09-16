import styled from 'styled-components';

export const DivStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${({ center, right, around, evenly, between }) => {
    if (center) return 'center';
    if (right) return 'flex-end';
    if (around) return 'space-around';
    if (evenly) return 'space-evenly';
    if (between) return 'space-between';

    return 'flex-start';
  }};
  align-items: ${({ center, bottom }) => {
    if (center) return 'center';
    if (bottom) return 'flex-end';

    return 'flex-start';
  }};
  width: 100%;
`;
