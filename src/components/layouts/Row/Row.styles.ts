import styled from 'styled-components';

export const DivStyled = styled.div<DivStyledProps>`
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

type DivStyledProps = {
  center: boolean;
  right?: boolean;
  around: string;
  evenly: string;
  between: string;
  bottom: string;
  variant: string;
  top: string;
};
