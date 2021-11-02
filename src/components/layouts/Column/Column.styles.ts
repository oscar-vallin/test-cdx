import styled from 'styled-components';

export const DivStyled = styled.div<DivStyledProps>`
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

type DivStyledProps = {
  variant: string;
  direction: string;
  center: boolean;
  bottom: boolean;
  centerV: string;
  right: boolean;
  top: boolean;
};
